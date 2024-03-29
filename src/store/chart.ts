import { defineStore } from 'pinia'

const useChartStore = defineStore('chart', {
	state: () => {
		return {
			tmp_option: null,
			option: null,
			chartConfig: null,
			defaultOption: null, // 默认配置
			mapJSON: null, // 地图JSON
			type: ''
		}
	},
	getters: {
		getTemOption(state: any) {
			return state.tmp_option
		},
		getOption(state: any) {
			return state.option
		},
		getChartConfig(state: any) {
			return state.chartConfig
		},
		getDefaultOption(state: any) {
			return state.defaultOption
		},
		getMapJson(state: any) {
			return state.mapJSON
		},
		getType(state: any) {
			return state.type
		}
	},

	actions: {
		setOption(option: any) {
			this.option = option
		},
		setChartConfig(config: any) {
			this.chartConfig = config
		},
		setDefaultOption(option: any) {
			this.defaultOption = option
		},
		setType(type: 'chart' | 'map') {
			this.type = type
		},
		setMapJSON(json: any) {
			this.mapJSON = json
		}
	}
})

export default useChartStore
