import React, { Component } from "react";

import "./index.less";

export default class NotFoundCom extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="font-div">
          <div className="interest-font">有内鬼，终止交易！</div>
          <div className="font">NOT FOUND</div>
        </div>
      </div>
    );
  }
}
