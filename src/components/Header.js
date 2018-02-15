import React, { Component } from "react";

const appHeader = () => (
  <nav className="navbar navbar-default navbar-fixed">
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar1"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <a className="navbar-brand" href="https://marvel.com">
        <div className="app-logo">
          <img src="/assets/marvel.svg" />
        </div>
      </a>
    </div>
  </nav>
);
export default appHeader;
