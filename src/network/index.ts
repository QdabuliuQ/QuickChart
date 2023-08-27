import axios from "axios"
import { ElNotification } from 'element-plus'

export const oss: string = 'http://127.0.0.1:3031'
export const getToken = (): string => {
  return localStorage.getItem('token') ?? ''
}

const ajax = axios.create({
  baseURL: oss,
  headers: {
    Authorization: getToken(),
    'content-type': 'application/x-www-form-urlencoded',
  },
  timeout: 5000,
})

export const upload = (url: string, data: any) => {
  return axios.post(oss + '/upload/'+url, data, {
    headers: {
      Authorization: getToken(),
      "Content-Type": "multipart/form-data",
    }
  })
}

// 请求拦截器
// ajax.interceptors.request.use(function (config: any) {
//   // 发送请求的相关逻辑
//   // config:对象  与 axios.defaults 相当
//   // 借助config配置token
//   let token = getToken()
//   // 判断token存在再做配置
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// 响应拦截器
ajax.interceptors.response.use((req: any): any => {
  if(req.data.status == 0) {
    ElNotification({
      type: 'error',
      message: req.data.msg,
      position: 'top-left'
    })
  } else {
    return req.data
  }

  // if(req.data.status == -1) {
  //   // window.location.href = window.location.protocol + '//' + window.location.host + '/login'
  // } else {
  //   return req.data
  // }
}, err=>{
  // Toast.fail('网络错误')
  return
});


export default ajax
