import React from 'react'

import './index.less'

export default function Box(props) {
  console.log(props)
  console.log(props.children[1])
  return (
    <div className="box">
      {props.children}
    </div>
  )
}
