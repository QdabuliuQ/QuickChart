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
import { ElNotification, ElLoading } from 'element-plus'
// echart图表库
import * as echarts from 'echarts'
import "echarts-gl" //3D地图插件
// 代码高亮
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// 字体图标
import "@/assets/icon/icon.css"
import moment from 'moment'
import Mitt from "@/mitt";
import Worker from "worker-loader!@/workers/worker";

const app = createApp(App)
app.config.globalProperties.$notice = ElNotification;
app.config.globalProperties.$loading = ElLoading
app.config.globalProperties.$Bus = Mitt;
app.config.globalProperties.$echarts = echarts // 全局挂载echarts
app.config.globalProperties.$moment = moment
app.config.globalProperties.$worker = new Worker()

const verifyLogin = (binding: DirectiveBinding) => {
  // 没有登录
  if(!localStorage.getItem('info') || !localStorage.getItem('token')){  // 判断是否登录
    app.config.globalProperties.$Bus.emit('showLoginDialog')  // 弹出登录窗口
  } else {
    binding.value();  // 调用回调函数
  }
}
let verifyFun: Function;
app.directive('login',{
  // vue2中对应bind
  mounted:(el,binding) => {
    verifyFun = verifyLogin.bind(null,binding);
    el.addEventListener('click',verifyFun)  // 给元素添加点击事件
  },
  // 卸载回调
  unmounted:(el,binding) => {
    el.removeEventListener('click',verifyFun)  // 移除事件
  }
})

app.directive('lazy', {
  mounted: (el, binding: any) => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if(isIntersecting) {
        observer.unobserve(el)
        // 表示绑定的 dom 进入可视区域
        el.src = binding.value
      }
    }, {
      threshold: 0
    })
    // 监视 dom
    observer.observe(el)
  }
})

app.use(ElementPlus).use(hljsVuePlugin).use(createPinia()).use(router).mount('#app')
