
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
          <h3>博客前端：React</h3>
          <h3>博客管理后台：Node.js、Express、MongoDB</h3>
        </div>
      </div>
    );
  }
}
export default Index
