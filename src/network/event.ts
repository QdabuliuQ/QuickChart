import ajax, { upload } from '@/network/index'

export function getEvents(params: { type: string; offset: number }) {
	return ajax({
		url: '/ev/events',
		method: 'get',
		params
	})
}

export function postPraise(data: { event_id: string; type: string }) {
	return ajax({
		url: '/ev/praise',
		method: 'post',
		data
	})
}
export function postEvent(data: {
	chart_id: string
	content: string
	type: 'chart' | 'map' | 'screen'
	d_type: string
}) {
	return ajax({
		url: '/ev/event',
		method: 'post',
		data
	})
}
export function getUserEvent(params: { user_id: string; offset: number }) {
	return ajax({
		url: '/ev/userEvent',
		method: 'get',
		params
	})
}

export function postComment(data: { content: string; event_id: string }) {
	return ajax({
		url: '/com/comment',
		method: 'post',
		data
	})
}

export function getComment(params: { event_id: string; offset: number }) {
	return ajax({
		url: '/com/comment',
		method: 'get',
		params
	})
}

export function deleteComment(data: { comment_id: string }) {
	return ajax({
		url: '/com/comment',
		method: 'delete',
		data
	})
}

export function postPraiseComment(data: { comment_id: string; type: '1' | '0' }) {
	return ajax({
		url: '/com/praiseComment',
		method: 'post',
		data
	})
}

export function screenImageUpload(data: any) {
	return upload('/screenImage', data)
}

export function getChartType() {
	return ajax({
		url: '/ev/chartType',
		method: 'get'
	})
}
