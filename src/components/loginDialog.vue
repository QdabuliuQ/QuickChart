<template>
	<el-dialog class="login-dialog-class" v-model="visible" :show-close="false">
		<i @click="close" class="iconfont i_close_line"></i>
		<div class="left-cover">
			<div>
				<div class="left-text">
					<div class="text1">快速生成图表工具</div>
					<div class="text2">0代码，1分钟，制作炫酷图表</div>
					<img src="@/assets/image/login_img.png" />
					<div class="mask"></div>
				</div>
			</div>
		</div>
		<div class="right-content">
			<div class="tabbar">
				<div @click="active = 'login'" :class="[active == 'login' ? 'active' : '', 'tab-item']">
					账号登录
				</div>
				<div
					@click="active = 'register'"
					:class="[active == 'register' ? 'active' : '', 'tab-item']">
					账号注册
				</div>
				<div @click="active = 'forget'" :class="[active == 'forget' ? 'active' : '', 'tab-item']">
					忘记密码
				</div>
			</div>
			<div class="panel-container">
				<login-panel
					@forgeted="active = 'forget'"
					ref="loginPanelRef"
					@finished="visible = false"
					v-if="active == 'login'" />
				<register-panel
					ref="registerRef"
					@finished="active = 'login'"
					v-else-if="active === 'register'" />
				<forget-panel ref="forgetRef" @finished="active = 'login'" v-else />
			</div>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

import forgetPanel from './forgetPanel.vue'
import loginPanel from './loginPanel.vue'
import registerPanel from './registerPanel.vue'

import useProxy from '@/hooks/useProxy'

const active = ref<'login' | 'register' | 'forget'>('login')
const visible = ref(false)
const loginPanelRef = ref()
const registerRef = ref()
const proxy = useProxy()

const showLoginDialog = () => {
	visible.value = true
}

// 收到事件总线 打开登录窗口
proxy.$Bus.on('showLoginDialog', showLoginDialog)

const close = () => {
	loginPanelRef.value && loginPanelRef.value.ruleFormRef.resetFields() // 清除表单内容
	registerRef.value && registerRef.value.resetFields() // 清除表单内容
	visible.value = false
}

onUnmounted(() => {
	proxy.$Bus.off('showLoginDialog', showLoginDialog)
})
</script>

<style lang="less">
.login-dialog-class {
	overflow: hidden !important;
	width: 770px !important;
	background-color: #fff !important;
	border-radius: 10px !important;
	box-shadow: 0 0 0 0 !important;
	aspect-ratio: 2/1.3 !important;

	.el-dialog__header {
		display: none;
		padding: 0;
	}
	.el-dialog__body {
		position: relative;
		display: flex !important;
		align-items: center !important;
		width: 100%;
		height: 100%;
		padding: 0;
	}
	.i_close_line {
		position: absolute;
		top: 20px;
		right: 20px;
		color: @grey;
		cursor: pointer;
		&:hover {
			color: @theme;
		}
	}
	.left-cover {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 35%;
		height: 100%;
		background-color: @theme;
		.left-text {
			position: relative;
			text-align: center;
			.text1 {
				font-size: 23px;
				color: #fff;
				font-weight: bold;
				letter-spacing: 2px;
			}
			.text2 {
				margin-top: 10px;
				font-size: 16px;
				color: #fff;
			}
			img {
				width: 65%;
				margin-top: 10px;
			}
			.mask {
				position: absolute;
				bottom: -20px;
				width: 100%;
				height: 100px;
				background: linear-gradient(to top, @theme, transparent);
			}
		}
	}
	.right-content {
		height: 100%;
		flex: 1;
		.tabbar {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			margin: 50px 0 0;
			box-sizing: border-box;
			border-bottom: 2px solid @grey2;
			.tab-item {
				display: flex;
				align-items: center;
				height: 100%;
				padding: 0 15px;
				margin: 0 15px;
				font-size: 18px;
				transition: 0.2s all linear;
				font-weight: bold;
				cursor: pointer;
				box-sizing: border-box;
			}
			.active {
				color: @theme;
				border-bottom: 2px solid @theme;
			}
		}
		.panel-container {
			height: calc(100% - 90px);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
