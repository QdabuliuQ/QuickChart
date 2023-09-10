import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
const IndexPage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/IndexPage/IndexPage.vue')
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ '@/views/HomePage/HomePage.vue')
const EditPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/EditPage/EditPage.vue')
const Welcome = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/Welcome/Welcome.vue')
const ChartPage = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPage/ChartPage.vue')
const ChartPanel = () => import(/* webpackChunkName:"EditPageChunk" */ '@/views/ChartPanel/ChartPanel.vue')
const MapPage = () => import(/* webpackChunkName:"MapChunk" */ '@/views/MapPage/MapPage.vue')
const InfoPage = () => import(/* webpackChunkName:"InfoChunk" */ '@/views/InfoPage/InfoPage.vue')
const DetailPage = () => import(/* webpackChunkName:"InfoChunk" */ '@/views/InfoPage/DetailPage.vue')
const _ChartPage = () => import(/* webpackChunkName:"InfoChunk" */ '@/views/InfoPage/ChartPage.vue')
const Modify_ChartPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/ModifyPage/ChartPage.vue')
const Modify_MapPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/ModifyPage/MapPage.vue')
const CommunityPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/CommunityPage/CommunityPage.vue')
const EventPage = () => import(/* webpackChunkName:"LoginPageChunk" */ '@/views/InfoPage/EventPage.vue')
const MapPanel = () => import(/* webpackChunkName:"MapChunk" */ '@/views/MapPanel/MapPanel.vue')


const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: IndexPage,
    children: [
      { path: "/index", redirect: "/index/home" },
      { path: "home", name: "home", component: HomePage },
      { path: "community", name: "community", component: CommunityPage },
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
            path: 'event',
            name: 'event',
            component: EventPage,
          },
          {
            path: 'detail',
            name: 'detail',
            component: DetailPage
          },
        ]
      },
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
        component: MapPage,
        children: [
          {
            path: 'type/:id/:adcode',
            name: 'mapType',
            component: MapPanel
          }
        ]
      },
    ]
  },
  {
    path: '/chart/:id',
    name: 'modifyChart',
    component: Modify_ChartPage
  },
  {
    path: '/map/:id',
    name: 'modifyMap',
    component: Modify_MapPage
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
