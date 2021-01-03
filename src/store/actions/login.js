/*
 * @Author: your name
 * @Date: 2020-05-15 18:38:18
 * @LastEditTime: 2021-01-03 17:24:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\store\actions\login.js
 */
import actionTypes from './actionTypes'


export const successLogin = () => {
  // console.log(actionTypes.SUCCESS_LOGIN)
  return {
    type: actionTypes.SUCCESS_LOGIN
  }
}

export const failLogin = () => {
  return {
    type: actionTypes.FAIL_LOGIN
  }
}
