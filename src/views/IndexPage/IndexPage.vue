<template>
  <div id="IndexPage">
    <div class="header">
      <div class="logo">
        <img
          @click="router.push('/')"
          class="logoIcon" src="@/assets/image/logo.png" alt="" />
        <img
          @click="router.push('/')"
          class="
            titleIcon
            animate__animated animate__delay-2s animate__rubberBand
          "
          src="@/assets/image/quickChart.png"
          alt=""
        />
        <div class="userInfo">
          <div class="user">
            <el-popover placement="bottom" :width="300" trigger="hover">
              <template #reference>
                <span>QdabuliuQ</span>
              </template>
              <div class="infoContainer">
                <div>
                  项目仓库地址：
                  <a href="https://github.com/QdabuliuQ/EchartQwQ"
                    >https://github.com/QdabuliuQ/EchartQwQ</a
                  >
                </div>
                <div class="infoItem">
                  <el-divider content-position="left">
                    <span class="title">更多信息：</span>
                  </el-divider>
                  <div class="itemContainer">
                    <div class="item">
                      <img src="@/assets/image/github.png" alt="" />
                      <a href="https://github.com/QdabuliuQ">Github仓库</a>
                    </div>
                    <div class="item">
                      <img src="@/assets/image/gitee.png" alt="" />
                      <a href="https://gitee.com/qdabuliuq">Gitee仓库</a>
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>
            出品
          </div>
        </div>
      </div>
      <div class="more">
        <div @click="router.push('/Document')" class="moreItem">
          <i class="iconfont i_document"></i>
          操作文档
        </div>
      </div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
})
</script>

<style lang='less'>
#IndexPage {
  width: 80%;
  margin: 0 auto;
  min-width: 1100px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 2px solid #565656;
    .logo {
      display: flex;
      align-items: center;
      .logoIcon {
        cursor: pointer;
        width: 40px;
      }
      .titleIcon {
        cursor: pointer;
        width: 200px;
        margin-left: 5px;
        padding-right: 10px;
      }
      .userInfo {
        padding-left: 15px;
        box-sizing: border-box;
        border-left: 1px solid #ccc;
        .user {
          span {
            border-bottom: 2px dashed rgb(135, 135, 135);
            cursor: pointer;
            transition: 0.2s all linear;
            &:hover {
              color: @theme;
            }
          }
        }
      }
    }
    .more {
      .moreItem {
        margin-left: 15px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .2s all linear;
        .iconfont {
          margin-right: 5px;
        }
        &:hover {
          color: @theme;
        }
      }
    }
  }
}
</style>