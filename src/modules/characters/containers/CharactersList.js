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
  handleScroll = e => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    let fireOnce = true;
    if (fireOnce && windowBottom >= docHeight) {
      fireOnce = false;
    const {queryObj, fetchComics, nextOffset} = this.props;
    const offset = nextOffset;
      this.props.fetchCharacters({...queryObj, offset});
      e.stopPropagation();
    }
  };
  componentDidMount() {
    document.removeEventListener("scroll", this.handleScroll);
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }
  render = () => (
    <Masonry>
      {this.props.result.map(id => <CharacterTile key={id} id={id} />)}
    </Masonry>
  );
}

CharactersList.propTypes = {
  result: PropTypes.array.isRequired,
  selectedId: PropTypes.number,
  nextOffset: PropTypes.number
};

const mapStateToProps = (state, props) => {
  const { result, selectedId, offset,
    count } = state.charactersList;
  const nextOffset = offset + count;
  return { result, selectedId, nextOffset };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCharacters }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
