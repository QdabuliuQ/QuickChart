import { App, createApp } from 'vue'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ElNotification, ElLoading } from 'element-plus'
import '@/assets/less/elementStyle.less'

// echart
import * as echarts from 'echarts'
import 'echarts-gl' //3D地图插件

// highLight
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// iconfont
import '@/assets/icon/icon.css'

import moment from 'moment'
import Mitt from '@/mitt'

import _App from './App.vue'

const app: App = createApp(_App)
app.config.globalProperties.$notice = ElNotification
app.config.globalProperties.$loading = ElLoading
app.config.globalProperties.$Bus = Mitt
app.config.globalProperties.$echarts = echarts // 全局挂载echarts
app.config.globalProperties.$moment = moment

import login from '@/directives/login'
app.directive('login', login(app))
import lazy from '@/directives/lazy'
app.directive('lazy', lazy)

import { createPinia } from 'pinia'
import router from './router'

app.use(ElementPlus).use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')
