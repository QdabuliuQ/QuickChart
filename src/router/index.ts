import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const IndexPage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/IndexPage/IndexPage.vue')
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/HomePage/HomePage.vue')
const Document = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/Document/Document.vue')
const EditPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/EditPage/EditPage.vue')
const Welcome = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/Welcome/Welcome.vue')
const ChartPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPage/ChartPage.vue')
const ChartPanel = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPanel/ChartPanel.vue')
const MapPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/MapPage/MapPage.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/HomePage' },
  {
    path: '/IndexPage',
    name: 'IndexPage',
    component: IndexPage,
    children: [
      {
        path: '/IndexPage',
        redirect: '/HomePage'
      },
      {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: '/Document',
        name: 'Document',
        component: Document
      },
    ]
  },
  {
    path: '/EditPage',
    name: 'EditPage',
    component: EditPage,
    children: [
      {
        path: '/EditPage',
        redirect: '/Welcome'
      },
      {
        path: '/Welcome',
        name: 'Welcome',
        component: Welcome
      },
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
