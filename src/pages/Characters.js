import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CharactersList from "../modules/characters/containers/CharactersList";

const Characters = () =>(<div>
  <h3>Characters</h3>
  <hr />
  <CharactersList/>
</div>)

export default (Characters);
