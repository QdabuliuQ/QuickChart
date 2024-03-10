import ajax from '@/network/index'

export function postScreenImage(data: {
	option: any
	width: string
	height: string
	c_width: string
	c_height: string
	type: string
}) {
	return ajax({
		url: '/sc/screenImage',
		method: 'post',
		data
	})
}

export function postScreenHtml(data: {
	mode: string
	option: string
	c_width: number
	c_height: number
}) {
	return ajax({
		url: '/sc/screenHtml',
		method: 'post',
		data
	})
}

export function postScreen(data: {
	name: string
	option: string
	c_width: number
	c_height: number
}) {
	return ajax({
		url: '/sc/screen',
		method: 'post',
		data
	})
}

// 获取保存的大屏
export function getScreens(params: { offset: number; limit: number }) {
	return ajax({
		url: '/sc/screens',
		method: 'get',
		params
	})
}

// 修改名称
export function putScreenName(data: { name: string; screen_id: string }) {
	return ajax({
		url: '/sc/screenName',
		method: 'put',
		data
	})
}

// 获取大屏信息
export function getScreen(params: { screen_id: string }) {
	return ajax({
		url: '/sc/screen',
		method: 'get',
		params
	})
}
