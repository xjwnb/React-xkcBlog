import React, { Component } from "react";

// 自定义组件
import { IndexCom } from "../../components";


// 高阶组件 顶部内容底部 高级处理
const IndexHOC = (WrappedComponent) =>
  class Index extends Component {
    render() {
      return (
        <IndexCom>
          <WrappedComponent />
        </IndexCom>
      );
    }
  };

export default IndexHOC;

