<template>
	<div class="ChartPage">
		<chart-menu :click-event="clickEvent" :itemlist="list" />
		<div class="chart-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import chartMenu from '@/components/chartMenu.vue'
import { useRouter } from 'vue-router'
import list from '@/utils/chartItem'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const clickEvent = (id: string) => {
	let curId = router.currentRoute.value.params.id
	if (curId != id && router.currentRoute.value.name == 'type') {
		ElMessageBox.confirm('单图中插入新图表将会替换原图表及数据', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			router.push('/edit/chart/type/' + id)
		})
	} else if (curId != id) {
		router.push('/edit/chart/type/' + id)
	}
}
</script>

<style lang="less">
.ChartPage {
	display: flex;
	height: 100%;
	.chart-container {
		flex: 1;
	}
}
</style>
