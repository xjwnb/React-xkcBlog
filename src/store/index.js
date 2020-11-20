/*
 * @Author: your name
 * @Date: 2020-05-15 07:40:55
 * @LastEditTime: 2020-09-19 11:36:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \小卡车的博客f:\Github_my_project\react-blog\src\store\index.js
 */
import { createStore } from 'redux'

import rootReducer from './reducers'

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )