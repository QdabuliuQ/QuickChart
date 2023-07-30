<template>
  <div class="CommunityPage">
    <div class="types">
      <div :class="[active === 0 ? 'active' : '', 'typeItem']">
        <i class="iconfont i_all"></i>
        全部
      </div>
      <div v-for="item in list" :key="item.id" :class="[active === item.id ? 'active' : '', 'typeItem']">
        <i :class="['iconfont', item.icon]"></i>
        {{ item.type }}
      </div>
    </div>
    <div class="info">
      <div v-if="events.length" class="container">
        <eventItem
          v-for="item in events"
          v-bind="item"
          @praiseEvent="(type: string) => {
            type === '1' ? item.praise_count ++ : item.praise_count --
            type === '1' ? item.is_praise ++ : item.is_praise --
          }"/>
      </div>
      <el-empty v-else description="空空如也~~~" />
    </div>
    <div class="user">
      <div v-if="info" class="login">
        <div class="detail">
          <el-avatar :size="50" :src="info.user_pic" />
          <span class="nickname">{{ info.nickname }}</span>
        </div>
        <div class="data">
          <div class="dataItem">
            <div class="cnt">0</div>
            <div class="desc">图表</div>
          </div>
          <div class="dataItem">
            <div class="cnt">0</div>
            <div class="desc">关注</div>
          </div>
          <div class="dataItem">
            <div class="cnt">0</div>
            <div class="desc">关注着</div>
          </div>
        </div>
      </div>
      <div v-else @click="toLogin" class="unlogin">
        <div class="detail">
          <i class="iconfont i_login"></i>
          <span class="nickname">请先登录账号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import list, {ListInt} from "@/utils/chartItem";
import {getEvents} from "@/network/event";
import useProxy from "@/hooks/useProxy";
import {EventInt} from "@/types/common";
import eventItem from "@/components/eventItem.vue"
import {getInfo} from "@/utils";
import {useCheckState} from "@/hooks/useCheckState";

const items = reactive<ListInt[]>(list)
const active = ref<number>(0)
const events = reactive<EventInt[]>([])
const info = reactive<any>(getInfo())
const proxy = useProxy()
let offset: number = 1

const getData = async () => {
  let data: any = await getEvents({
    offset,
    type: (active.value).toString()
  })
  if(!data.status) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  events.length = 0
  for(let item of data.data) {
    events.push(item)
  }
}
getData()

const toLogin = () => {
  let { check } = (useCheckState() as any)
  if(check) check(proxy)
}

</script>
<style lang="less">
.CommunityPage {
  display: flex;
  margin: 30px 0;
  transform: scale(1);
  .types {
    padding: 10px 0;
    position: fixed;
    background-color: #353535;
    border-radius: 10px;
    box-shadow: 0 0 9px 0 #0d0d0d;
    .typeItem {
      padding: 12px 45px 12px 40px;
      cursor: pointer;
      transition: .2s all linear;
      i {
        margin-right: 7px;
      }
      &:hover {
        background-color: rgba(255, 174, 52, 0.29);
      }
    }
    .active {
      background-color: @theme;
      color: #fff;
    }
  }
  .user {
    width: 250px;
    border-radius: 10px;
    background-color: #353535;
    position: fixed;
    right: 0;
    .login {
      padding: 0 20px;
      .detail {
        padding: 25px 0;
        display: flex;
        align-items: center;
        .nickname {
          .overflow();
          width: 150px;
          margin-left: 10px;
        }
      }
      .data {
        box-sizing: border-box;
        border-top: 1px solid #606060;
        padding: 10px 0 30px 0;
        display: flex;
        align-items: center;
        .dataItem {
          flex: 1;
          .desc {
            margin-top: 5px;
            font-size: 13px;
            color: #ccc;
          }
        }
      }
    }
    .unlogin {
      padding: 25px 20px;
      .detail {
        display: flex;
        align-items: center;
        font-size: 15px;
        cursor: pointer;
        .iconfont {
          font-size: 45px;
          margin-right: 10px;
        }
      }

    }
  }
  .info {
    //width: calc(100% - 180px - 260px);
    background-color: #353535;
    margin-left: 180px;
    margin-right: 270px;
    padding: 20px;
    border-radius: 10px;
    .container {
      max-width: 100%;
    }
  }
}
</style>