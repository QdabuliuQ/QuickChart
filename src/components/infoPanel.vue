<template>
  <div class="infoPanel">
    <div v-login="toPraise" :class="['infoBtn', props.is_praise == '1' ? 'active' : '']">
      <div class="btnContainer">
        <i class="iconfont i_praise"></i>
        <span>点赞</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  is_praise: string
  praise_count: number
  praiseEvent: Function
}>()
const emits = defineEmits([
  'update:is_praise',
  'update:praise_count'
])

const toPraise = () => {
  let state = props.is_praise === "1" ? "0" : "1"
  props.praiseEvent && props.praiseEvent(state).then(() => {
    emits("update:is_praise", state)
    emits("update:praise_count", state === "1" ? props.praise_count + 1 : props.praise_count - 1)
  })
}

</script>

<style lang="less">
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: #424242;
    cursor: pointer;
    transition: .2s all linear;
    &:hover {
      background-color: #595959;
    }
    .btnContainer {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .iconfont {
      margin-bottom: 5px;
      font-size: 16px;
      .flex();
    }
    span {
      font-size: 12px;
    }
  }
}
</style>