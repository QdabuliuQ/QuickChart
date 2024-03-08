import axios from 'axios'
import { ElNotification } from 'element-plus'

export const oss: string = import.meta.env.VITE_API_URL
export const getToken = (): string => {
	return localStorage.getItem('token') ?? ''
}

const ajax = axios.create({
	baseURL: oss,
	headers: {
		Authorization: getToken(),
		'content-type': 'application/x-www-form-urlencoded'
	},
	timeout: 30000
})

export const upload = (url: string, data: any) => {
	return axios.post(oss + '/upload/' + url, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

// 请求拦截器
ajax.interceptors.request.use(
	function (config: any) {
		// 发送请求的相关逻辑
		// config:对象  与 axios.defaults 相当
		// 借助config配置token
		const token = getToken()
		// 判断token存在再做配置
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// 响应拦截器
ajax.interceptors.response.use(
	(req: any): any => {
		if (req.data.status == 0) {
			ElNotification({
				type: 'error',
				message: req.data.msg,
				position: 'top-left'
			})
			return req.data
		} else if (req.data.status == -1 || req.data.status == -2) {
			localStorage.removeItem('token')
			localStorage.removeItem('id')
			localStorage.removeItem('info')
			ElNotification({
				type: 'error',
				message: req.data.msg,
				position: 'top-left'
			})
			setTimeout(() => {
				location.href = '/'
			}, 1500)
		} else {
			return req.data
		}
	},
	() => {
		// Toast.fail('网络错误')
		return
	}
)

export default ajax
