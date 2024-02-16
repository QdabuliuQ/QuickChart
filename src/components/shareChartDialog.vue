<template>
	<el-dialog v-model="visible" title="分享图表" width="30%" @close="closeEvent">
		<el-input
			v-model="content"
			maxlength="300"
			placeholder="说点什么吧~~~"
			show-word-limit
			type="textarea"
			:rows="6"
			:resize="'none'" />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="cancelEvent">取消</el-button>
				<el-button type="primary" @click="shareEvent">提交</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

const emits = defineEmits(['shareEvent', 'update:visible'])
const props = withDefaults(
	defineProps<{
		visible: boolean
	}>(),
	{
		visible: false
	}
)
const proxy = useProxy()
const visible = ref<boolean>(props.visible)
const content = ref<string>('')

const shareEvent = () => {
	let _content = content.value.trim()
	if (_content.length === 0 || _content.length > 300)
		return proxy.$notice({
			type: 'error',
			message: '输入内容有误',
			position: 'top-left'
		})
	emits('shareEvent', _content)
}

const cancelEvent = () => {
	visible.value = false
}
const closeEvent = () => {
	content.value = ''
	emits('update:visible', false)
}

const stop = watch(
	() => props.visible,
	(val: boolean) => {
		visible.value = val
	}
)

onUnmounted(() => {
	stop() // 取消监听
})
</script>
