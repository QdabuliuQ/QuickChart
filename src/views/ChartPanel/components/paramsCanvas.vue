<template>
	<div class="paramsCanvas">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import optionItems from '@/components/optionItems.vue'

import { common } from '@/config/chart/opname'

import useWatchData from '@/hooks/useWatchData'

import useStore from '@/store'

import { getConfigValue } from '@/utils'

import { oss } from '@/network'
import { IOption } from '@/types/option'
const { chart }: any = useStore()
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
