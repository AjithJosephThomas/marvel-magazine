import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  marvelRequestMiddleWare,
  marvelResponseMiddleWare
} from "./middleware/marvelApiMiddleWare";
import Main from "./pages/Main";
import ComicsDetail from "./pages/ComicsDetail";
import reducers from "./reducers";
import "./style/index.scss";
import { composeWithDevTools } from "redux-devtools-extension";

//linking redux promise to store
const middlewares = [marvelRequestMiddleWare, apiMiddleware];
const store = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(
  reducers
);

//rendering to dom
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <Main />
    </Router>
  </Provider>,
  document.querySelector(".main-content")
);
