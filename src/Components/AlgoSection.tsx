import React from 'react';
import { Link } from "react-router-dom";

const AlgoSection = () => {

    const handleClick = () => {
        console.log('button clicked')
    }

    return ( 
        <div className="algoSection">
            <Link to="/AlgoShowcasePage">
                <button>Click for Geo Topic Modeling</button>
            </Link>
            <p style={{flex:'1'}} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam officia deserunt expedita rem, illo blanditiis sequi quam et! Officiis accusantium dolores a, incidunt minus eius quasi corrupti dignissimos quod?</p>
        </div>
        
    );
}
 
export default AlgoSection;