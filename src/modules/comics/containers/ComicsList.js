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
      this.props.fetchComics({ offset: this.props.nextOffset });
      e.stopPropagation();
    }
  };
  componentDidMount() {
    window.console.log("componentDidMount");
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
  nextOffset: PropTypes.number
};

const mapStateToProps = (state, props) => {
  const {
    result,
    selectedId,
    isComicsLoading,
    offset,
    count
  } = state.comicsList;
  const nextOffset = offset + count;
  return { result, selectedId, isComicsLoading, nextOffset };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchComics }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ComicsList);
