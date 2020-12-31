import { request } from "./index";

// 获取标签
export function getTagInfo() {
  return request({
    url: "/tagInfo/getTagInfo",
  });
}


// 提交标签
export function postTagInfo(data) {
  return request({
    url: "/tagInfo/postTagInfo",
    method: "post",
    data,
  });
}


// 删除标签
export function deleteTagInfo(tagName) {
  return request({
    url: '/tagInfo/deleteTagInfo',
    method: 'post',
    data: {
      tagName
    }
  })
}