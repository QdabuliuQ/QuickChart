import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入pinia
import { createPinia } from 'pinia'

// 引入组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/less/elementStyle.less'
import { ElNotification } from 'element-plus'

// echart图表库
import * as echarts from 'echarts'

// 代码高亮
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// animate动画
import 'animate.css/animate.min.css' 
// 字体图标
import "@/assets/icon/icon.css"

//挂载事务总线
import mitt from 'mitt'

const app = createApp(App)
app.config.globalProperties.$notice = ElNotification;

const Mit = mitt();
app.config.globalProperties.$Bus = Mit;
app.config.globalProperties.$echarts = echarts // 全局挂载echarts

app.use(ElementPlus).use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')
