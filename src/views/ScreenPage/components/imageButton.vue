<template>
	<button-item icon="i_img" tip="插入图片" title="图片" @click-event="clickEvent" />
	<input
		ref="inputRef"
		accept=".jpg,.png,.jpeg"
		style="display: none"
		type="file"
		@change="selectFile" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { getImageConfig, getRecordOption } from '@/utils/screenUtil'
import { fileType } from '@/utils'

const inputRef = ref()
const proxy = useProxy()
const { screen } = useStore()
const clickEvent = () => {
	inputRef.value.click()
}

const selectFile = () => {
	let img = (inputRef.value as any).files[0]
	if (fileType(img.name) == 'image') {
		if (img.size / 1024 > 1000) {
			proxy.$notice({
				type: 'error',
				message: '图片大小不能超过1M',
				position: 'top-left'
			})
		} else {
			let reader = new FileReader()
			reader.readAsDataURL(img)
			reader.onload = function (e: any) {
				screen.addScreenOptionOfElements(
					getImageConfig({
						url: e.target.result,
						file: img
					})
				)
				screen.addOperationRecordItem(getRecordOption('add', 'image'))
			}
		}
	} else {
		proxy.$notice({
			type: 'error',
			message: '请上传图片(jpg/png/jpeg)',
			position: 'top-left'
		})
	}
	;(inputRef.value as any).value = ''
}
</script>
