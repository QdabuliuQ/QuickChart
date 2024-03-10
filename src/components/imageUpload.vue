<template>
	<div class="image-upload">
		<div style="padding: 2px 0" v-if="props.value">
			<el-link @click="dialogVisible = true" type="primary">查看</el-link>
			<el-link @click="deleteImage" type="danger">删除</el-link>
		</div>
		<div v-else>
			<input
				@change="fileUpload"
				accept="image/jpeg, image/png, image/jpg"
				ref="inputRef"
				style="display: none"
				type="file" />
			<el-button @click="uploadEvent" size="small" type="primary">
				<span style="transform: scale(0.85)">上传图片</span>
			</el-button>
		</div>
		<el-dialog class="image-preview-dialog" v-model="dialogVisible">
			<div class="image-container">
				<img w-full :src="props.value" />
			</div>
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import useProxy from '@/hooks/useProxy'

import { fileType } from '@/utils'

import axios from 'axios'

const proxy = useProxy()

interface IProps {
	value: string
	imgType: 'base64' | 'url'
	url: string
	imgSize: number
}
const props = defineProps<IProps>()
const emits = defineEmits(['imageChange', 'deleteImage'])
const dialogVisible = ref<boolean>(false)
const inputRef = ref<HTMLInputElement>()
const uploadEvent = () => {
	inputRef.value?.click()
}
const deleteImage = () => {
	emits('deleteImage')
}
const fileUpload = async () => {
	let img = (inputRef.value as any).files[0]

	if (fileType(img.name) == 'image') {
		if (img.size / 1024 > props.imgSize) {
			proxy.$notice({
				message: `图片大小不能大于${props.imgSize}kb`,
				type: 'error',
				position: 'top-left'
			})
		} else {
			if (props.imgType === 'url') {
				let formData = new FormData()
				formData.append('image', img)
				let { data } = await axios.post(props.url as string, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				if (!data.status)
					return proxy.$notice({
						message: data.msg,
						type: 'error',
						position: 'top-left'
					})
				emits('imageChange', data.url)
			} else {
				const reader = new FileReader()
				reader.readAsDataURL(img)
				reader.onload = function (ev: any) {
					// base64码
					emits('imageChange', {
						base64: ev.target.result,
						file: img
					})
				}
			}
		}
	} else {
		proxy.$notice({
			message: '请上传图片',
			type: 'error'
		})
	}
}
</script>
<style lang="less">
.image-preview-dialog {
	.el-dialog__body {
		height: 50vh;

		.image-container {
			height: 100%;
			background-repeat: repeat;
			background-size: cover;
			background-image: url('../assets/image/bg.jpg');

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}
}

.image-upload {
	padding: 5px 0;
	.el-link {
		margin-left: 10px;
		font-size: 12px;
	}
}
</style>
