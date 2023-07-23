<template>
  <div class="info_chartItem">
    <div @mouseenter="opacity = 1" @mouseleave="opacity = 0" class="box">
      <div :style="{
        opacity
      }" @click="toModify" class="mask">
        <el-popover
          popper-class="chartItemPopoverClass"
          placement="bottom-start"
          :hide-after="0"
          trigger="hover"
        >
          <div @mouseenter="opacity = 1" @mouseleave="opacity = 0" class="menuList">
            <div @click="renameEvent" class="menuItem">
              <i class="iconfont i_rename"></i>
              重命名
            </div>
            <div @click="deleteEvent" class="menuItem">
              <i class="iconfont i_delete_2"></i>
              删除
            </div>
          </div>
          <template #reference>
            <div class="more">
              <i class="iconfont i_more"></i>
            </div>
          </template>
        </el-popover>
        <div class="edit">编辑</div>
      </div>
      <img class="cover" :src="props.cover" />
    </div>
    <div v-show="!isSetName" class="name">{{ name }}</div>
    <div v-show="isSetName" class="input">
      <input @blur="blurEvent" v-model="newName" type="text" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import useProxy from "@/hooks/useProxy";
import {deleteChart, putChartName} from "@/network/chart";
import {ElMessageBox} from "element-plus";
import router from "@/router";

const props = defineProps<{
  chart_id: string
  cover: string
  name: string
  option: string
  state: string
  time: number
  type: string
  user_id: string
  idx: number
}>()
const emits = defineEmits([
  'deleteItem'
])
const isSetName = ref<boolean>(false)
const newName = ref<string>(props.name)
const name = ref<string>(props.name)
const opacity = ref<number>(0)
let copyName = ''
const proxy = useProxy()

const renameEvent = () => {  // 开启输入框
  copyName = name.value
  isSetName.value = true;
}
const blurEvent = async () => {  // 失去焦点 关闭输入框
  let _name = newName.value.trim()
  if(_name.length === 0) {
    isSetName.value = false
    newName.value = copyName
    return proxy.$notice({
      type: 'error',
      message: '图表名称不能为空',
      position: 'top-left'
    })
  }
  if(_name.length > 15) {
    isSetName.value = false
    newName.value = copyName
    return proxy.$notice({
      type: 'error',
      message: '图表名称不能超过15个字符',
      position: 'top-left'
    })
  }
  if(_name === name.value) return
  let { data } = await putChartName({  // 调用接口
    name: _name,
    chart_id: props.chart_id
  })
  if(!data.status) {
    isSetName.value = false
    newName.value = copyName
    return proxy.$notice({
      type: 'error',
      message: data.msg,
      position: 'top-left'
    })
  }
  isSetName.value = false
  name.value = _name  // 修改名称
  copyName = _name
  proxy.$notice({
    type: 'success',
    message: data.msg,
    position: 'top-left'
  })
}

const toModify = () => {
  router.push('/modify/'+props.chart_id)
}

const deleteEvent = () => {
  ElMessageBox.confirm(
    '是否确定删除图表？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let { data } = await deleteChart({
        chart_id: props.chart_id
      })
      if(!data.status) return proxy.$notice({
        type: 'error',
        message: data.msg,
        position: 'top-left'
      })
      emits('deleteItem', props.idx)
      proxy.$notice({
        type: 'success',
        message: data.msg,
        position: 'top-left'
      })
    })
}

</script>
<style lang="less">
.chartItemPopoverClass {
  width: 100px !important;
  min-width: 100px !important;
  padding: 0 !important;
  .menuList {
    padding: 12px 0 !important;
    .menuItem {
      padding: 7px 10px;
      font-size: 13px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .iconfont {
        margin-right: 8px;
      }
      &:hover {
        background-color: #414141;
        color: @theme;
      }
    }
  }
}
.info_chartItem {
  width: 100%;
  .box {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    background-image: url("../../../assets/image/bg.jpg");
    background-size: cover;
    background-repeat: repeat;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    .edit {
      position: absolute;
      padding: 6px 14px 7px;
      font-size: 12px;
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 15px;
      background-color: #00000087;
    }
    .more {
      position: absolute;
      padding: 3px 4px;
      border-radius: 4px;
      color: #000;
      right: 5px;
      top: 5px;
      background-color: #fff;
      font-size: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 18px;
      }
    }
  }
  .cover {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
  .name {
    max-width: 140px;
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin: 5px auto 0;
  }
  .input {
    margin-top: 5px;
    height: 30px;
    line-height: 23px;

    border-bottom: 1px solid #636363;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 90%;
      text-align: center;
      border: 0;
      outline: none;
      font-size: 14px;

    }
  }
}
</style>