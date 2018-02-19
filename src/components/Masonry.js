import React, { Component } from "react";
import Masonry from "react-masonry-component";
/**
 * returns the children views in masonary layout
 * @param  {Array} children -the children views
 * @returns {Node} - children wrapped in masonary
 * @constructor
 */
const masonry = ({ children }) => (
  <div className="row">
    <Masonry updateOnEachImageLoad={true}>{children}</Masonry>
  </div>
);
export default masonry;
