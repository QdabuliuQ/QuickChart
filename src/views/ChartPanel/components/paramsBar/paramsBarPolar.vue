<template>
	<div class="paramsBarPolar">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import useStore from '@/store'
import optionItems from '@/components/optionItems.vue'
import { debounce, getConfigValue } from '@/utils'
const proxy = useProxy()
const { chart }: any = useStore()

const config = reactive<ConfigInt>({
	innerSize: {
		type: 'input_number',
		title: '内圈大小(%)',
		max: 100,
		value: parseInt(chart.getOption.polar.radius[0])
	},
	outerSize: {
		type: 'input_number',
		title: '外圈大小(%)',
		max: 100,
		value: parseInt(chart.getOption.polar.radius[1])
	}
})

const getData = () => {
	const option = getConfigValue(config)
	const polar = chart.getOption.polar
	polar.radius[0] = option.innerSize + '%'
	polar.radius[1] = option.outerSize + '%'
	return polar
}

watch(
	() => config,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			polar: getData()
		})
	}, 500),
	{
		deep: true
	}
)
</script>
