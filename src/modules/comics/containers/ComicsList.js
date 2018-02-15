import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ComicTile from "./ComicTile";
import Masonry from "../../../components/Masonry";
const ComicsList = ({ result }) => (
  <Masonry>{result.map(id => <ComicTile key={id} id={id} />)}</Masonry>
);

ComicsList.propTypes = {
  result: PropTypes.array.isRequired,
  selectedId: PropTypes.number
};

const mapStateToProps = (state, props) => {
  const { result, selectedId } = state.comicsList;
  return { result, selectedId };
};
export default connect(mapStateToProps)(ComicsList);
