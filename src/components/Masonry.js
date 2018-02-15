import React, { Component } from "react";
import Masonry from "react-masonry-component";

const masonry = ({ children }) => (
  <div className="row">
    <Masonry updateOnEachImageLoad={true}>{children}</Masonry>
  </div>
);
export default masonry;
