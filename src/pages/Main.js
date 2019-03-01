import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Switch, Route, withRouter } from "react-router-dom";

import Alert from "react-s-alert";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import scrollToComponent from "react-scroll-to-component";

import Comics from "./Comics";
import Characters from "./Characters";
import ComicsDetail from "./ComicsDetail";
import CharacterDetail from "./CharacterDetail";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const { alertMessage } = nextProps;
    if (alertMessage) {
      Alert.info(alertMessage, {
        position: "top-right",
        effect: "slide"
      });
    }
  }
  render() {
    return (
      <div>
        <Alert stack={{ limit: 3 }} timeout={3000} />
        <header className="container">
          <AppHeader className="row col-xs-12 app-header" />
        </header>
        <main role="main" className="container">
          <Switch>
            <Route path="/" exact component={Comics} />
            <Route path="/comics" exact component={Comics} />
            <Route path="/comics/:id" exact component={ComicsDetail} />
            <Route path="/characters" exact component={Characters} />
            <Route path="/characters/:id" exact component={CharacterDetail} />
          </Switch>
        </main>
      </div>
    );
  }
}
Main.propTypes = {
  alertMessage: PropTypes.string
};
const mapStateToProps = (state, props) => {
  const { alertMessage } = "";
  return { alertMessage };
};

export default withRouter(connect(mapStateToProps)(Main));
