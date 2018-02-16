import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul className="nav navbar-nav navbar-right">
    <li><Link to={`/comics`}>Comics</Link></li>
    <li><Link to={`/characters`}>Characters</Link></li>
    </ul>
    </div>
  </nav>
);
export default appHeader;
