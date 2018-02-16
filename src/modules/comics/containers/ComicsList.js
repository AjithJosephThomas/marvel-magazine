import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ComicTile from "./ComicTile";
import Loader from "../../../components/Loader";
import Masonry from "../../../components/Masonry";
import { fetchComics } from "../actions";
class ComicsList extends PureComponent {
  componentWillMount() {
    this.props.fetchComics();
  }
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
      this.props.fetchComics({...queryObj, offset});
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
  render() {
    const { result, isComicsLoading } = this.props;
    return (
      <div>
        <div>
          <Masonry>{result.map(id => <ComicTile key={id} id={id} />)}</Masonry>
        </div>
      </div>
    );
  }
}

ComicsList.propTypes = {
  result: PropTypes.array.isRequired,
  selectedId: PropTypes.number,
  isComicsLoading: PropTypes.bool,
  nextOffset: PropTypes.number,
  queryObj:PropTypes.object
};

const mapStateToProps = (state, props) => {
  const {
    result,
    selectedId,
    isComicsLoading,
    offset,
    count,
    queryObj
  } = state.comicsList;
  const nextOffset = offset + count;
  return { result, selectedId, isComicsLoading, nextOffset, queryObj };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchComics }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ComicsList);
