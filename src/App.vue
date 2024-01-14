<template>
	<router-view />
	<login-dialog />
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref, onUnmounted } from 'vue'
import loginDialog from '@/components/loginDialog.vue'

let timer: any
const _this: any = getCurrentInstance()
const height = ref<number>(0)

const resizeEvent = () => {
	clearTimeout(timer)
	timer = setTimeout(() => {
		height.value = document.documentElement.clientHeight
		_this.proxy.$Bus.emit('resize', height.value)
	}, 500)
}

onMounted(() => {
	window.addEventListener('resize', resizeEvent)
})

onUnmounted(() => {
	window.removeEventListener('resize', resizeEvent)
})
</script>

<style lang="less">
body {
	padding: 0;
	margin: 0;
	color: #d0d0d0;
	background-color: #282828;
}

::selection {
	color: rgb(255 255 255);
	background: rgb(255 174 52 / 32.5%);
}

::-webkit-selection {
	color: #fff;
	background: #ffae3453;
}

.params-select-popper-class {
	/* stylelint-disable */
	.el-select-dropdown__item {
		font-size: 12px;
	}
	/* stylelint-enable */
}

img {
	user-select: none;
}

.el-button {
	span {
		font-size: 13px !important;
	}
}

.el-button:focus-visible {
	outline: 2px solid transparent !important;
}

.hljs {
	overflow-y: scroll;
	max-height: 430px;
	font-size: 18px;
}

.code-dialog-class {
	/* stylelint-disable */
	.el-dialog__body {
		padding: 0 15px 15px;
	}
	/* stylelint-enable */
}

.pagination-class {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
