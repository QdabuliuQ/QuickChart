<template>
	<div class="login-panel">
		<el-form ref="ruleFormRef" :model="form" :rules="rules">
			<el-form-item prop="email">
				<el-input v-model="form.email" placeholder="请输入邮箱" />
			</el-form-item>
			<el-form-item v-if="type == 'password'" prop="password">
				<el-input v-model="form.password" placeholder="请输入密码" show-password type="password" />
			</el-form-item>
			<el-form-item v-else-if="type == 'code'" prop="code">
				<el-input v-model="form.code" placeholder="验证码">
					<template #append>
						<div
							:style="{
								backgroundColor: disable ? '#e8e8e8' : '#ffae34',
								color: disable ? '#000' : '#fff'
							}"
							class="code-btn"
							@click="sendCode">
							{{ disable ? codeTime + '后重新发送' : '发送验证码' }}
						</div>
					</template>
				</el-input>
			</el-form-item>
			<drag-verify :key="type" v-model:value="verify" class="drag-item"></drag-verify>
			<div class="tip">
				<span v-show="type == 'code'" class="toggle" @click="typeToggle('password')">密码登录</span>
				<span v-show="type == 'password'" class="toggle" @click="typeToggle('code')">
					验证码登录
				</span>
				<span class="forget" @click="emits('forgeted')">忘记密码？</span>
			</div>
		</el-form>
		<button class="login" @click="toLogin">登录</button>
	</div>
</template>
<script lang="ts" setup>
import { onUnmounted, reactive, ref, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

import dragVerify from './dragVerify.vue'
import { emailPattern, publicKey } from '@/utils'

import { getCode, login, loginByCode } from '@/network/login'
import JsEncrypt from 'jsencrypt'

const emits = defineEmits(['finished', 'forgeted'])
const proxy = useProxy()
const ruleFormRef = ref()
defineExpose({
	ruleFormRef
})
let rules = reactive<any>({
	email: [
		{ required: true, message: '邮箱不能为空', trigger: 'blur' },
		{ pattern: emailPattern, message: '邮箱格式错误', trigger: 'blur' }
	]
})
const form = reactive({
	email: '111@qq.com',
	password: '111111',
	code: '111111'
})
const verify = ref<boolean>(false)
const type = ref<string>('code')
const disable = ref<boolean>(false)
const codeTime = ref<number>(60)
const stop = watch(
	type,
	(val: any) => {
		if (val === 'password') {
			delete rules['code']
			rules['password'] = [
				{ required: true, message: '密码不能为空', trigger: 'blur' },
				{
					pattern: /^[\S]{6,12}$/,
					message: '密码长度在6-12位之间',
					trigger: 'blur'
				}
			]
			ruleFormRef.value && (ruleFormRef.value as any).resetFields()
		} else if (val === 'code') {
			delete rules['password']
			rules['code'] = [
				{ required: true, message: '验证码不能为空', trigger: 'blur' },
				{
					pattern: /^\d{6}$/,
					message: '请输入6位验证码',
					trigger: 'blur'
				}
			]
			ruleFormRef.value && (ruleFormRef.value as any).resetFields()
		}
	},
	{
		immediate: true
	}
)

const typeToggle = (_type: string) => {
	type.value = _type
	verify.value = false
	;(ruleFormRef.value as any).resetFields()
}

let timer: any = null
const sendCode = async () => {
	// 发送验证码
	if (disable.value) return
	let email = form.email.trim()
	if (email.length == 0)
		return proxy.$notice({
			message: '邮箱不能为空',
			type: 'error',
			position: 'top-left'
		})
	if (emailPattern.test(email)) {
		const data: any = await getCode({
			email,
			type: 'login'
		})
		if (!data.status)
			return proxy.$notice({
				message: data.msg,
				type: 'error',
				position: 'top-left'
			})
		disable.value = true
		timer = setInterval(() => {
			codeTime.value -= 1
			if (codeTime.value === 0) {
				clearInterval(timer)
				disable.value = false
				codeTime.value = 60
			}
		}, 1000)
	} else {
		proxy.$notice({
			message: '邮件格式错误',
			type: 'error',
			position: 'top-left'
		})
	}
}

const en = new JsEncrypt()
en.setPublicKey(publicKey)
const toLogin = () => {
	// 登录
	if (!verify.value)
		return proxy.$notice({
			type: 'error',
			message: '请完成滑动验证',
			position: 'top-left'
		})
	;(ruleFormRef.value as any).validate(async (valid: boolean) => {
		if (!valid)
			return proxy.$notice({
				message: '请完善输入内容',
				type: 'error',
				position: 'top-left'
			})
		if (type.value === 'code') {
			// 验证码登录
			const data: any = await loginByCode({
				email: form.email,
				code: form.code
			})
			if (data.status) {
				saveData(data.token, data.id, data.data)
				proxy.$notice({
					type: 'success',
					message: data.msg,
					position: 'top-left'
				})
				emits('finished')
				proxy.$Bus.emit('logined')
			}
		} else {
			// 密码登录
			const data: any = await login({
				email: form.email,
				password: en.encrypt(form.password) as string
			})
			if (data.status) {
				saveData(data.token, data.id, data.data)
				proxy.$notice({
					type: 'success',
					message: data.msg,
					position: 'top-left'
				})
				emits('finished')
				proxy.$Bus.emit('logined')
			}
		}
	})
}

const saveData = (token: string, id: string, info: any) => {
	localStorage.setItem('token', token)
	localStorage.setItem('id', id)
	localStorage.setItem('info', JSON.stringify(info))
}

onUnmounted(() => {
	stop()
})
</script>
<style lang="less">
.login-panel {
	display: flex;
	flex-direction: column;
	.input-style();

	.tip {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		font-size: 13px;

		span {
			cursor: pointer;
		}

		.forget {
			color: @grey;
		}

		.toggle {
			color: @theme;
		}
	}

	.login {
		width: 100%;
		height: 40px;
		background-color: @theme;
		border: 0;
		border-radius: 8px;
		cursor: pointer;

		&:hover {
			background-color: @hover;
		}
	}

	.drag-item {
		margin-bottom: 15px;
	}

	.el-input-group__append {
		overflow: hidden;
		padding: 0;
		font-size: 13px;
		background-color: @grey2;
		box-shadow: 0 1px 0 0 @grey2 inset, 0 -1px 0 0 @grey2 inset, -1px 0 0 0 @grey2 inset;
		cursor: pointer;
	}

	.code-btn {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0 20px;
	}

	.el-form-item {
		margin-bottom: 22px;
	}
}
</style>
