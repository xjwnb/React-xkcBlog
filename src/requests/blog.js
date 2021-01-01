import { request } from "./index";

// 获取所有博客信息
export function getBlogInfo() {
  return request({
    url: "/blog/getBlogInfo",
  });
}

// 通过id 获取博客
export function getBlogInfoById(id) {
  return request({
    url: "/blog/getBlogInfoById",
    params: {
      id,
    },
  });
}

export function getBlogBySearch(title) {
  return request({
    url: "/blog/getBlogBySearch",
    params: {
      title,
    },
  });
}

// 通过标签获取博客信息
export function getBlogInfoByTag(tagName) {
  return request({
    url: "/blog/getBlogInfoByTag",
    params: {
      tagName,
    },
  });
}
