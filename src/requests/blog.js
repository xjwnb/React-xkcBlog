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