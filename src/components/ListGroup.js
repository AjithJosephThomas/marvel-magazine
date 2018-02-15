import React, { Component } from "react";

const ListGroup = ({ list }) => (
  <div className="list-group">
    {list.map((item, index) => (
      <a
        href="javascript:;"
        key={`${item.name}${index}`}
        className="list-group-item"
      >
        {item.name}
      </a>
    ))}
  </div>
);

export default ListGroup;
