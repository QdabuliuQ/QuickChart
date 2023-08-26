<template>
  <div id="IndexPage">
    <div class="header">
      <div class="left">
        <div class="logo" @click="router.push('/')">
          <img
            class="logoIcon" src="@/assets/image/logo.png" alt=""/>
          <img
            class="titleIcon"
            src="@/assets/image/quickChart.png"
            alt=""
          />
        </div>
        <div class="menu">
          <div @click="toPage('home')" :class="[active == 'home' ? 'active' : '', 'menuItem']">
            首页
          </div>
          <div @click="toPage('community')" :class="[active == 'community'  ? 'active' : '', 'menuItem']">
            社区
          </div>
        </div>
      </div>
      <div class="more">
        <div v-if="!isLogin" @click="toLogin" class="moreItem">
          <i class="iconfont i_login"></i>
          登录/注册
        </div>
        <el-popover
          v-else
          popper-class="menuPopoverClass"
          placement="bottom"
          :hide-after="50"
        >
          <template #reference>
            <div class="moreItem">
              <img :src="info.user_pic"/>
              {{ info.nickname }}
            </div>
          </template>
          <menu-list/>
        </el-popover>
      </div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from "vue-router";
import useProxy from "@/hooks/useProxy";
import {onUnmounted, reactive, ref, watch} from "vue";
import {useLogin} from "@/hooks/useLogin";
import menuList from "@/components/menuList.vue"

const router = useRouter()
const proxy = useProxy()

const isLogin = ref(false)
const active = ref<string>('home')

interface infoInt {
  email: string
  nickname: string
}

const info: any = reactive<infoInt>({
  email: '',
  nickname: ''
})

const toLogin = () => {
  proxy.$Bus.emit('showLoginDialog')
}

let res: any = useLogin(false)
if (res) {
  for (let key in (res as infoInt)) {
    info[key] = res[key]
  }
  isLogin.value = true
}
proxy.$Bus.on('logined', () => {
  let _info: any = JSON.parse(localStorage.getItem('info') as string)
  for (let key in _info) {
    info[key] = _info[key]
  }
  isLogin.value = true
})

const toPage = (path: string) => {
  router.push('/index/' + path)
}

let stop = watch(() => router.currentRoute.value.path, () => {
  console.log(router.currentRoute.value)
  active.value = router.currentRoute.value.name as string
}, {
  immediate: true
})

onUnmounted(() => {
  stop()
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
    border-bottom: 2px solid #494949;

    .left {
      display: flex;
      align-items: center;
    }

    .menu {
      display: flex;
      align-items: center;

      .menuItem {
        padding: 10px 30px 12px;
        margin-right: 20px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        letter-spacing: 3px;
        text-indent: 3px;

        &:hover {
          background-color: @grey;
        }
      }

      .active {
        background-color: @theme !important;
        color: #fff;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      margin-right: 50px;

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
      display: flex;
      align-items: center;

      .moreItem {
        color: #aaaaaa;
        margin-left: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .2s all linear;

        .iconfont {
          font-size: 25px;
          margin-right: 8px;
        }

        &:hover {
          color: @theme;
        }

        img {
          width: 30px;
          height: 30px;
          margin-right: 8px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>