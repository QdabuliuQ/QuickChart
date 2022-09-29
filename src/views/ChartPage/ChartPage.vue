<template>
  <div id="ChartPage">
    <typeItem />
    <div class="chartContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import typeItem from "@/components/typeItem.vue";

export default defineComponent({
  name: 'ChartPage',
  components: {
    typeItem,
  },
  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#ChartPage {
  height: 100%;
  display: flex;
  .chartContainer {
    flex: 1;
  }
}
</style>