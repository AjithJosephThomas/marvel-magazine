import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ComicsSearchFilter from "../modules/comics/containers/SearchFilter";
import ComicsList from "../modules/comics/containers/ComicsList";
import { fetchComics } from "../modules/comics/actions";
class Comics extends PureComponent {
  componentWillMount() {
    this.props.fetchComics();
  }
  render = () => (
    <div>
      <ComicsSearchFilter />
      <ComicsList />
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchComics }, dispatch);

export default connect(null, mapDispatchToProps)(Comics);
