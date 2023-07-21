import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
const IndexPage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/IndexPage/IndexPage.vue')
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/HomePage/HomePage.vue')
const Document = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/Document/Document.vue')
const EditPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/EditPage/EditPage.vue')
const Welcome = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/Welcome/Welcome.vue')
const ChartPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPage/ChartPage.vue')
const ChartPanel = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPanel/ChartPanel.vue')
const MapPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/MapPage/MapPage.vue')
const InfoPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/InfoPage/InfoPage.vue')
const DetailPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/InfoPage/DetailPage.vue')
const _ChartPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/InfoPage/ChartPage.vue')
const ModifyPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/ModifyPage/modifyPage.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: IndexPage,
    children: [
      {
        path: '/index',
        redirect: '/index/home'
      },
      {
        path: 'home',
        name: 'home',
        component: HomePage
      },
      {
        path: 'document',
        name: 'document',
        component: Document
      },
      {
        path: 'info',
        name: 'info',
        component: InfoPage,
        children: [
          {
            path: '/index/info',
            redirect: '/index/info/detail'
          },
          {
            path: 'chart',
            name: '_chart',
            component: _ChartPage
          },
          {
            path: 'detail',
            name: 'detail',
            component: DetailPage
          },
        ]
      }
    ]
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditPage,
    children: [
      {
        path: '/edit',
        redirect: '/edit/welcome'
      },
      {
        path: 'welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: 'chart',
        name: 'ChartPage',
        meta: {
          typeIndex: 0
        },
        component: ChartPage,
        children: [
          {
            path: 'type/:id',
            name: 'type',
            component: ChartPanel
          }
        ]
      },
      {
        path: 'map',
        name: 'MapPage',
        meta: {
          typeIndex: 1
        },
        component: MapPage
      },
    ]
  },
  {
    path: '/modify/:id',
    name: 'modify',
    component: ModifyPage
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
