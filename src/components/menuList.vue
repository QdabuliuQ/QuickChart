<template>
  <div class="menuList">
    <div @click="() => {
              item.event ? item.event() : router.push(item.path as string)
              visible = false
            }" v-for="item in menuItems" :key="item.text" class="myMenuItem">
      <i :class="[item.icon,'iconfont']"></i>
      {{ item.text }}
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
let visible = ref(false)
interface menuItemInt {
  icon: string
  text: string
  path?: string
  event?: Function
}

const exitAccount = () => {
  localStorage.removeItem('info')
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  window.location.href = `/`
}

const menuItems = reactive<menuItemInt[]>([
  {
    icon: 'i_login',
    text: '账号管理',
    path: '/index/info/detail'
  },
  {
    icon: 'i_event',
    text: '我的动态',
    path: '/index/info/event'
  },
  {
    icon: 'i_chart',
    text: '我的图表',
    path: '/index/info/chart'
  },
  {
    icon: 'i_exit',
    text: '退出',
    event: exitAccount
  }
])

</script>
<style lang="less">
.menuPopoverClass {
  padding: 0 !important;
  width: auto !important;
  min-width: 0 !important;
  .menuList {
    padding: 10px 0;
    .myMenuItem {
      padding: 0 20px 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      letter-spacing: 1px;
      i {
        font-size: 19px;
        margin-right: 8px;
      }
      &:hover {
        color: @theme !important;
        background-color: #444444;
      }
    }
  }
}

</style>