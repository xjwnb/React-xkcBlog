import React, { Component } from 'react';

// 高阶组件
import { IndexHOC } from '../../components'
// react-router-dom
import { withRouter } from 'react-router-dom'
// 请求
import { getBlogInfoById } from '../../requests/blog'
// 样式
import './index.less'

@IndexHOC
@withRouter
class BlogList extends Component {
  constructor() {
    super()
    this.state = {
      blogContent: '',
      __html: ''
    }
  }

componentDidMount() {
  console.log(this.props)
  let props = this.props
  let id = props.match.params.id
  console.log(id)
  getBlogInfoById(id).then(res => {
    console.log(res)
    if (res.status === 200) {
      let blogContent = res.data.blogInfo
      this.setState({
        blogContent,
        __html: blogContent.content
      })
    }
  })
}


  render() {
    let state = this.state
    return (
      <div className="conten">
        <h1 className="title">{ state.blogContent.title }</h1>
        <h1 className="author">{ state.blogContent.author }</h1>
        <h3 className="blogtime">{ state.blogContent.time }</h3>
        {/* <h1 className="blogcontent">{ state.blogContent.content }</h1> */}
        <div className="blogContent">
          <div dangerouslySetInnerHTML={{ __html: state.__html }} />
        </div>
      </div>
    );
  }
}

export default BlogList
