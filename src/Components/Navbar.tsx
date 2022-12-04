import React from 'react';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="links">
                <a href="/MainPage">Home</a>
                <a href="/AlgoShowcasePage">Geo Topic Modeling</a>
                <a href="/AlgoShowcasePage">Region Search</a>
                <a href="/AlgoShowcasePage">Region Topic Exploration</a>
                <a href="/AlgoShowcasePage">Deep Region Representation</a>
                <a href="https://personal.ntu.edu.sg/gaocong/projectS.html" target="_blank">Related Reseach Projects</a>
            </div>
        </nav>
    );
}
 
export default Navbar;