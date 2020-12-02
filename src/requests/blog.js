import { request } from "./index";

export function getBlogInfo() {
  return request({
    url: "/blog/getBlogInfo",
  });
}

export function getBlogInfoById(id) {
  return request({
    url: '/blog/getBlogInfoById',
    params: {
      id
    }
  })
}

export function getBlogBySearch(title) {
  return request({
    url: "/blog/getBlogBySearch",
    params: {
      title
    }
  })
}