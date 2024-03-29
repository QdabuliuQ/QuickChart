<template>
	<div ref="containerRef" @click.stop>
		<slot></slot>
		<!-- 通过 Teleport 将菜单传送到 body 中  -->
		<Teleport to="body">
			<div
				v-show="showMenu"
				:style="{
					width: props.width + 'px',
					left: x + 'px',
					top: y + 'px',
					background: props.background,
					border: `1px solid ${props.borderColor}`
				}"
				class="context-menu">
				<div class="menu-list">
					<div
						v-for="item in props.menu"
						:key="item.label"
						class="menu-item"
						@click="handleClick(item)">
						<i
							v-if="item.icon"
							:class="['iconfont', item.icon]"
							style="margin-right: 5px; font-size: 14px" />
						{{ item.label }}
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import useContextMenu from '@/hooks/useContextMenu'

const containerRef = ref(null)
const { x, y, showMenu } = useContextMenu(containerRef)

interface IMenu {
	label: string
	icon?: string
}

const props = withDefaults(
	defineProps<{
		menu: Array<IMenu>
		background?: string
		borderColor?: string
		width?: number
	}>(),
	{
		menu: [] as any,
		background: '#fff',
		borderColor: 'transparent',
		width: 150
	}
)
const emits = defineEmits(['select', 'contextmenu'])
const handleClick = (item: any) => {
	emits('select', Object.assign(item, { idx: props.idx }))
}
const contextmenuEvent = (e: any) => {
	const { left, top } = (containerRef.value as HTMLDivElement).getBoundingClientRect()
	const ratio = Number(sessionStorage.getItem('ratio'))
	emits('contextmenu', [(e.clientX - left) / ratio, (e.clientY - top) / ratio])
}
onMounted(() => {
	;(containerRef.value as unknown as HTMLDivElement).addEventListener(
		'contextmenu',
		contextmenuEvent
	)
})

onBeforeUnmount(() => {
	;(containerRef.value as unknown as HTMLDivElement).removeEventListener(
		'contextmenu',
		contextmenuEvent
	)
})
</script>
<style lang="less">
.context-menu {
	position: fixed;
	z-index: 10000;
	padding: 7px 0;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-sizing: border-box;
	box-shadow: 2px 2px 11px 0 rgb(0 0 0 / 30%);

	.menu-item {
		padding: 8px 20px;
		font-size: 13px;
		color: #000;
		transition: 0.2s all linear;
		cursor: pointer;

		&:hover {
			background: rgb(248 181 87 / 20%);
		}
	}
}
</style>
