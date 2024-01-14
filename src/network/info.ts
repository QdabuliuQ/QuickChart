import ajax, { upload } from './index'

export function avatarUpload(data: any) {
	return upload('/avatar', data)
}

export function putProfile(data: {
	// 更新用户信息
	user_pic: string
	nickname: string
	homePage: string
	desc: string
}) {
	return ajax({
		url: '/info/profile',
		method: 'put',
		data
	})
}

export function getProfile() {
	return ajax({
		url: '/info/profile',
		method: 'get'
	})
}

export function getCode() {
	return ajax({
		url: '/info/code',
		method: 'get'
	})
}

export function putPassword(data: { old_password: string; new_password: string; code: string }) {
	return ajax({
		url: '/info/password',
		method: 'put',
		data
	})
}
