<template>
	<div v-if="config" class="option-items">
		<seriesItem
			v-for="(item, key) in config"
			:key="key"
			:title="(item.pre ?? '') + (common[key] ? common[key] : item.title) + (item.suf ?? '')">
			<el-switch v-if="item.type == 'switch'" size="small" v-model="item.value" />
			<el-input-number
				v-else-if="item.type == 'input_number'"
				size="small"
				:max="item.max ? item.max : 300"
				:min="item.min ? item.min : 0"
				:step="item.max == 1 ? 0.1 : 1"
				v-model="item.value" />
			<el-color-picker
				size="small"
				v-else-if="item.type == 'color_picker'"
				v-model="item.value"
				show-alpha />
			<el-select
				v-else-if="item.type == 'select'"
				popper-class="params-select-popper-class"
				v-model="item.value"
				placeholder="请选择"
				size="small">
				<el-option
					v-for="prop in item.options"
					:key="prop.value"
					:label="prop.label"
					:value="prop.value" />
			</el-select>
			<el-input
				v-else-if="item.type == 'input_text'"
				:maxlength="item.max ? item.max : 20"
				size="small"
				v-model="item.value" />
			<image-upload
				v-else-if="item.type == 'imgload'"
				@deleteImage="() => (item.value = '')"
				@imageChange="(e: any) => (item.value = e)"
				:value="item.value"
				:imgType="item.imgType ? item.imgType : 'url'"
				:url="item.url"
				:imgSize="item.imgSize ? item.imgSize : 100" />
		</seriesItem>
	</div>
</template>

<script setup lang="ts">
import imageUpload from './imageUpload.vue'
import seriesItem from '@/components/seriesItem.vue'

import { common } from '@/config/chart/opname'

interface PropsInt {
	config: any
}
const { config } = defineProps<PropsInt>()
</script>
<style lang="less">
.option-items {
	.el-color-picker__trigger {
		width: 110px;
	}
}
</style>
