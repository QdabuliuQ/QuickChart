<template>
  <div class="infoPanel">
    <div v-login="toPraise" :class="['infoBtn', props.is_praise == 1 ? 'active' : '']">
      <div class="btnContainer">
        <i class="iconfont i_praise"></i>
        <span>{{props.praise_count == 0 ? '点赞' : props.praise_count}}</span>
      </div>
    </div>
    <div @click="showComment" class="infoBtn">
      <div class="btnContainer">
        <i class="iconfont i_comment"></i>
        <span>评论</span>
      </div>
    </div>
    <el-drawer
      custom-class="commentDrawerCustomClass"
      v-model="drawer"
      direction="ltr"
      title="评论内容"
    >
      <comment-input :send="send" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import CommentInput from "@/components/commentInput.vue";
import CommentItem from "@/components/commentItem.vue";
import {postComment} from "@/network/chart";

const props = defineProps<{
  chart_id: string
  is_praise: number
  praise_count: number
  praiseEvent: Function
  getData: Function
}>()
const emits = defineEmits([
  'update:is_praise',
  'update:praise_count'
])
const drawer = ref<boolean>(false)

const toPraise = () => {
  let state = props.is_praise == 1 ? 0 : 1
  props.praiseEvent && props.praiseEvent(state).then(() => {
    emits("update:is_praise", state)
    emits("update:praise_count", state === 1 ? props.praise_count + 1 : props.praise_count - 1)
  })
}

/**
 * 打开弹窗
 * @return void
 */
const showComment = () => {
  drawer.value = true
}

/**
 * 发送评论
 * @param content 评论消息
 * @return Promise<boolean> 返回Promise
 */
const send = (content: string) => {
  return new Promise( async (resolve, reject) => {
    let data: any = await postComment({
      chart_id: props.chart_id,
      content
    })
    if(data.status) resolve(true)
    else reject(false)
  })
}

</script>

<style lang="less">
.commentDrawerCustomClass {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 15px 10px 10px;
  }
  .el-drawer__body {
    padding: 10px;
  }
}
.infoPanel {
  position: absolute;
  bottom: 10px;
  left: 10px;
  .active {
    background-color: @theme !important;
    color: #fff !important;
  }
  .infoBtn {
    display: flex;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: #424242;
    cursor: pointer;
    transition: .2s all linear;
    &:hover {
      background-color: #595959;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .btnContainer {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      text-align: center;
    }
    .iconfont {
      margin-bottom: 3px;
      font-size: 16px;
      .flex();
    }
    span {
      font-size: 11px;
    }
  }
}
</style>