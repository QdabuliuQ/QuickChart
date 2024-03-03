import ajax from './index'

export function getCityData() {
	return ajax({
		url: '/map/cityData',
		method: 'get'
	})
}

export function getCityJSON(params: { adcode: string }) {
	return ajax({
		url: '/map/cityJSON',
		method: 'get',
		params
	})
}

export function getRegionJSON() {
	return ajax({
		url: '/map/regionJSON',
		method: 'get'
	})
}

export function postChart(data: FormData) {
	return ajax({
		url: '/map/chart',
		method: 'post',
		data
	})
}

export function getChart(params: { offset: number }) {
	return ajax({
		url: '/map/chart',
		method: 'get',
		params
	})
}

export function putChartName(data: { name: string; map_id: string }) {
	return ajax({
		url: '/map/chartName',
		method: 'put',
		data
	})
}

export function deleteChart(data: { map_id: string }) {
	return ajax({
		url: '/map/chart',
		method: 'delete',
		data
	})
}

export function getChartDetail(params: { map_id: string }) {
	return ajax({
		url: '/map/chartDetail',
		method: 'get',
		params
	})
}

export function putChart(data: FormData) {
	return ajax({
		url: '/map/chart',
		method: 'put',
		data
	})
}

export function postPraise(data: {
	// 点赞图表
	map_id: string
	state: string
}) {
	return ajax({
		url: '/map/praise',
		method: 'post',
		data
	})
}

export function postComment(data: {
	// 发表评论
	map_id: string
	content: string
}) {
	return ajax({
		url: '/map/comment',
		method: 'post',
		data
	})
}

export function getComment(params: {
	// 获取评论
	map_id: string
	offset: number
	limit: number
}) {
	return ajax({
		url: '/map/comment',
		method: 'get',
		params
	})
}

export function deleteComment(data: {
	// 删除评论
	comment_id: string
}) {
	return ajax({
		url: '/map/comment',
		method: 'delete',
		data
	})
}

export function postPraiseComment(data: { comment_id: string; type: '1' | '0' }) {
	return ajax({
		url: '/map/praiseComment',
		method: 'post',
		data
	})
}

export function getMapTemplateList() {
	return ajax({
		url: '/map/mapTemplateList',
		method: 'get'
	})
}
