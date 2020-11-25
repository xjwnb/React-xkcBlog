/*
 * @Author: your name
 * @Date: 2020-05-14 21:45:40
 * @LastEditTime: 2020-11-25 16:44:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\requests\admin.js
 */


import { request } from "./index";

// 发表
export function publish(data) {
  return request({
    url: "/admin/publish",
    method: "post",
    data,
  });
}

// 查询所有博客信息
export function getBlogInfo() {
  return request({
    url: "/admin/getBlogInfo"
  });
}

// 修改置顶状态
export function editTopShowTop(id) {
  return request({
    url: '/admin/editToShowTop',
    method: "post",
    data: {
      id
    }
  })
}

// 根据 id 获得对应数据用于博客编辑功能
export function getBlogInfoById(id) {
  return request({
    url: '/admin/getBlogInfoById',
    params: {
      id
    }
  })
}

// 编辑博客
export function editorBlogInfo(data) {
  return request({
    url: '/admin/editorBlogInfo',
    method: 'post',
    data
  })
}

// 删除博客
export function deleteBlogInfo(id) {
  return request({
    url: '/admin/deleteBlogInfo',
    method: 'post',
    data: {
      id
    }
  })
}

// 注销登陆
export function loginOut() {
  return request({
    url: "/admin/loginOut",
    method: "get"
  })
}

// 获取管理员信息
export function getAdminInfo() {
  return request({
    url: "/adminInfo/getAdminInfo",
    method: "get"
  })
}

// 修改管理员信息
export function postAdminInfo(data) {
  return request({
    url: "/adminInfo/postAdminInfo",
    method: "post",
    data
  })
}


// 测试
export function getSkip() {
  return request({
    url: "/admin/skip",
    method: "get"
  })
}
