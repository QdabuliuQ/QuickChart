import ajax from '@/network/index'
import { ResponseType } from '@/types/request'

export function postScreenImage(data: {
	option: any
	width: string
	height: string
	c_width: string
	c_height: string
	type: string
}): ResponseType {
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
}): ResponseType {
	return ajax({
		url: '/sc/screen',
		method: 'post',
		data
	})
}

// 获取保存的大屏
export function getScreens(params: { offset: number; limit: number }): ResponseType {
	return ajax({
		url: '/sc/screens',
		method: 'get',
		params
	})
}

// 修改名称
export function putScreenName(data: { name: string; screen_id: string }): ResponseType {
	return ajax({
		url: '/sc/screenName',
		method: 'put',
		data
	})
}

// 获取大屏信息
export function getScreen(params: { screen_id: string }): ResponseType {
	return ajax({
		url: '/sc/screen',
		method: 'get',
		params
	})
}

// 修改大屏
export function putScreen(data: {
	screen_id: string
	option: string
	c_width: number
	c_height: number
}) {
	return ajax({
		url: '/sc/screen',
		method: 'put',
		data
	})
}

// 获取大屏信息
export function getDetail(params: { screen_id: string }) {
	return ajax({
		url: '/sc/detail',
		method: 'get',
		params
	})
}

// 大屏点赞
export function postPraise(data: { screen_id: string; type: 0 | 1 }) {
	return ajax({
		url: '/sc/praise',
		method: 'post',
		data
	})
}

// 发表评论
export function postComment(data: { screen_id: string; content: string }) {
	return ajax({
		url: '/sc/comment',
		method: 'post',
		data
	})
}

// 获取评论
export function getComment(params: { screen_id: string; limit: number; offset: number }) {
	return ajax({
		url: '/sc/comment',
		method: 'get',
		params
	})
}

// 删除评论
export function deleteComment(data: { comment_id: string }) {
	return ajax({
		url: '/sc/comment',
		method: 'delete',
		data
	})
}

// 评论点赞/取消点赞
export function postCommentPraise(data: { comment_id: string; type: '0' | '1' }) {
	return ajax({
		url: '/sc/commentPraise',
		method: 'post',
		data
	})
}
