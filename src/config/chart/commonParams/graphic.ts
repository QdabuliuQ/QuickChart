import { Common } from '../interface'
import { chartPath } from '@/config/chart/constant'

const graphicOption = (): Common => {
	return {
		name: '图形组件',
		opName: 'graphic',
		chartOption: true,
		menuOption: true,
		icon: 'i_component',
		componentPath: chartPath + 'paramsGraphic',
		defaultOption: {
			graphic: []
		}
	}
}

export default graphicOption
