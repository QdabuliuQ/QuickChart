<template>
  <div class="ChartType">
    <div class="types">
      <div @click="toggle('/ChartPage', 0)" :class="[type == 0 ? 'active': '', 'typeItem']">
        <i style="font-size: 20px" class="iconfont i_bar"></i>
        <span>图表</span>
      </div>
      <div @click="toggle('/MapPage', 1)" :class="[type == 1 ? 'active': '', 'typeItem']">
        <i class="iconfont i_map"></i>
        <span>地图</span>
      </div>
    </div>
    <div class="menu">
      <el-popover
        v-if="JSON.stringify(info) !== '{}'"
        popper-class="menuPopoverClass"
        placement="right-end"
        :hide-after="50"
      >
        <template #reference>
          <div class="menu_item">
            <img :src="info.user_pic" />
          </div>
        </template>
        <menu-list />
      </el-popover>
      <div v-else class="menu_item">
        <i @click="toLogin" class="iconfont i_login"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref
} from 'vue'
import {useRouter} from "vue-router";
import useProxy from "@/hooks/useProxy";
import {useLogin} from "@/hooks/useLogin";
import {useCheckState} from "@/hooks/useCheckState";
import {getInfo} from "@/utils";
import menuList from "@/components/menuList.vue";

const proxy = useProxy()
const router = useRouter()
const type = ref<number>(0)

const toggle = (e: string, t: number) => {
  router.replace(e)
  type.value = t
}

const toLogin = () => {
  (useCheckState() as any).check(proxy)
}

type.value = router.currentRoute.value.meta.typeIndex as number
let info = reactive<{
  [propName: string]: any
}>({})
const initInfo = () => {
  let res = getInfo()
  if(res) {
    for(let key in res) {
      info[key] = res[key]
    }
  }
}
initInfo()

proxy.$Bus.on('logined', () => {
  initInfo()
})
</script>

<style lang='less'>
.ChartType {
  width: 60px;
  height: 100%;
  background-color: @navColor;
  box-sizing: border-box;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .active {
    color: @theme;
    background-color: @curColor;
    i {
      color: @theme;
    }
  }

  .typeItem {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    padding: 12px 0;

    &:hover {
      background-color: @curColor;
    }

    i {
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .menu {
    .menu_item {
      .iconfont {
        cursor: pointer;
        font-size: 30px;
        cursor: pointer;
      }
      img {
        cursor: pointer;
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}
</style>