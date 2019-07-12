import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./styles/App.scss";
import { routes } from "./router/router";
import { Route } from "react-router-dom";
import store from "./redux/stores/game";
import * as act from "./redux/actions/game";
import { connect } from "react-redux";

const { Header, Sider, Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    activeKey: (this.props.history.location.pathname ||
      window.sessionStorage.getItem("activeKey"))
  };

  toggle = () => {
    // act.onIncrement();
    store.dispatch(act.onIncrement());
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = obj => {
    // act.onDecrement();
    this.props.dispatch(act.onDecrement());
    this.props.history.push({
      pathname: obj.path
    });
    window.sessionStorage.setItem("activeKey", obj.path);
  }

  renderRoutes = () => {
    return routes.map(route => {
      return (
        <Route key={route.path}
          exact path={route.path}
          component={route.component} />
      );
    });
  }

  render() {
    const ItemArray = routes.map(route => {
      return (
        <Menu.Item key={route.path} onClick={() => this.handleClick(route)}>
          <Icon type={route.iconType} />
          <span>{route.name}</span>
        </Menu.Item>
      );
    });
    return (
      <Layout id="wrapper">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.activeKey]}>
            {ItemArray}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <span className="trigger">计数器：{this.props.count}</span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
            }}
          >
            {this.renderRoutes()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateTopProps = state => ({
  count: state
});

export default connect(mapStateTopProps)(App);
