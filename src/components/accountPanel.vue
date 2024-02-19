<template>
	<el-form ref="ruleFormRef" :rules="rules" :model="form">
		<el-form-item prop="email">
			<el-input v-model="form.email" placeholder="请输入邮箱" />
		</el-form-item>
		<el-form-item prop="code">
			<el-input v-model="form.code" placeholder="请输入验证码">
				<template #append>
					<div
						:style="{
							backgroundColor: codeTime !== 60 ? '#e8e8e8' : '#ffae34',
							color: codeTime !== 60 ? '#000' : '#fff'
						}"
						class="code-btn"
						@click="sendCode">
						{{ codeTime !== 60 ? codeTime + '后重新发送' : '发送验证码' }}
					</div>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" show-password v-model="form.password" placeholder="请输入密码" />
		</el-form-item>
		<el-form-item prop="re_password">
			<el-input type="password" show-password v-model="form.re_password" placeholder="请确认密码" />
		</el-form-item>
		<el-form-item>
			<drag-verify class="drag-item" v-model:value="form.verify"></drag-verify>
		</el-form-item>
	</el-form>
	<button @click="submitEvent" class="login">{{ props.btnText }}</button>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

import dragVerify from '@/components/dragVerify.vue'

import useProxy from '@/hooks/useProxy.ts'

import { emailPattern, publicKey } from '@/utils'

import { getCode } from '@/network/login.ts'
import JsEncrypt from 'jsencrypt'

const ruleFormRef = ref<any>()
defineExpose({
	ruleFormRef
})

interface IProps {
	btnText: string
	codeType: 'login' | 'register'
}
const props = defineProps<IProps>()
const codeTime = ref<number>(60)
const form = reactive({
	email: '',
	code: '',
	password: '',
	re_password: '',
	verify: false
})

const proxy = useProxy()

const rules = reactive({
	email: [
		{ required: true, message: '邮箱不能为空', trigger: 'blur' },
		{ pattern: emailPattern, message: '邮箱格式错误', trigger: 'blur' }
	],
	code: [
		{ required: true, message: '验证码不能为空', trigger: 'blur' },
		{
			pattern: /^\d{6}$/,
			message: '请输入6位验证码',
			trigger: 'blur'
		}
	],
	password: [
		{ required: true, message: '密码不能为空', trigger: 'blur' },
		{
			pattern: /^[\S]{6,12}$/,
			message: '密码长度在6-12位之间',
			trigger: 'blur'
		}
	],
	re_password: [
		{ required: true, message: '密码不能为空', trigger: 'blur' },
		{
			pattern: /^[\S]{6,12}$/,
			message: '密码长度在6-12位之间',
			trigger: 'blur'
		}
	]
})

let timer: any = null
const sendCode = async () => {
	// 发送验证码
	if (codeTime.value !== 60 || timer) return
	let email = form.email.trim()
	if (email.length == 0)
		return proxy.$notice({
			message: '邮箱不能为空',
			type: 'error',
			position: 'top-left'
		})
	if (emailPattern.test(email)) {
		let data: any = await getCode({
			email,
			type: props.codeType
		})
		if (!data.status) return
		timer = setInterval(() => {
			codeTime.value -= 1
			if (codeTime.value === 0) {
				clearInterval(timer)
				codeTime.value = 60
			}
		}, 1000)
	} else {
		proxy.$notice({
			message: '邮箱格式错误',
			type: 'error',
			position: 'top-left'
		})
	}
}

const emits = defineEmits(['finished'])
const en = new JsEncrypt()
en.setPublicKey(publicKey)
const submitEvent = () => {
	if (form.password != form.re_password)
		return proxy.$notice({
			message: '确认密码不一致',
			type: 'error',
			position: 'top-left'
		})
	;(ruleFormRef.value as any).validate(async (valid: boolean) => {
		if (!valid)
			return proxy.$notice({
				message: '请完善表单内容',
				type: 'error',
				position: 'top-left'
			})
		if (!form.verify) {
			return proxy.$notice({
				message: '请完成拖拽验证',
				type: 'error',
				position: 'top-left'
			})
		}
		emits('finished', {
			email: form.email,
			code: form.code,
			password: en.encrypt(form.password) as string,
			re_password: en.encrypt(form.re_password) as string
		})
	})
}
</script>
<style lang="less"></style>
