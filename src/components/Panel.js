import React, { Component } from "react";
/**
 * returns the children views in panel
 * @param  {Array}  children-the children views
 * @param  {String} title -the title as String
 * @param  {boolean} hasCloseButton - boolean if the panel has a close button
 * @param  {Function} onClose- boolean if the panel has a close button
 * @returns {Node} - children wrapped in panel layout
 * @constructor
 */
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
