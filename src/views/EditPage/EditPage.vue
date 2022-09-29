<template>
  <div id="EditPage">
    <ChartType />
    <div class="rightRouterContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance } from 'vue'
import ChartType from "./components/ChartType.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/EditPage/EditPage";

export default defineComponent({
  name: 'EditPage',
  components: {
    ChartType,
  },
  setup() {
    const router = useRouter()
    const _this: any = getCurrentInstance()
    const data = reactive(new InitData())
    onMounted(() => {
      data.type = router.currentRoute.value.meta.typeIndex as number
      
      _this.proxy.$Bus.on('resize', (e: number) => {
        console.log(e);
      })
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#EditPage {
  display: flex;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  .rightRouterContainer {
    flex: 1;
    height: 100%;
  }
}
</style>