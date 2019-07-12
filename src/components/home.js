import React from "react";
import { Button } from "antd";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = e => {
    console.log(1111,this.props);
    this.props.history.push({
      pathname: "/game"
    });
  }

  render() {
    return (
      <div>
        {/* <a href="/detail">go to detail</a> */}
        <button onClick={() => this.props.history.push({
          pathname: "/detail",
          state: {
            id: 111
          }
        })}>click to go</button>
        <Button onClick={this.handleClick}>Game</Button>
      </div>
    );
  };
};
