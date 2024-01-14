import { Common } from '../interface'
import { replaceOptionValue } from '@/config/chart/tools'
import { chartPath } from '@/config/chart/constant'

const title: Common = {
	name: '标题样式',
	opName: 'title',
	chartOption: true,
	menuOption: true,
	icon: 'i_title',
	componentPath: chartPath + 'paramsTitle',
	defaultOption: {
		title: null
	}
}

const titleOption = (options?: any): Common => {
	const dOption = {
		text: '',
		show: true,
		textAlign: 'left',
		left: '2%',
		top: '2%',
		backgroundColor: 'rgba(0,0,0,0)',
		textStyle: {
			color: '#333',
			fontWeight: 'bolder',
			fontSize: 18
		}
	}
	replaceOptionValue(dOption, options)
	title.defaultOption.title = dOption
	return title
}

export default titleOption
