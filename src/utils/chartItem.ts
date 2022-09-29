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
        cover: require('@/assets/image/1_1.jpg'),
        name: '基础折线图',
        id: '1_1',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_2',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_3',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_4',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_5',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_6',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_7',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_8',
      },
    ]
  },
  {
    type: '线形图',
    id: 2,
    show: false,
    charts: [
      {
        cover: require('@/assets/image/1_1.jpg'),
        name: '基础折线图',
        id: '1_1',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_2',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_3',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_4',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_5',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_6',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_7',
      },
      {
        cover: require('@/assets/image/1_2.jpg'),
        name: '折线图',
        id: '1_8',
      },
    ]
  },
]

export default list