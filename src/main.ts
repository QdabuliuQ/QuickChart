import { App, createApp } from 'vue'
// echart
import * as echarts from 'echarts'

import _App from './App.vue'

// iconfont
import '@/assets/icon/icon.css'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// highLight
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import Mitt from '@/mitt'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// ElementPlus
import ElementPlus from 'element-plus'
import { ElLoading, ElNotification } from 'element-plus'
import moment from 'moment'

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

import router from './router'
import { createPinia } from 'pinia'

app.use(ElementPlus).use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')

// app.use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')
