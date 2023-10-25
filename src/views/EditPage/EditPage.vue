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
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  .rightRouterContainer {
    flex: 1;
    height: 100%;
  }
}
</style>