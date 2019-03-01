import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./Main";
import { connect } from "react-redux";
import ListGroup from "../components/ListGroup";
import Panel from "../components/Panel";
import Loader from "../components/Loader";
import { bindActionCreators } from "redux";
import { fetchCharacters } from "../modules/characters/actions";
class CharacterDetail extends Component {
  componentWillMount = () => {
    const { id, character, fetchCharacters } = this.props;
    if (character === null) {
      fetchCharacters({ id });
    }
  };
  componentDidMount=()=>{
      window.scrollTo(0, 0);
  };
  render = () => {
    const { character, urlLinks } = this.props;

    return character === null ?
    <div className="col-xs-12 detail"><Loader /></div> :
     (
      <div className="col-xs-12 detail">
        <h3>{character.name}</h3>
        <hr />
        <div className="row mar-bottom">
          {character.thumbnail.path !== undefined ? (
            <div className="col-md-2">
              <img
                className="tile-image-thumbnail img-rounded"
                src={`${character.thumbnail.path}.${
                  character.thumbnail.extension
                }`}
              />
            </div>
          ) : null}
          <div className="col-md-10">
            {character.description ? (
              <div className="row">
                <div className="col-xs-12">
                  <p>{character.description}</p>
                </div>
              </div>
            ) : null}
            <div className="row">
              {character.series.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Series: </h5>
                  <ListGroup list={character.series} />
                </div>
              ) : null}
              {character.comics.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Comics:</h5>
                  <ListGroup list={character.comics} />
                </div>
              ) : null}
            </div>
            <div className="row">
              {character.urls.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">More Details: </h5>
                  <div className="list-group">
                    {character.urls.map((item, index) => (
                      <a
                        href={item.url}
                        key={`link-${index}`}
                        className="list-group-item"
                      >
                        {urlLinks[item.type]}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
}
CharacterDetail.propTypes = {
  character: PropTypes.object,
  id:PropTypes.string,
  urlLinks:PropTypes.object
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { charactersById, urlLinks } = state.charactersList;
  let character = charactersById[id];
  character = character === undefined ? null : character;
  return { character, urlLinks, id };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCharacters }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
