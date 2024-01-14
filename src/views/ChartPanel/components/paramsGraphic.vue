<template>
	<div class="params-graphic">
		<div class="manage-graphic" @click="drawer = true">
			<i class="iconfont i_manage"></i>
			管理图形组件
		</div>
		<el-drawer
			v-model="drawer"
			:size="'35%'"
			title="管理图形组件"
			custom-class="graphic-manage-drawer-class"
			:direction="'rtl'"
			:before-close="handleClose"
			@open="drawerOpen">
			<GraphicComItem
				@delete-item="deleteItem"
				@toggle-item="toggleItem"
				@add-item="addItem"
				:components="config" />
			<OptionItems v-if="config.length" :config="config[activeIdx]" />
			<el-empty v-else description="暂无内容信息" />
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { common, label } from '@/config/chart/opname'
import useStore from '@/store'
import { ElMessageBox } from 'element-plus'
import { IOption, TOption } from '@/types/option'
import { oss } from '@/network'
import OptionItems from '@/components/optionItems.vue'
import GraphicComItem from '@/components/graphicComItem.vue'

const proxy = useProxy()
const { chart }: any = useStore()
const drawer = ref<boolean>(false)
let config = reactive<
	{
		[propName: string]: IOption<TOption>
	}[]
>([])
const activeIdx = ref<number>(0)

const drawerOpen = () => {
	getConfigs(chart.getOption.graphic)
}
const handleClose = (done: () => void) => {
	ElMessageBox.confirm('是否保存当前的图形组件？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消'
	})
		.then(() => {
			let g = conveyConfigToOption(config)
			proxy.$Bus.emit('optionChange', {
				graphic: g
			})
			done()
		})
		.catch(() => {
			done()
		})
}
const conveyConfigToOption = (config: ConfigInt[]): any[] => {
	let options: any[] = []
	for (let item of config) {
		let option: any = {}
		for (let key in item) {
			if (item[key].hasOwnProperty('attr')) {
				let attrs: string[] = (item[key]['attr'] as string).split('.')
				let p = option
				for (let prop of attrs) {
					if (!p[prop]) {
						p[prop] = {}
					}
					p = p[prop]
				}
				if (key == 'left' || key == 'top') {
					p[key] = item[key]['value'] + '%'
				} else {
					p[key] = item[key]['value']
				}
			} else {
				if (key == 'left' || key == 'top') {
					option[key] = item[key]['value'] + '%'
				} else {
					option[key] = item[key]['value']
				}
			}
		}
		options.push(option)
	}
	return options
}

// 删除内容
const deleteItem = (idx: number) => {
	config.splice(idx, 1)
}
// 添加内容
const addItem = (type: string) => {
	config.push(getDefaultConfig(type) as ConfigInt)
}
// 切换内容
const toggleItem = (idx: number) => {
	activeIdx.value = idx
}
const getConfigs = (options: any[]) => {
	config.length = 0
	for (let item of options) {
		if (item.type == 'text') {
			config.push({
				type: {
					type: null,
					value: item.type
				},
				text: {
					type: 'input_text',
					title: '文本内容',
					value: item.style.text,
					attr: 'style'
				},
				left: {
					type: 'input_number',
					title: common.left + '(%)',
					max: 100,
					value: parseInt(item.left)
				},
				top: {
					type: 'input_number',
					title: common.top + '(%)',
					max: 100,
					value: parseInt(item.top)
				},
				fill: {
					type: 'color_picker',
					title: common.color,
					value: item.style.fill,
					attr: 'style'
				},
				fontSize: {
					type: 'input_number',
					title: label.fontSize,
					value: item.style.fontSize,
					attr: 'style'
				},
				rotation: {
					type: 'input_number',
					title: label.rotate,
					max: 360,
					min: -360,
					value: item.rotation
				}
			})
		} else if (item.type == 'image') {
			config.push({
				type: {
					type: null,
					value: item.type
				},
				image: {
					type: 'imgload',
					title: '图片上传',
					value: item.style.image,
					attr: 'style',
					imgType: 'url',
					url: `${oss}/upload/graphic`
				},
				left: {
					type: 'input_number',
					title: common.left + '(%)',
					max: 100,
					value: parseInt(item.left)
				},
				top: {
					type: 'input_number',
					title: common.top + '(%)',
					max: 100,
					value: parseInt(item.top)
				},
				width: {
					type: 'input_number',
					title: common.width,
					max: 3000,
					value: item.style.width,
					attr: 'style'
				},
				height: {
					type: 'input_number',
					title: common.height,
					max: 3000,
					value: item.style.height,
					attr: 'style'
				},
				rotation: {
					type: 'input_number',
					title: label.rotate,
					max: 360,
					min: -360,
					value: item.rotation
				}
			})
		}
	}
}

const getDefaultConfig = (
	type: string
): {
	[propName: string]: IOption<TOption>
} => {
	switch (type) {
		case 'text':
			return {
				type: {
					type: null,
					value: 'text'
				},
				text: {
					type: 'input_text',
					title: '文本内容',
					value: '',
					attr: 'style'
				},
				left: {
					type: 'input_number',
					title: common.left + '(%)',
					value: 0
				},
				top: {
					type: 'input_number',
					title: common.top + '(%)',
					value: 0
				},
				fill: {
					type: 'color_picker',
					title: common.color,
					value: null,
					attr: 'style'
				},
				fontSize: {
					type: 'input_number',
					title: label.fontSize,
					value: 24,
					attr: 'style'
				},
				rotation: {
					type: 'input_number',
					title: label.rotate,
					max: 360,
					min: -360,
					value: 0
				}
			}
		case 'image':
			return {
				type: {
					type: null,
					value: 'image'
				},
				image: {
					type: 'imgload',
					title: '图片上传',
					value: '',
					attr: 'style',
					imgType: 'url',
					url: `${oss}/upload/graphic`
				},
				left: {
					type: 'input_number',
					title: common.left + '(%)',
					value: 0
				},
				top: {
					type: 'input_number',
					title: common.top + '(%)',
					value: 0
				},
				width: {
					type: 'input_number',
					title: common.width,
					max: 3000,
					value: 0,
					attr: 'style'
				},
				height: {
					type: 'input_number',
					title: common.height,
					max: 3000,
					value: 0,
					attr: 'style'
				},
				rotation: {
					type: 'input_number',
					title: label.rotate,
					max: 360,
					min: -360,
					value: 0
				}
			}
		default:
			return {}
	}
}
</script>

<style lang="less">
.graphic-manage-drawer-class {
	.el-drawer__header {
		margin-bottom: 20px;
	}
}
.params-graphic {
	.manage-graphic {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px 20px;
		margin: 10px;
		font-size: 12px;
		color: #fff;
		background-color: transparent;
		border: 1px solid #777676;
		border-radius: 20px;
		cursor: pointer;
		box-sizing: border-box;
		letter-spacing: 2px;
		i {
			margin-right: 8px;
			font-size: 12px;
		}
		&:hover {
			background-color: #4f4f4f;
		}
	}
}
</style>
