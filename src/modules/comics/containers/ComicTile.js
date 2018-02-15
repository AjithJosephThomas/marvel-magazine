import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectComic } from "../actions";
import ListGroup from "../../../components/ListGroup";
import { Link } from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import Panel from "../../../components/Panel";
const ComicTile = ({ comic, isSelected, selectComic }) => (
  <div
    className={`col-xs-12 col-sm-4 col-md-3 tile ${
      isSelected ? "selected" : "clickable"
    }`}
    onClick={evt => {
      evt.stopPropagation();
      scrollToComponent(evt.target, {
        offset: -150,
        align: "top"
      });
      selectComic(comic.id);
    }}
  >
    <Panel title={comic.title}>
      {isSelected ? (
        <div className="row">
          <div className="col-xs-12 text-center">
            <Link to={`/comics/${comic.id}`}>
              <img
                className="tile-image-thumbnail img-rounded"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
            </Link>
            <hr />
          </div>
          {comic.series.name ? (
            <div className="col-xs-12 mar-bottom">
              <h5 className="text-muted">Series: </h5>
              {comic.series.name}
            </div>
          ) : null}
          {comic.characters.length ? (
            <div className="col-xs-12">
              <h5 className="text-muted">Characters:</h5>
              <ListGroup list={comic.characters} />
            </div>
          ) : null}
        </div>
      ) : (
        <img
          className="tile-image img-rounded"
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        />
      )}
    </Panel>
  </div>
);
ComicTile.propTypes = {
  comic: PropTypes.object.isRequired,
  isSelected: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  const { comicsById, selectedId } = state.comicsList;
  const comic = comicsById[props.id];
  const isSelected = comic.id === selectedId;
  return { comic, isSelected };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectComic }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ComicTile);
