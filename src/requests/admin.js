import { request } from './index'

// 发表
export function publish(data) {
  return request({
    url: '/admin/publish',
    method: 'post',
    data
  })
}

// 查询所有博客信息 
export function getBlogInfo() {
  return request({
    url: '/admin/getBlogInfo'
  })
}