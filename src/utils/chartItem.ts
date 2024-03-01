import img1_1 from '@/assets/image/1_1.webp'
import img1_2 from '@/assets/image/1_2.webp'
import img1_3 from '@/assets/image/1_3.webp'
import img1_4 from '@/assets/image/1_4.webp'
import img1_5 from '@/assets/image/1_5.webp'
import img1_6 from '@/assets/image/1_6.webp'
import img1_7 from '@/assets/image/1_7.webp'
import img1_8 from '@/assets/image/1_8.webp'

import img2_1 from '@/assets/image/2_1.webp'
import img2_2 from '@/assets/image/2_2.webp'
import img2_3 from '@/assets/image/2_3.webp'
import img2_4 from '@/assets/image/2_4.webp'
import img2_5 from '@/assets/image/2_5.webp'
import img2_6 from '@/assets/image/2_6.webp'
import img2_7 from '@/assets/image/2_7.webp'
import img2_8 from '@/assets/image/2_8.webp'

import img3_1 from '@/assets/image/3_1.webp'
import img3_2 from '@/assets/image/3_2.webp'
import img3_3 from '@/assets/image/3_3.webp'
import img3_4 from '@/assets/image/3_4.webp'

import img4_1 from '@/assets/image/4_1.webp'
import img4_2 from '@/assets/image/4_2.webp'
import img4_3 from '@/assets/image/4_3.webp'
import img4_4 from '@/assets/image/4_4.webp'
import img4_5 from '@/assets/image/4_5.webp'

import img5_1 from '@/assets/image/5_1.webp'

import img6_1 from '@/assets/image/6_1.webp'

import img7_1 from '@/assets/image/7_1.webp'
import img7_2 from '@/assets/image/7_2.webp'

import img8_1 from '@/assets/image/8_1.webp'

import img9_1 from '@/assets/image/9_1.webp'
import img9_2 from '@/assets/image/9_2.webp'
import img9_3 from '@/assets/image/9_3.webp'

import img10_1 from '@/assets/image/10_1.webp'
import img10_2 from '@/assets/image/10_2.webp'

export interface ListInt {
	type: string
	id: number
	icon: string
	show: boolean
	charts: {
		cover: string
		name: string
		id: string
	}[]
}

const list: ListInt[] = [
	{
		type: '线形图',
		icon: 'i_line',
		id: 1,
		show: false,
		charts: [
			{
				cover: img1_1,
				name: '基础折线图',
				id: '1_1'
			},
			{
				cover: img1_2,
				name: '基础平滑折线图',
				id: '1_2'
			},
			{
				cover: img1_3,
				name: '基础面积图',
				id: '1_3'
			},
			{
				cover: img1_4,
				name: '折线图堆叠',
				id: '1_4'
			},
			{
				cover: img1_5,
				name: '堆叠面积图',
				id: '1_5'
			},
			{
				cover: img1_6,
				name: '阶梯折线图',
				id: '1_6'
			},
			{
				cover: img1_7,
				name: '垂直折线图',
				id: '1_7'
			},
			{
				cover: img1_8,
				name: '双数值轴折线图',
				id: '1_8'
			}
		]
	},
	{
		type: '柱状图',
		id: 2,
		icon: 'i_bar',
		show: false,
		charts: [
			{
				cover: img2_1,
				name: '带背景色的柱状图',
				id: '2_1'
			},
			{
				cover: img2_2,
				name: '基础柱状图',
				id: '2_2'
			},
			{
				cover: img2_3,
				name: '正负条形图',
				id: '2_3'
			},
			{
				cover: img2_4,
				name: '交错正负轴标签',
				id: '2_4'
			},
			{
				cover: img2_5,
				name: '极坐标柱状图标签1',
				id: '2_5'
			},
			{
				cover: img2_6,
				name: '极坐标柱状图标签2',
				id: '2_6'
			},
			{
				cover: img2_7,
				name: '横向条形图',
				id: '2_7'
			},
			{
				cover: img2_8,
				name: '堆叠条形图',
				id: '2_8'
			}
		]
	},
	{
		type: '饼图',
		id: 3,
		icon: 'i_pie',
		show: false,
		charts: [
			{
				cover: img3_1,
				name: '基础饼图',
				id: '3_1'
			},
			{
				cover: img3_2,
				name: '圆角环形图',
				id: '3_2'
			},
			{
				cover: img3_3,
				name: '南丁格尔玫瑰图',
				id: '3_3'
			},
			{
				cover: img3_4,
				name: '半环形图',
				id: '3_4'
			}
		]
	},
	{
		type: '散点图',
		id: 4,
		icon: 'i_point',
		show: false,
		charts: [
			{
				cover: img4_1,
				name: '基础散点图1',
				id: '4_1'
			},
			{
				cover: img4_2,
				name: '打卡气泡图',
				id: '4_2'
			},
			{
				cover: img4_3,
				name: '打卡气泡图(极坐标)',
				id: '4_3'
			},
			{
				cover: img4_4,
				name: '基础散点图2',
				id: '4_4'
			},
			{
				cover: img4_5,
				name: '基础散点图3',
				id: '4_5'
			}
		]
	},
	{
		type: 'K线图',
		id: 5,
		icon: 'i_kline',
		show: false,
		charts: [
			{
				cover: img5_1,
				name: '基础K线图',
				id: '5_1'
			}
		]
	},
	{
		type: '雷达图',
		id: 6,
		icon: 'i_radar',
		show: false,
		charts: [
			{
				cover: img6_1,
				name: '基础雷达图',
				id: '6_1'
			}
		]
	},
	{
		type: '桑基图',
		id: 7,
		icon: 'i_sankey',
		show: false,
		charts: [
			{
				cover: img7_1,
				name: '基础桑基图',
				id: '7_1'
			},
			{
				cover: img7_2,
				name: '基础桑基图2',
				id: '7_2'
			}
		]
	},
	{
		type: '漏斗图',
		id: 8,
		icon: 'i_funnel',
		show: false,
		charts: [
			{
				cover: img8_1,
				name: '基础漏斗图',
				id: '8_1'
			}
		]
	},
	{
		type: '仪表盘',
		id: 9,
		icon: 'i_gauge_chart',
		show: false,
		charts: [
			{
				cover: img9_1,
				name: '基础仪表盘',
				id: '9_1'
			},
			{
				cover: img9_2,
				name: '速度仪表盘',
				id: '9_2'
			},
			{
				cover: img9_3,
				name: '速度仪表盘2',
				id: '9_3'
			}
		]
	},
	{
		type: '旭日图',
		id: 10,
		icon: 'i_sunburst',
		show: false,
		charts: [
			{
				cover: img10_1,
				name: '基础旭日图',
				id: '10_1'
			},
			{
				cover: img10_2,
				name: '颜色层次旭日图',
				id: '10_2'
			}
		]
	}
]

export default list
