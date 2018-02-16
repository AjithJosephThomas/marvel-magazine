import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CharactersList from "../modules/characters/containers/CharactersList";

const Characters = () =>(<CharactersList/>)

export default (Characters);
