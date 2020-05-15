import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'

import { 
  message,
  Table, 
  Tag, 
  Space 
} from 'antd'

import { connect } from 'react-redux'

import { getBlogInfo } from '../../requests/admin'

function Article(props) {

  const [blogInfo, setBlogInfo] = useState([])
  const [columns, setcolumns] = useState([])
  const [data, setdata] = useState([])

  useEffect(() => {

    let timer = null
    console.log(props.login)
    if (!props.login.isLogin) {
      message.warning('请重新登录！')
      timer = setTimeout(() => {
        props.history.push('/login')
      }, 3000)
    } 

    const getData = async () => {
      let blog = await getBlogInfo()
      await setBlogInfo(blog.data)
    }


    const getColumns = () => {
      console.log(blogInfo)
    }
    getData()
    getColumns()
    // 消除副作用
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      Article
      <Table columns={columns}  />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(withRouter(Article))
