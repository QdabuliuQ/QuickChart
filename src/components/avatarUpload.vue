<template>
	<div class="avatarUpload">
		<div @click="upload" v-if="!props.url" class="noAvatar">
			<i class="iconfont i_jia"></i>
		</div>
		<div @click="upload" v-else class="avatarContainer">
			<img :src="props.url" />
		</div>
		<input
			ref="inputRef"
			@change="change"
			style="display: none"
			type="file"
			accept="image/jpeg,image/jpg,image/png" />
	</div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { fileType } from '@/utils'
import useProxy from '@/hooks/useProxy'
import { avatarUpload } from '@/network/info'

const inputRef = ref<HTMLInputElement>()
const proxy = useProxy()
const props = defineProps<{
	url: string
}>()
const emits = defineEmits(['update:url'])

const upload = () => {
	inputRef.value?.click()
}
const change = async () => {
	const file = (inputRef.value?.files as any)[0]
	if (fileType(file.name) !== 'image')
		return proxy.$notice({
			type: 'error',
			message: '图片类型只支持png/jpg/jpeg',
			position: 'top-left'
		})
	let size = file.size / 1024 / 1024
	if (size > 3)
		return proxy.$notice({
			type: 'error',
			message: '图片大小不能超过3M',
			position: 'top-left'
		})
	let formData = new FormData()
	formData.append('avatar', file)
	let data: any = await avatarUpload(formData)
	if (!data.status)
		return proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	proxy.$notice({
		type: 'success',
		message: data.msg,
		position: 'top-left'
	})
	emits('update:url', data.url)
}
</script>
<style lang="less">
.avatarUpload {
	width: 140px;
	height: 140px;
	cursor: pointer;
	.border() {
		overflow: hidden;
		border: 1px dashed #707070;
		border-radius: 8px;
	}
	.avatarContainer {
		width: 100%;
		height: 100%;
		.border();
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.noAvatar {
		.border();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		.i_jia {
			font-size: 40px;
			color: #707070;
		}
		&:hover {
			border: 1px dashed #8c8c8c;
			.i_jia {
				color: #8c8c8c;
			}
		}
	}
}
</style>
