<template>
  <el-scrollbar style="background: #424242" height="100vh">
    <div class="functionList">
      <layer-button />
      <save-as-button />
      <image-button />
      <text-button />
      <shape-button />
      <chart-button />
      <map-button />
      <export-button />
      <preview-button />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import SaveAsButton from "@/views/ScreenPage/components/saveAsButton.vue";
import LayerButton from "@/views/ScreenPage/components/layerButton.vue";
import ImageButton from "@/views/ScreenPage/components/imageButton.vue";
import TextButton from "@/views/ScreenPage/components/textButton.vue";
import ShapeButton from "@/views/ScreenPage/components/shapeButton.vue";
import ChartButton from "@/views/ScreenPage/components/chartButton.vue";
import MapButton from "@/views/ScreenPage/components/mapButton.vue";
import ExportButton from "@/views/ScreenPage/components/exportButton.vue";
import PreviewButton from "@/views/ScreenPage/components/previewButton.vue";
</script>

<style lang="less">
.functionListPopoverClass {
  width: auto !important;
  .typeContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    .typeItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      padding: 10px;
      border-radius: 10px;
      img {
        width: 50px;
        margin-bottom: 10px;
      }
      &:hover {
        background-color: #ffffff17;
      }
    }
  }
  .skeleton_loading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
  }
  .el-empty {
    width: 500px;
  }
  .functionListChartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .item {
      position: relative;
      .name {
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
      }
      &:hover .mask {
        opacity: 1;
      }
      .mask {
        position: absolute;
        z-index: 2;
        width: 100%;
        aspect-ratio: 2/1.3;
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
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
}
.functionList {
  display: flex;
  flex-direction: column;
  padding: 20px 3px 20px 0;
  .active {
    background-color: #4d4d4d !important;
    color: @theme !important;
  }
}
</style>
