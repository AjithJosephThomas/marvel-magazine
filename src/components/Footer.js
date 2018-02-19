import React, { Component } from "react";
/**
 * Add the rendered application footer
 * @param void
 * @returns {Node} - The rendered application footer
 * @constructor
 */
const appFooter = () => (
  <footer className="app-footer">
    <div className=" container text-center mar-bottom mar-top">
      <div className="row">
        <div className="col-xs-12">
          <a className="text-muted" href="https://marvel.com">
            {"Marvel.com"}
          </a>
        </div>
      </div>
    </div>
  </footer>
);
export default appFooter;
