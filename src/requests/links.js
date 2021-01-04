
import { request } from "./index";

// 获取标签
export function getLinksInfo() {
  return request({
    url: "/linksInfo/getLinksInfo",
  });
}

// 提交标签
export function postLinksInfo(data) {
  return request({
    url: "/linksInfo/postLinksInfo",
    method: "post",
    data,
  });
}

// 修改是否通过(isPass)
export function editIsPass(id) {
  return request({
    url: "/linksInfo/editIsPass",
    method: "post",
    data: {
      id,
    },
  });
}

// 删除 link
export function deleteLinksInfo(id) {
  return request({
    url: "/linksInfo/deleteLinksInfo",
    method: "post",
    data: {
      id,
    },
  });
}

// 编辑友链信息
export function editorLinksInfo(data) {
  return request({
    url: "/linksInfo/editorLinksInfo",
    method: "post",
    data,
  });
}

// 获取所有已通过的友链信息
export function getAllPassLinksInfo() {
  return request({
    url: "/linksInfo/getAllPassLinksInfo",
    method: "get",
  });
}
