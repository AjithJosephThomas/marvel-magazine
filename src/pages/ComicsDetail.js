import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Main from "./Main";
import { connect } from "react-redux";
import ListGroup from "../components/ListGroup";
import Panel from "../components/Panel";
import { fetchComics } from "../modules/comics/actions";
import Loader from "../components/Loader";
class ComicDetail extends Component {
  componentWillMount = () => {
    const { id, comic, fetchComics } = this.props;
    if (comic === null) {
      fetchComics({ id });
    }
  };
  componentDidMount=()=>{
      window.scrollTo(0, 0);
  }
  render = () => {
    const { comic } = this.props;
    return comic === null ?
    (<div className="col-xs-12 detail"> <Loader />
    </div>) : (
      <div className="col-xs-12 detail">
        <h3>{comic.title}</h3>
        <hr />
        <div className="row mar-bottom">
          {comic.thumbnail.path !== undefined ? (
            <div className="col-md-2">
              <img
                className="tile-image-thumbnail img-rounded"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
            </div>
          ) : null}
          <div className="col-md-10">
            {comic.description ? (
              <div className="row">
                <div className="col-xs-12">
                  <p>{comic.description}</p>
                </div>
              </div>
            ) : null}
            <div className="row">
              {comic.series.name ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Series: </h5>
                  <ListGroup list={[comic.series]} />
                </div>
              ) : null}
              {comic.prices.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Prices:</h5>
                  <div className="list-group">
                      <ListGroup list={comic.prices} />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="row">
              {comic.characters.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Characters:</h5>
                  <ListGroup list={comic.characters} />
                </div>
              ) : null}
              {comic.creators.length ? (
                <div className="col-xs-12 col-md-6">
                  <h5 className="text-muted">Creators: </h5>
                  <ListGroup list={comic.creators} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

ComicDetail.propTypes = {
  comic: PropTypes.object,
  id: PropTypes.string
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { comicsById } = state.comicsList;
  let comic = comicsById[id];
  comic = comic === undefined ? null : comic;
  return { comic, id };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchComics
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ComicDetail);
