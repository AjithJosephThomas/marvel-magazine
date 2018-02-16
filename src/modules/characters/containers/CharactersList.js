import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CharacterTile from "./CharacterTile";
import Masonry from "../../../components/Masonry";
import { fetchCharacters } from "../actions";
class CharactersList extends PureComponent {
  componentWillMount = () => {
    this.props.fetchCharacters();
  };
  render = () => (
    <Masonry>
      {this.props.result.map(id => <CharacterTile key={id} id={id} />)}
    </Masonry>
  );
}

CharactersList.propTypes = {
  result: PropTypes.array.isRequired,
  selectedId: PropTypes.number
};

const mapStateToProps = (state, props) => {
  const { result, selectedId } = state.charactersList;
  return { result, selectedId };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCharacters }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
