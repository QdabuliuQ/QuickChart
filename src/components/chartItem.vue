<template>
  <el-popover
    :visible='visible'
    placement="right"
    :width="300"
    :hide-after='50'
  >
    <template #reference>
      <div @mouseenter="visible = true" @mouseleave="visible = false" class="chartItem">
        <div class="imageContainer">
          <div @click="router.push('/Chart?id=' + id)" class="mask">
            插入图表
          </div>
          <img :src="cover" alt="" />
        </div>
        <div>{{ name }}</div>
      </div>
    </template>
    <img style="width: 100%; position: relative; top: 2px; border-radius: 7px;" :src="cover" alt="">
  </el-popover>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

interface comInitData{
  visible: boolean
}

export default defineComponent({
  name: "chartItem",
  props: ["cover", "id", "name"],
  setup() {
    const router = useRouter();
    const data: comInitData = reactive({
      visible: false
    });
    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.chartItem {
  width: 100%;
  text-align: center;
  font-size: 12px;
  
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
      background-color: rgba(255, 180, 75, 0.509);
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      opacity: 0;
      transition: 0.2s all linear;
      box-sizing: border-box;
      border: 2px solid @theme;
    }
  }
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>