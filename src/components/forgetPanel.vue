<template>
	<div class="forget-panel">
		<account-panel :codeType="'login'" ref="accountPanelRef" @finished="finished" btn-text="确定" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import AccountPanel from '@/components/accountPanel.vue'

import useProxy from '@/hooks/useProxy.ts'

import { modifyPassword } from '@/network/login.ts'
const emits = defineEmits(['finished'])
const accountPanelRef = ref()

const clearForm = () => {
	accountPanelRef.value && accountPanelRef.value.ruleFormRef.resetFields()
}

defineExpose({
	resetFields: clearForm
})

const proxy = useProxy()
const finished = async (info: any) => {
	const data: any = await modifyPassword(info)
	if (data.status) {
		proxy.$notice({
			message: data.msg,
			type: 'success',
			position: 'top-left'
		})
		emits('finished')
	}
}
</script>
<style lang="less">
.forget-panel {
	.input-style();

	.el-form {
		display: flex;
		flex-direction: column;

		.el-form-item {
			margin-bottom: 22px;
		}

		.el-input-group__append {
			overflow: hidden;
			padding: 0;
			font-size: 13px;
			background-color: @grey2;
			box-shadow:
				0 1px 0 0 @grey2 inset,
				0 -1px 0 0 @grey2 inset,
				-1px 0 0 0 @grey2 inset;
			cursor: pointer;
		}

		.code-btn {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			padding: 0 20px;
		}
	}
	.login {
		width: 100%;
		height: 40px;
		background-color: @theme;
		border: 0;
		border-radius: 8px;
		cursor: pointer;
		letter-spacing: 5px;
		text-indent: 5px;

		&:hover {
			background-color: @hover;
		}
	}
}
</style>
