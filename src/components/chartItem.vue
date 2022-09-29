<template>
  <div class="chartItem">
    <div class="imageContainer">
      <div @click="router.push('/Chart?id='+id)" class="mask">
        插入图表
      </div>
      <img :src="cover" alt="">
    </div>
    <div>{{name}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'chartItem',
  props: ['cover', 'id', 'name'],
  setup() {
    const router = useRouter()
    const data = reactive({})
    onMounted(() => {
    })
    return {
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.chartItem {
  width: 100%;
  text-align: center;
  font-size: 13px;
  .imageContainer {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    &:hover .mask {
      opacity: 1;
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 180, 75, 0.582);
      color: #Fff;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      opacity: 0;
      transition: .2s all linear;
    }
  }
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>