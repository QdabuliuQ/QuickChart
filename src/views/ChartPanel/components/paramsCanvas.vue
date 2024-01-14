<template>
	<div class="paramsCanvas">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { watch, reactive, onUnmounted } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { common } from '@/config/chart/opname'
import useStore from '@/store'
import optionItems from '@/components/optionItems.vue'
import { createImage, debounce, getConfigValue } from '@/utils'
import { IOption, TOption } from '@/types/option'
import { oss } from '@/network'
import useWatchData from '@/hooks/useWatchData'
const { chart }: any = useStore()
const proxy = useProxy()

interface IConfig {
	backgroundColor: IOption<'color_picker'>
	bgImage: IOption<'imgload'>
}
const config = reactive<IConfig>({
	backgroundColor: {
		type: 'color_picker',
		title: common.backgroundColor,
		value:
			typeof chart.getOption.backgroundColor === 'object' ? '' : chart.getOption.backgroundColor
	},
	bgImage: {
		type: 'imgload',
		imgType: 'url',
		title: '背景图片',
		value:
			typeof chart.getOption.backgroundColor === 'object'
				? chart.getOption.backgroundColor.image
				: '',
		url: `${oss}/upload/chartImage`
	}
})

const getData = () => {
	const option = getConfigValue(config)
	if (option.bgImage) {
		return {
			image: option.bgImage,
			repeat: 'repeat'
		}
	} else {
		return option.backgroundColor
	}
}

useWatchData(config, 'backgroundColor', getData)
</script>

<style lang="less">
.paramsCanvas {
	.el-button--small {
		span {
			zoom: 0.95;
		}
	}

	.image {
		cursor: pointer;
		margin-top: 5px;
	}
	.image-upload {
		padding: 0;
	}
}
</style>
