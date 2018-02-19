import React, { Component } from "react";
/**
 * Add the rendered group of items
 * @param  {void}
 * @returns {Node} - preloader animation
 * @constructor
 */
const loader = () => (
  <div className="row">
    <div className="col-xs-offset-3 col-xs-5 col-sm-2 col-sm-offset-5">
      <div className="loader" />
    </div>
  </div>
);
export default loader;
