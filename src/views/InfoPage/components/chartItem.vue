<template>
	<div class="info-chart-item">
		<div class="loading-box">
			<div @mouseenter="opacity = 1" @mouseleave="opacity = 0" class="box">
				<div
					:style="{
						opacity
					}"
					@click="toModify"
					class="mask">
					<el-popover
						popper-class="chart-item-popover-class"
						placement="bottom-start"
						:hide-after="0"
						trigger="hover">
						<div @mouseenter="opacity = 1" @mouseleave="opacity = 0" class="menu-list">
							<div @click="renameEvent" class="menu-item">
								<i class="iconfont i_rename"></i>
								重命名
							</div>
							<div @click="deleteEvent" class="menu-item">
								<i class="iconfont i_delete_2"></i>
								删除
							</div>
						</div>
						<template #reference>
							<div class="more">
								<i class="iconfont i_more"></i>
							</div>
						</template>
					</el-popover>
					<div class="edit">编辑</div>
				</div>
				<img class="cover" :src="props.cover" />
			</div>
		</div>
		<div v-show="!isSetName" class="name">{{ name }}</div>
		<div v-show="isSetName" class="input">
			<input @blur="blurEvent" v-model="newName" type="text" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import useProxy from '@/hooks/useProxy'

import { ElMessageBox } from 'element-plus'

const props = defineProps<{
	chart_id: string
	cover: string
	name: string
	option: string
	state: string
	time?: number
	type?: string
	user_id: string
	idx?: number
	blur?: (name: string, chart_id: string) => any
}>()
const emits = defineEmits(['deleteItem', 'clickItem'])
const isSetName = ref<boolean>(false)
const newName = ref<string>(props.name)
const name = ref<string>(props.name)
const opacity = ref<number>(0)
let copyName = ''
const proxy = useProxy()

const renameEvent = () => {
	// 开启输入框
	copyName = name.value
	isSetName.value = true
}
const blurEvent = async () => {
	// 失去焦点 关闭输入框
	let _name = newName.value.trim()
	if (_name.length === 0) {
		isSetName.value = false
		newName.value = copyName
		return proxy.$notice({
			type: 'error',
			message: '图表名称不能为空',
			position: 'top-left'
		})
	}
	if (_name.length > 15) {
		isSetName.value = false
		newName.value = copyName
		return proxy.$notice({
			type: 'error',
			message: '图表名称不能超过15个字符',
			position: 'top-left'
		})
	}
	if (_name === name.value) return
	if (typeof props.blur === 'function') {
		props.blur(_name, props.chart_id).then(
			() => {
				isSetName.value = false
				name.value = _name // 修改名称
				copyName = _name
			},
			() => {
				isSetName.value = false
				newName.value = copyName
			}
		)
	}
}

const toModify = () => {
	emits('clickItem', props.chart_id)
	// router.push('/chart/'+props.chart_id)
}

const deleteEvent = () => {
	ElMessageBox.confirm('是否确定删除图表？', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(async () => {
		emits('deleteItem', {
			idx: props.idx,
			id: props.chart_id
		})
	})
}
</script>
<style lang="less">
.chart-item-popover-class {
	width: 100px !important;
	min-width: 100px !important;
	padding: 0 !important;
	.menu-list {
		padding: 12px 0 !important;
		.menu-item {
			display: flex;
			align-items: center;
			padding: 7px 10px;
			font-size: 13px;
			cursor: pointer;
			.iconfont {
				margin-right: 8px;
			}
			&:hover {
				color: @theme;
				background-color: #414141;
			}
		}
	}
}
.info-chart-item {
	width: 100%;
	.box {
		width: 100%;
		position: relative;
		overflow: hidden;
		background-repeat: repeat;
		border-radius: 10px;
		cursor: pointer;
		background-size: 10px 10px;
		background-image: url('../../../assets/image/transparent.png');
	}
	.mask {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 50%);

		.edit {
			position: absolute;
			top: 50%;
			left: 50%;
			padding: 6px 14px 7px;
			font-size: 12px;
			color: #fff;
			background-color: #00000087;
			border-radius: 15px;
			transform: translate(-50%, -50%);
		}
		.more {
			position: absolute;
			top: 5px;
			right: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 3px 4px;
			font-size: 35px;
			color: #000;
			background-color: #fff;
			border-radius: 4px;
			.iconfont {
				font-size: 18px;
			}
		}
	}
	.cover {
		width: 100%;
		height: 125px;
		object-fit: contain;
		vertical-align: middle;
	}
	.name {
		overflow: hidden;
		width: 100%;
		max-width: 140px;
		height: 30px;
		margin: 5px auto 0;
		font-size: 14px;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 30px;
	}
	.input {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		margin-top: 5px;
		line-height: 23px;
		border-bottom: 1px solid #636363;
		input {
			width: 90%;
			font-size: 14px;
			text-align: center;
			border: 0;
			outline: none;
		}
	}
}
</style>
