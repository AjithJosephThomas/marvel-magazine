import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CharactersList from "../modules/characters/containers/CharactersList";
import { fetchCharacters } from "../modules/characters/actions";
class Characters extends PureComponent {
  componentWillMount() {
    this.props.fetchCharacters();
  }
  render = () => <CharactersList />;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCharacters }, dispatch);

export default connect(null, mapDispatchToProps)(Characters);
