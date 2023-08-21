<template>
  <div class="piecesOption">
    <div v-for="(item,idx) in pieces" class="piecesItem">
      <el-popover
        placement="right"
        :width="200"
        trigger="click"
      >
        <template #reference>
          <el-button type="primary" title="修改" size="small"><i class="iconfont i_edit"></i></el-button>
        </template>
        <div class="piecesDetail">
          <series-item :title="'最小值'">
            <el-input-number controls-position="right" size="small" v-model="item.lte" />
          </series-item>
          <series-item :title="'最大值'">
            <el-input-number controls-position="right" size="small" v-model="item.gte" />
          </series-item>
          <series-item :title="'文本'">
            <el-input
              v-model="item.label"
              maxlength="20"
              type="text"
              size="small"
            />
          </series-item>
          <series-item :title="'颜色'">
            <el-color-picker v-model="item.color" />
          </series-item>
        </div>
      </el-popover>
      <el-button @click="piecesDelete(idx)" type="danger" title="删除" size="small"><i class="iconfont i_delete_2"></i></el-button>
    </div>
    <div @click="props.pieces.length <= 50 ? emits('piecesAdd') : null" class="itemAdd">
      <i class="iconfont i_plus"></i> 添加
    </div>
  </div>
</template>

<script setup lang="ts">
import {watch, onUnmounted} from "vue";
import SeriesItem from "@/components/seriesItem.vue";
import {debounce} from "@/utils";

const props = defineProps<{
  pieces: {
    lte: number
    gte: number
    label: string
    color: string
  }[]
}>()
const emits = defineEmits([
  "piecesAdd",
  "piecesDelete",
  "piecesChange"
])

const piecesDelete = (idx: number) => {
  emits("piecesDelete", idx)
}

let stop = watch(() => props.pieces, debounce(() => {
  emits("piecesChange", [...props.pieces])
}), {
  deep: true
})

onUnmounted(() => {
  stop()
})

</script>
<style lang="less">
.piecesDetail {
  .el-color-picker {
    width: 100%;
    .el-color-picker__trigger {
      width: 100%;
      height: 25px;
    }
  }
}
.piecesOption {
  width: 100%;
  .piecesItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .el-button {
      padding: 5px 17px;
    }
    .iconfont {
      font-size: 13px;
    }

  }
  .itemAdd {
    width: 100%;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #5b5b5b;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    .iconfont {
      margin-right: 8px;
      font-size: 14px;
    }
    &:hover {
      background-color: #505050;
    }
  }
}
</style>