<template>
	<div class="edit-page">
		<ChartType />
		<div class="right-router-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ChartType from './components/ChartType.vue'

const router = useRouter()
const type = ref<number>(0)
type.value = router.currentRoute.value.meta.typeIndex as number
</script>

<style lang="less">
.edit-page {
	display: flex;
	overflow: hidden;
	height: 100vh;
	max-height: 100vh;
	.right-router-container {
		height: 100%;
		flex: 1;
	}
}
</style>
