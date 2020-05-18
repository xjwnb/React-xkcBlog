import axios from 'axios'

// 封装 axios 方法，返回值是 Promise
export function request(options) {
  return new Promise((resolve, reject) => {
    // 创建 axios 实例
    const instance = axios.create({
      baseURL: "http://localhost:8888",
      timeout: 1000000,
    });

    // 响应拦截器
    instance.interceptors.response.use((res) => {
      // console.log(res.data);
      if (res.status === 200) {
        console.log(res);
        return res.data;
      } else {
        console.log(res);
      }
    });

    // 请求拦截器
    instance.interceptors.request.use((config) => {
      console.log(config);
      return config;
    });

    // 允许存储cookie
    instance.defaults.withCredentials = true;

    // 通过实例进行网络请求
    instance(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
