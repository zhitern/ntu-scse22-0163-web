import React from 'react';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Header</h1>
            <div className="links">
                <a href="/Home">Home</a>
                <a href="/GeoTopicModeling">Geo Topic Modeling</a>
                <a href="/RegionSearch">Region Search</a>
                <a href="/RegionTopicExploration">Region Topic Exploration</a>
                <a href="/DeepRegionRepresentation">Deep Region Representation</a>
                <a href="/RelatedReseachProjects">Related Reseach Projects</a>

            </div>
        </nav>
    );
}
 
export default Navbar;