import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./Main";
import { connect } from "react-redux";
import ListGroup from "../components/ListGroup";
import Panel from "../components/Panel";
const ComicDetail = ({ comic }) => (
  <div className="col-xs-12 detail">
    <h3>{comic.title}</h3>
    <hr />
    <div className="row mar-bottom">
      {comic.thumbnail.path !== undefined ? (
        <div className="col-md-2">
          <img
            className="tile-image-thumbnail img-rounded"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />
        </div>
      ) : null}
      <div className="col-md-10">
        {comic.description ? (
          <div className="row">
            <div className="col-xs-12">
              <p>{comic.description}</p>
            </div>
          </div>
        ) : null}
        <div className="row">
          {comic.series.name ? (
            <div className="col-xs-12 col-md-6">
              <h5 className="text-muted">Series: </h5>
              <ListGroup list={[comic.series]} />
            </div>
          ) : null}
          {comic.prices.length ? (
            <div className="col-xs-12 col-md-6">
              <h5 className="text-muted">Prices:</h5>
              <div className="list-group">
                {comic.prices.map((price, index) => (
                  <a
                    href="javascript:;"
                    key={`${price.price}${index}`}
                    className="list-group-item"
                  >
                    {price.price}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="row">
          {comic.characters.length ? (
            <div className="col-xs-12 col-md-6">
              <h5 className="text-muted">Characters:</h5>
              <ListGroup list={comic.characters} />
            </div>
          ) : null}
          {comic.creators.length ? (
            <div className="col-xs-12 col-md-6">
              <h5 className="text-muted">Creators: </h5>
              <ListGroup list={comic.creators} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

ComicDetail.propTypes = {
  comic: PropTypes.object
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { comicsById } = state.comicsList;
  let comic = comicsById[id];
  comic = comic === undefined ? null : comic;
  return { comic };
};

export default connect(mapStateToProps)(ComicDetail);
