import React from "react";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href="/home">go back home</a>
      </div>
    );
  };

  componentDidMount() {
    // console.log(this.props.match.params);
    console.log(this.props.history.location.state);
  }
};
