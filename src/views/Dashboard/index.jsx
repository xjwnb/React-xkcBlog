import React, { useEffect } from 'react'

import { withRouter } from 'react-router-dom'

import { message } from 'antd'

import { connect } from 'react-redux'

function Dashboard(props) {

  useEffect(() => {
    console.log(props.login)
    let timer = null
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
      Dashboard
    </div>
  )
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(withRouter(Dashboard))
