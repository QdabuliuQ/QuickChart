import { ListInt } from './chartItem'

const list: ListInt[] = [
  {
    type: '区域地图',
    icon: 'i_map_2',
    id: 1,
    show: false,
    charts: [
      {
        cover: require('@/assets/image/map1_1.webp'),
        name: '区域地图',
        id: '1_1',
      },
      {
        cover: require('@/assets/image/map1_2.webp'),
        name: '数据地图',
        id: '1_2',
      },
      {
        cover: require('@/assets/image/map1_3.webp'),
        name: '数据地图2',
        id: '1_3',
      },
      {
        cover: require('@/assets/image/map1_4.webp'),
        name: '3D地图',
        id: '1_4',
      },
    ]
  }
]

export default list