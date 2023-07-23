<template>
  <div class="EditPage">
    <ChartType />
    <div class="rightRouterContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import ChartType from "./components/ChartType.vue";

const router = useRouter()
const type = ref<number>(0)
type.value = router.currentRoute.value.meta.typeIndex as number
</script>


<style lang='less'>
.EditPage {
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