import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { selectCharacter } from "../actions";
import ListGroup from "../../../components/ListGroup";
const CharacterTile = ({ character, isSelected, selectCharacter }) => (
  <div
    className={`col-xs-12 col-sm-4 col-md-3 tile ${
      isSelected ? "selected" : "clickable"
    }`}
  >
    <div
      className={`panel panel-default bg-primary`}
      onClick={evt => {
        evt.stopPropagation();
        selectCharacter(character.id);
      }}
    >
      <div className="panel-heading">{character.name}</div>
      <div className="panel-body">
        {isSelected ? (
          <div className="row">
            <div className="col-xs-12 text-center">
              <Link to={`characters/${character.id}`}>
                <img
                  className="tile-image-thumbnail img-rounded"
                  src={`${character.thumbnail.path}.${
                    character.thumbnail.extension
                  }`}
                />
              </Link>
              <hr />
            </div>
            {character.series.length ? (
              <div className="col-xs-12 mar-bottom">
                <h5 className="text-muted">Series:</h5>
                <ListGroup list={character.series} />
              </div>
            ) : null}
            {character.comics.length ? (
              <div className="col-xs-12">
                <h5 className="text-muted">Comics:</h5>
                <ListGroup list={character.comics} />
              </div>
            ) : null}
          </div>
        ) : (
          <img
            className="tile-image img-rounded"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
        )}
      </div>
    </div>
  </div>
);
CharacterTile.propTypes = {
  character: PropTypes.object.isRequired,
  isSelected: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  const { charactersById, selectedId } = state.charactersList;
  const character = charactersById[props.id];
  const isSelected = character.id === selectedId;
  return { character, isSelected };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectCharacter }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CharacterTile);
