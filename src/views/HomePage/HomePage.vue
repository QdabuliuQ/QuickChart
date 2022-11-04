<template>
  <div id="HomePage">
    <div class="mainContainer">
      <div class="main_leftInfo">
        <div class="title1">
          <em>QuickChart 图表在线生成</em>
        </div>
        <div class="title2 infoItem">
          基于 <img class="vue" src="@/assets/image/vue.png" alt="" />
          <a href="https://cn.vuejs.org/">Vue3</a> &
          <img src="@/assets/image/echarts.png" alt="" /><a
            href="https://echarts.apache.org/zh/index.html"
            >Echarts</a
          >
          实现的在线图表编辑工具
        </div>
        <div class="start infoItem">
          <div
            @mouseenter="animate = true"
            @mouseleave="animate = false"
            class="startBtn"
            @click="router.push('/EditPage')"
          >
            开始制作图表
            <i
              :class="[animate ? 'arrowAnimation' : '', 'iconfont', 'i_right']"
            ></i>
          </div>
        </div>
        <div class="tip">
          第一次使用<span> QucikChart </span>? 点击<span> 查看文档</span>
        </div>
      </div>
      <div class="main_rightInfo">
        <img
          @load="imgLoad"
          class="cover"
          src="@/assets/image/cover.svg"
          alt=""
        />
        <div class="coverActiveContainer">
          <img
            class="coverActive"
            src="@/assets/image/coverActive.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <el-divider content-position="left">
      <div class="divider_title">核心功能</div>
    </el-divider>
    <div class="functionContainer">
      <div class="function_itemList">
        <div
          v-for="(item, index) in functionList"
          :key="index"
          class="function_item"
        >
          <div style="padding: 60px 30px">
            <div style="width: 160px; height: 160px; margin: 0 auto">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.img"
                :fit="'contain'"
              />
            </div>
            <div class="function_item_title">
              {{ item.title }}
            </div>
            <div class="function_item_desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-divider content-position="left">
      <div class="divider_title">使用步骤</div>
    </el-divider>
    <div class="processContainer">
      <el-carousel height="170px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in processList" :key="item.step">
          <div class="process_item">
            <div class="process_item_left">
              <div class="item_step_title">Step {{ item.step }}</div>
              <div class="item_title">{{ item.title }}</div>
              <div class="item_desc">{{ item.desc }}</div>
            </div>
            <div class="process_item_right">
              <img :src="item.img" alt="" />
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/HomePage/HomePage";

export default defineComponent({
  name: "HomePage",
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const imgLoad = () => {};

    onMounted(() => {});
    return {
      router,
      imgLoad,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.infoContainer {
  .infoItem {
    .title {
      margin: 7px 0;
      font-weight: bold;
    }
    .itemContainer {
      display: flex;
      align-items: center;
    }
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      &:hover {
        a {
          color: @theme !important;
        }
        img {
          transform: rotate(360deg);
        }
      }
      img {
        width: 30px;
        margin-right: 10px;
        transform-origin: 50% 50%;
        transition: 0.5s all linear;
      }
      a {
        color: #ccc;
        transition: 0.2s all linear;
      }
    }
  }
}
#HomePage {
  .el-divider {
    margin: 24px 0 55px;
  }
  .el-divider__text {
    background-color: #282828;
  }
  .divider_title {
    font-size: 30px;
    font-weight: bold;
  }
  .mainContainer {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main_leftInfo {
      .infoItem {
        margin-top: 30px;
      }
      .title1 {
        font-size: 40px;
        font-weight: bold;
      }
      .title2 {
        font-size: 20px;
        display: flex;
        align-items: center;
        a {
          color: #ccc;
          margin-right: 6px;
          &:hover {
            color: @theme;
          }
        }
        img {
          width: 20px;
          margin: 0 6px;
          position: relative;
          top: 0.5px;
        }
        .vue {
          height: 24px;
        }
      }
      .start {
        display: flex;
        align-items: center;
        .startBtn {
          display: flex;
          align-items: center;
          padding: 13px 30px 15px;
          background-color: @theme;
          color: #fff;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          .iconfont {
            font-size: 21px;
            margin-left: 5px;
            position: relative;
          }
          &:hover {
            background-color: @hover;
          }
          .arrowAnimation {
            animation: arrowAnimation 0.7s linear infinite;
          }
          @keyframes arrowAnimation {
            0% {
              left: 0;
            }
            50% {
              left: 5px;
            }
            100% {
              left: 0;
            }
          }
        }
      }
      .tip {
        margin-top: 10px;
        font-size: 15px;
        color: #ccc;
        span {
          color: @theme;
          cursor: pointer;
        }
      }
    }
    .main_rightInfo {
      flex: 1;
      position: relative;
      margin-left: 20px;
      img {
        width: 100%;
      }
      .cover {
        position: relative;
        right: -10px;
      }
      .coverActiveContainer {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        right: -10px;
        top: -1.5px;
        -webkit-clip-path: polygon(15% 0, 30% 0, 15% 100%, 0% 100%);
        clip-path: polygon(15% 0, 30% 0, 15% 100%, 0% 100%);
        animation: coverContainerAnimation 6s linear infinite;
      }
      .coverActive {
        width: 100%;
        position: absolute;
        height: 100%;
        z-index: 2;
      }
      @keyframes coverContainerAnimation {
        0% {
          -webkit-clip-path: polygon(0% 0, 15% 0, 0% 100%, -15% 100%);
          clip-path: polygon(0% 0, 15% 0, 0% 100%, -15% 100%);
        }
        100% {
          -webkit-clip-path: polygon(115% 0, 130% 0, 115% 100%, 100% 100%);
          clip-path: polygon(115% 0, 130% 0, 115% 100%, 100% 100%);
        }
      }
    }
  }
  .functionContainer {
    margin-bottom: 60px;
    .function_itemList {
      margin: 30px 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 40px;
      text-align: center;
      .function_item {
        box-shadow: 0px 0px 12px 1px rgba(131, 131, 131, 0.4);
        border-radius: 10px;
        position: relative;
        top: 0;
        transition: 0.3s all linear;
        &:hover {
          top: -7px;
        }
      }
      .function_item_title {
        margin-top: 40px;
        font-weight: bold;
        font-size: 19px;
      }
      .function_item_desc {
        margin-top: 20px;
        font-weight: bold;
      }
    }
  }
  .processContainer {
    margin: 0 0 60px;
    .process_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item_step_title {
        font-size: 20px;
        color: #939393;
      }
      .item_title {
        margin-top: 10px;
        font-size: 30px;
        font-weight: bold;
        color: @theme;
      }
      .item_desc {
        margin-top: 10px;
      }
      .process_item_left {
        flex: 1;
      }
      .process_item_right {
        img {
          width: 200px;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>