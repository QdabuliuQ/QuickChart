<template>
  <div id="ChartType">
    <el-scrollbar :height="height">
      <div @click="toggle('/ChartPage', 0)" style="margin-top: 30px" :class="[type == 0 ? 'active': '', 'typeItem']">
        <i class="iconfont i_chart"></i>
        <span>图表</span>
      </div>
      <div @click="toggle('/MapPage', 1)" :class="[type == 1 ? 'active': '', 'typeItem']">
        <i class="iconfont i_map"></i>
        <span>地图</span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance } from 'vue'
import { InitData } from "@/types/EditPage/ChartType";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ChartType',
  setup() {
    const router = useRouter()
    const _this: any = getCurrentInstance()
    const data = reactive(new InitData())

    const toggle = (e: string, t: number) => {
      router.replace(e)
      data.type = t
    }

    data.type = router.currentRoute.value.meta.typeIndex as number
    onMounted(() => {
      _this.proxy.$Bus.on('resize', (e: number) => {
        data.height = e + 'px'
      })
    })
    return {
      toggle,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#ChartType {
  width: 60px;
  height: 100%;
  background-color: @navColor;
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
}
</style>