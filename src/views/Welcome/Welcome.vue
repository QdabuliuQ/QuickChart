<template>
  <div id="Welcome">
    <div class="container">
      <div class="titleContainer">
        <img src="@/assets/image/welcome.png" alt="" />
      </div>
      <div class="stepContainer">
        <div v-for="(item, index) in processList" :key="index" class="stepItem">
          <div class="stepItemContainer">
            <img :src="item.img" alt="" />
            <div class="stepItmeTitle">{{ item.title }}</div>
            <div class="stepItmeDesc">{{ item.desc }}</div>
          </div>
          <i
            v-if="index != processList.length - 1"
            class="iconfont i_step_right"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Welcome/Welcome";

export default defineComponent({
  name: "Welcome",
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#Welcome {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .titleContainer {
    text-align: center;
    img {
      width: 500px;
    }
  }
  .stepContainer {
    margin: 0 40px;
    display: flex;
    align-items: center;
    .stepItem {
      display: flex;
      align-items: center;
      flex: 1;
      .stepItemContainer {
        text-align: center;
        .stepItmeTitle {
          font-size: 17px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .stepItmeDesc {
          height: 80px;
          font-size: 14px;
        }
      }
      .i_step_right {
        font-size: 40px;
        position: relative;
        top: 10px;
        animation: arrowAnimation 1s linear infinite;
        @keyframes arrowAnimation {
          0% {
            left: 0px;
          }
          50% {
            left: 10px;
            color: @theme;
          }
          100% {
            left: 0px;
          }
        }
      }
      img {
        width: 15vw;
      }
    }
  }
}
</style>