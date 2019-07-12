import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App";
import App from "./App.jsx";
import Router from "./router/router";
import "antd/dist/antd.css";
import "./styles/style.scss";

import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/stores/game";

const Root = () => {
  return (
    <BrowserRouter basename="/">
      <Route path={"/"} component={App}></Route>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);
