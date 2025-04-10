import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router";

import Gallery from "./Gallery.jsx";

const FeatureCard = ({ feature_image, feature_name, feature_location }) => {
  return (
    <div>
      <img src={feature_image} alt="featured artwork" />
      <div className="featured_display">
        <h2 className="featured_name"> {feature_name} </h2>
        <h5 className="featured_from"> From: </h5>
        <h5 className="featured_gallery"> {feature_location} </h5>
      </div>
    </div>
  );
};

const LineDivider = ({}) => {
  return(
    <div className="bg-dark1 dark:bg-light1 w-auto h-0.5 my-3"/>
  )
}

const App = () => {
  return (
    <div className="bg-light1 text-dark1 dark:bg-dark1 dark:text-light1">
        <img className="um-logo" src="src/assets/UNCREATIVE_MINDS_LOGO.svg"/>
        <div>
        
        <Gallery/>

        <LineDivider/>
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">More to come. Stay tuned.</h2>
        <p className="text-2xl mb-4">This place will forever belong to the people of the Earth.</p>
        <a href="https://github.com/high-flyer-guy/uncreative.site">Copy(this site, all)right</a>
        </div>
    </div>
  );
};

export default App;
