
import React from 'react'

import './index.less'

import { Alert } from 'antd';


export default function AlertCom(props) {
  return (
    <div>
      {
        props
        ?
        <Alert className="alert" banner message={ props.message } type={ props.type } showIcon/>
        :
        null
      }
    </div>
  )
}
