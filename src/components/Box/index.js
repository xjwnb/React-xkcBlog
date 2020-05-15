import React from 'react'

import './index.less'

export default function Box(props) {
  return (
    <div className="box">
      {props.children}
    </div>
  )
}
