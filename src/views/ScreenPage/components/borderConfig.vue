<template>
	<div class="border-config">
		<config-cover icon="i_border" />
		<config-title title="边框参数" />
		<common-config :info="baseInfo" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import CommonConfig from '@/views/ScreenPage/components/commonConfig.vue'
import ConfigCover from '@/views/ScreenPage/components/configCover.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'

import useStore from '@/store'

import { ElementTypeProperties } from '@/types/screen.ts'

const { screen } = useStore()
const baseInfo = ref(
	screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'text'>
)
</script>
<style lang="less"></style>
