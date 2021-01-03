/*
 * @Author: your name
 * @Date: 2020-05-19 15:59:23
 * @LastEditTime: 2021-01-03 10:25:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\IndexHOC\index.js
 */
import React, { Component } from "react";

// 自定义组件
import { IndexCom } from "../../components";

// 高阶组件 顶部内容底部 高级处理
const IndexHOC = (WrappedComponent) => {
  return class Index extends Component {
    constructor(props) {
      super(props);
      
    }
    render() {
      
      return (
        <IndexCom>
          <WrappedComponent />
        </IndexCom>
      );
    }
  };
};

export default IndexHOC;
