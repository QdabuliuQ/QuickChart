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
    icon: 'i_line_chart',
    id: 1,
    show: false,
    charts: [
      {
        cover: require('@/assets/image/1_1.webp'),
        name: '基础折线图',
        id: '1_1',
      },
      {
        cover: require('@/assets/image/1_2.webp'),
        name: '基础平滑折线图',
        id: '1_2',
      },
      {
        cover: require('@/assets/image/1_3.webp'),
        name: '基础面积图',
        id: '1_3',
      },
      {
        cover: require('@/assets/image/1_4.webp'),
        name: '折线图堆叠',
        id: '1_4',
      },
      {
        cover: require('@/assets/image/1_5.webp'),
        name: '堆叠面积图',
        id: '1_5',
      },
      {
        cover: require('@/assets/image/1_6.webp'),
        name: '阶梯折线图',
        id: '1_6',
      },
      {
        cover: require('@/assets/image/1_7.webp'),
        name: '垂直折线图',
        id: '1_7',
      },
      {
        cover: require('@/assets/image/1_8.webp'),
        name: '双数值轴折线图',
        id: '1_8',
      },
    ]
  },
  {
    type: '柱状图',
    id: 2,
    icon: 'i_bar_chart',
    show: false,
    charts: [
      {
        cover: require('@/assets/image/2_1.webp'),
        name: '带背景色的柱状图',
        id: '2_1',
      },
      {
        cover: require('@/assets/image/2_2.webp'),
        name: '基础柱状图',
        id: '2_2',
      },
      {
        cover: require('@/assets/image/2_3.webp'),
        name: '正负条形图',
        id: '2_3',
      },
      {
        cover: require('@/assets/image/2_4.webp'),
        name: '交错正负轴标签',
        id: '2_4',
      },
      {
        cover: require('@/assets/image/2_5.webp'),
        name: '极坐标柱状图标签1',
        id: '2_5',
      },
      {
        cover: require('@/assets/image/2_6.webp'),
        name: '极坐标柱状图标签2',
        id: '2_6',
      },
      {
        cover: require('@/assets/image/2_7.webp'),
        name: '横向条形图',
        id: '2_7',
      },
      {
        cover: require('@/assets/image/2_8.webp'),
        name: '堆叠条形图',
        id: '2_8',
      },
    ]
  },
  {
    type: '饼图',
    id: 3,
    icon: 'i_pie_chart',
    show: false,
    charts: [
      {
        cover: require('@/assets/image/3_1.webp'),
        name: '基础饼图',
        id: '3_1',
      },
      {
        cover: require('@/assets/image/3_2.webp'),
        name: '圆角环形图',
        id: '3_2',
      },
      {
        cover: require('@/assets/image/3_3.webp'),
        name: '南丁格尔玫瑰图',
        id: '3_3',
      },
      {
        cover: require('@/assets/image/3_4.webp'),
        name: '半环形图',
        id: '3_4',
      },
    ]
  },
  {
    type: '散点图',
    id: 4,
    icon: 'i_point_chart',
    show: false,
    charts: [
      {
        cover: require("@/assets/image/4_1.webp"),
        name: '基础散点图1',
        id: '4_1'
      },
      {
        cover: require("@/assets/image/4_2.webp"),
        name: '打卡气泡图',
        id: '4_2'
      },
      {
        cover: require("@/assets/image/4_3.webp"),
        name: '打卡气泡图(极坐标)',
        id: '4_3'
      },
      {
        cover: require("@/assets/image/4_4.webp"),
        name: '基础散点图2',
        id: '4_4'
      },
      {
        cover: require("@/assets/image/4_5.webp"),
        name: '基础散点图3',
        id: '4_5'
      },
    ]
  },
  {
    type: 'K线图',
    id: 5,
    icon: 'i_kline_chart',
    show: false,
    charts: [
      {
        cover: require("@/assets/image/5_1.webp"),
        name: '基础K线图',
        id: '5_1'
      },
    ]
  },
  {
    type: '雷达图',
    id: 6,
    icon: 'i_radar_chart',
    show: false,
    charts: [
      {
        cover: require("@/assets/image/6_1.webp"),
        name: '基础雷达图',
        id: '6_1'
      },
    ]
  },
  {
    type: '桑基图',
    id: 7,
    icon: 'i_sankey_chart',
    show: false,
    charts: [
      {
        cover: require("@/assets/image/7_1.webp"),
        name: '基础桑基图',
        id: '7_1'
      },
      {
        cover: require("@/assets/image/7_2.webp"),
        name: '基础桑基图2',
        id: '7_2'
      },
    ]
  },
  {
    type: '漏斗图',
    id: 8,
    icon: 'i_funnel_chart',
    show: false,
    charts: [
      {
        cover: require("@/assets/image/7_1.webp"),
        name: '基础漏斗图',
        id: '8_1'
      },
    ]
  },
]

export default list