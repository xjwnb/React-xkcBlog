// 使用结构获得 request方法 
import { request } from './index'

// post axios 请求
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// get axios 请求
export function user() {
  return request({
    url: '/admin/user'
  })
}