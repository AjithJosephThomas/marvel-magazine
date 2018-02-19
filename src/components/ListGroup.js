import React, { Component } from "react";
import { Link } from "react-router-dom";
/**
 * Add the rendered group of items
 * @param  {Array} list - The array of name-links pairs to be rendered
 * @returns {Node} - The group of list items
 * @constructor
 */
const ListGroup = ({ list }) => (
  <div className="list-group">
    {list.map(
      (item, index) =>
        item.url ? (
          <Link
            to={`${item.url ? item.url : null}`}
            className="list-group-item"
            key={`${item.name}${index}`}
          >
            {item.name}
          </Link>
        ) : (
          <span className="list-group-item" key={`${item.name}${index}`}>
            {item.name}
          </span>
        )
    )}
  </div>
);

export default ListGroup;
