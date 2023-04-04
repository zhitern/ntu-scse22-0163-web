import numpy as np
import torch
import math
import torch.nn as nn
import pickle
import shapely
import rasterio
from scipy.spatial import KDTree
from sklearn.ensemble import RandomForestRegressor
from pyproj import Transformer

# 'LandUse', ['Residential', 'Commercial', 'Industrial', 'Others', 'Open Space'])

# We use the following downstream classifier:
#   1. A trained MLP classifier to predict the land use classification of the input region
#   2. A trained Random Forest Regressor to predict the population of the input region

class Net(torch.nn.Module):
    def __init__(self, embedding_dim, output_dim, hidden_dim=512):
        super(Net, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(embedding_dim, hidden_dim),
            nn.Sigmoid(),
            nn.Linear(hidden_dim, output_dim),
            nn.Softmax(dim=-1)
        )

    def forward(self, data):
        return self.net(data)
    

folder = 'data/RegionEmbedding/'
pattern_embedding_file = 'building_group.npy'
MLP_model_file = 'mlp.pt'
RF_model_file = 'rf.pkl'
land_use_file = 'landuse.pkl'
population_file = 'population.tif'

pattern_embeddings = np.load(folder + pattern_embedding_file)
pattern_tensors = torch.from_numpy(pattern_embeddings).float()

# Evaluation Mdels
mlp = Net(pattern_embeddings.shape[1], 5)
mlp.load_state_dict(torch.load(folder + MLP_model_file, map_location=torch.device('cpu')))
with open(folder + RF_model_file, 'rb') as f:
    rf = pickle.load(f)

# Ground truth land use
with open(folder + land_use_file, 'rb') as f:
    landuses = pickle.load(f)

# build a kd-tree for fast land use aggregation
landuse_loc = [[landuse['shape'].centroid.x, landuse['shape'].centroid.y] for landuse in landuses]
landuse_tree = KDTree(landuse_loc)
transformer = Transformer.from_crs("epsg:4326", "epsg:3414")
def get_true_land_use(rectangle):
    # The ground truth land use is in the Singapore CRS (EPSG:3414)
    # We need to transform the input region's coordinates to the Singapore CRS
    y1, x1 = transformer.transform(rectangle[1], rectangle[0])
    y2, x2 = transformer.transform(rectangle[3], rectangle[2])

    # Print the projected coordinates
    print(f'Projected coordinates: [{x1:.2f}, {y1:.2f}, {x2:.2f}, {y2:.2f}]')
    rectangle = [x1, y1, x2, y2]
    # build a shapely rectangle
    land_use_vector = [0, 0, 0, 0, 0]
    region_shape = shapely.Polygon([(rectangle[0], rectangle[1]), (rectangle[0], rectangle[3]), (rectangle[2], rectangle[3]), (rectangle[2], rectangle[1])])
    dx = rectangle[2] - rectangle[0]
    dy = rectangle[3] - rectangle[1]
    diameter = math.sqrt(dx * dx + dy * dy)
    # find land use in the region
    landuse_index = landuse_tree.query_ball_point([region_shape.centroid.x, region_shape.centroid.y], diameter)
    for index in landuse_index:
        if region_shape.intersects(landuses[index]['shape']):
            current_land_use = landuses[index]
            land_use_vector[current_land_use['land_use']] += region_shape.intersection(landuses[index]['shape'].buffer(0)).area
    # argmax
    total_area = sum(land_use_vector)
    if total_area > 0:
        land_use_vector = [x / total_area for x in land_use_vector]
    return land_use_vector


population = rasterio.open(folder + population_file)
def get_true_pop(rectangle):
    # Get the rectangle's coordinates
    top_row, left_col = population.index(rectangle[0], rectangle[3])
    bottom_row, right_col = population.index(rectangle[2], rectangle[1])

    # Read the raster data for the specified rectangle
    window = rasterio.windows.Window.from_slices((top_row, bottom_row), (left_col, right_col))
    data = population.read(1, window=window)

    # For simplicity just return the average population density ignoring the actual area of each cell
    return np.mean(data)

#===================================================================================================
# Test the region ground truth
# Define the rectangle's coordinates (xmin, ymin, xmax, ymax)
# Test bbox from the bboxfinder.com
# Senkang (Highest population density in Singapore)
rectangle = [103.888736,1.385258,103.900967,1.396327]
print('True land use:', get_true_land_use(rectangle))
print('True population:', get_true_pop(rectangle))

# City center
rectangle = [103.845756,1.289197,103.858931,1.299172]
print('True land use:', get_true_land_use(rectangle))
print('True population:', get_true_pop(rectangle))
#===================================================================================================

# TODO: Get the region embedding for arbitrary input rectangle
# It is resource-consuming to load the 5-layer Transformer on CPU, so we use the tuned building group embedding
# and average it to predict the land use classification and population of the input region