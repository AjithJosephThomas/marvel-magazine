import React, { Component } from "react";

const Panel = ({ title, children }) => (
  <div className="panel panel-default">
    <div className="panel-heading">{title}</div>
    <div className="panel-body">{children}</div>
  </div>
);

export default Panel;
