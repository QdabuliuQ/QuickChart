import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const EditPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/EditPage/EditPage.vue')
const ChartPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPage/ChartPage.vue')
const ChartPanel = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPanel/ChartPanel.vue')
const MapPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/MapPage/MapPage.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/EditPage' },
  {
    path: '/EditPage',
    name: 'EditPage',
    component: EditPage,
    children: [
      {
        path: '/ChartPage',
        name: 'ChartPage',
        meta: {
          typeIndex: 0
        },
        component: ChartPage,
        children: [
          {
            path: '/Chart',
            name: 'Chart',
            component: ChartPanel
          }
        ]
      },
      {
        path: '/MapPage',
        name: 'MapPage',
        meta: {
          typeIndex: 1
        },
        component: MapPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
