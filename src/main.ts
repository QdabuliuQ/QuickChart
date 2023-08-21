import {createApp, DirectiveBinding} from 'vue'
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
import "echarts-gl" //3D地图插件
// 代码高亮
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// animate动画
import 'animate.css/animate.min.css' 
// 字体图标
import "@/assets/icon/icon.css"
import moment from 'moment'
import Mitt from "@/mitt";

const app = createApp(App)
app.config.globalProperties.$notice = ElNotification;

app.config.globalProperties.$Bus = Mitt;
app.config.globalProperties.$echarts = echarts // 全局挂载echarts
app.config.globalProperties.$moment = moment

const verifyLogin = (binding: DirectiveBinding) => {
  if(!localStorage.getItem('info') || !localStorage.getItem('token')){  // 判断是否登录
    app.config.globalProperties.$Bus.emit('showLoginDialog')
  } else {  // 没有登录
    console.log('执行了')
    binding.value();  // 向下执行
  }
}
let verifyFun: Function;
app.directive('login',{
  // vue2中对应bind
  mounted:(el,binding) => {
    verifyFun = verifyLogin.bind(null,binding);
    el.addEventListener('click',verifyFun)
  },
  // vue2中对应unbind
  unmounted:(el,binding) => {
    el.removeEventListener('click',verifyFun)
  }
})

app.use(ElementPlus).use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')
