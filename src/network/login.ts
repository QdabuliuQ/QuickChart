import ajax from "./index";

export function getCode(params: {  // 获取验证码
  email: string
  type: 'login' | 'register'
}) {
  return ajax({
    url: '/api/code',
    method: 'get',
    params
  })
}

export function register(data: {  // 账号注册
  email: string
  code: string
  password: string
  re_password: string
}) {
  return ajax({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function login(data: {  // 密码登录
  email: string
  password: string
}) {
  return ajax({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function loginByCode(data: {
  email: string
  code: string
}) {
  return ajax({
    url: '/api/loginByCode',
    method: 'post',
    data
  })
}