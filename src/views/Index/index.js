
import React, { Component } from "react";

// 样式
import "./index.less";

// 自定义组件
import { IndexHOC } from '@/components'


@IndexHOC
class Index extends Component {

  render(){
    return (
      <div className="indexContent">
        <div className="index-font">
          <h2>开发者：小卡车</h2>
          <h3>技术栈：React、Redux、Express、Mongodb</h3>
        </div>
      </div>
    );
  }
}
export default Index