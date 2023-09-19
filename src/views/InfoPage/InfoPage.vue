<template>
  <div class="InfoPage">
    <div class="leftMenu">
      <el-menu
        active-text-color="#ffae34"
        :default-active="active"
      >
        <el-menu-item @click="toggle('detail')" index="detail">
          <i class="iconfont i_login"></i>
          <span>账号管理</span>
        </el-menu-item>
        <el-menu-item @click="toggle('event')" index="event">
          <i class="iconfont i_event"></i>
          <span>我的动态</span>
        </el-menu-item>
        <el-menu-item @click="toggle('chart')" index="chart">
          <i class="iconfont i_chart"></i>
          <span>我的图表</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="rightContainer">
      <el-scrollbar ref="scrollBarRef" :height="height + 'px'">
        <router-view/>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import useProxy from "@/hooks/useProxy";
import {ElScrollbar} from "element-plus";

let height = ref(0)
const proxy = useProxy()
const route = useRoute()
const router = useRouter()
let active = ref('detail')
const scrollBarRef = ref<InstanceType<typeof ElScrollbar>>()

const computedHeight = () => {
  return document.documentElement.clientHeight - (document.querySelector('.header') as HTMLDivElement).offsetHeight - 2 - 60
}

proxy.$Bus.emit(() => {
  height.value = computedHeight()
})

const toggle = (path: string) => {
  router.push('/index/info/' + path)
}
const infoPageScrollToTop = () => {
  scrollBarRef.value && scrollBarRef.value.setScrollTop(0)
}

onMounted(() => {
  height.value = computedHeight()
  active.value = route.path.substring(route.path.lastIndexOf('/') + 1)

  proxy.$Bus.on("infoPageScrollToTop", infoPageScrollToTop)
})

onUnmounted(() => {
  proxy.$Bus.off("infoPageScrollToTop", infoPageScrollToTop)
})
</script>

<style lang="less">
.InfoPage {
  display: flex;
  .leftMenu {
    position: fixed;
    background-color: #353535;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 30px 0;
    margin-top: 30px;
    box-shadow: 0 0 9px 0 #0d0d0d;
    z-index: 1;
    .el-menu {
      width: 180px;
      border-right: 0;
    }
    .el-menu-item {
      padding-left: 40px !important;
      .iconfont {
        font-size: 18px;
        margin-right: 14px;
      }
      &:hover {
        background-color: rgba(255, 174, 52, 0.29);
      }
    }
    .is-active {
      background-color: @theme !important;
      color: #fff;
    }
  }
  .rightContainer {
    flex: 1;
    margin-left: 200px;
    margin-top: 30px;
    background-color: #353535;
    box-sizing: border-box;
    border-radius: 15px;
    .el-scrollbar__view {
      padding: 30px;
    }
    .pageTitle {
      font-weight: bold;
      color: @theme;
      font-size: 17px;
      margin-bottom: 20px;
      position: relative;
      &:not(:first-child) {
        margin-top: 40px;
      }
      &:after {
        position: absolute;
        content: '';
        width: 40px;
        height: 2px;
        background-color: @theme;
        bottom: -5px;
        left: 0;
        border-radius: 2px;
      }
    }
  }
}
</style>