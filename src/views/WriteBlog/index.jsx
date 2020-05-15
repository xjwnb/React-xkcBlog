import React, { useEffect } from "react";

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { message } from 'antd'

import { WriteMyBlog, Box } from "../../components";

function WriteBlog(props) {

  useEffect(() => {
    console.log(props.login.isLogin)
    let timer = null
    // 如果没有登录，跳转到登录页面
    if (!props.login.isLogin) {
      message.warning('请重新登录！')
      timer = setTimeout(() => {
        props.history.push('/login')
      }, 3000)
    }
    // 消除副作用
    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <div>
      <Box>
        <WriteMyBlog />
      </Box>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(withRouter(WriteBlog))
