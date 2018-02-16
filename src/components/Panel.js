import React, { Component } from "react";

const Panel = ({ title, children, hasCloseButton = false, onClose = null }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      {title}
      {hasCloseButton ? (
        <button onClick={onClose} className="btn btn-sm btn-link pull-right">
          X
        </button>
      ) : null}
    </div>
    <div className="panel-body">{children}</div>
  </div>
);

export default Panel;
