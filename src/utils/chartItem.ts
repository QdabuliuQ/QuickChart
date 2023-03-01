export interface ListInt {
  type: string
  id: number
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
        name: '定义单个柱子颜色',
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
      {
        cover: require('@/assets/image/2_9.webp'),
        name: '柱状图排序',
        id: '2_9',
      },
      {
        cover: require('@/assets/image/2_10.webp'),
        name: '动态排序柱状图',
        id: '2_10',
      },
    ]
  },
  {
    type: '饼图',
    id: 3,
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
    ]
  },
]

export default list