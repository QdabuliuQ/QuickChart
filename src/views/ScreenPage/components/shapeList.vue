<template>
  <div class="shapeList">
    <div class="shapeGroup" v-for="item in SHAPE_LIST">
      <div class="shapeCategory">{{item.type}}</div>
      <div class="shapeContainer">
        <svg
          @click="shapeClick(s, i)"
          v-for="(s,i) in item.children"
          :key="i"
          overflow="visible"
          width="18"
          height="18"
        >
          <g
            :transform="`scale(${18 / s.viewBox[0]}, ${18 / s.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`"
          >
            <path
              class="shape-path"
              :class="{ 'outlined': s.outlined }"
              vector-effect="non-scaling-stroke"
              stroke-linecap="butt"
              stroke-miterlimit="8"
              :fill="s.outlined ? '#999' : 'transparent'"
              :stroke="s.outlined ? 'transparent' : '#999'"
              stroke-width="2"
              :d="s.path"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {SHAPE_LIST} from "@/assets/js/shape"
import {ShapePoolItem} from "@/types/shape";
const emits = defineEmits([
  'shapeClick'
])

const shapeClick = (s: ShapePoolItem, i: number) => {
  emits("shapeClick", {
    ...s,
    idx: i
  })
}
</script>
<style lang="less">
.shapeList {
  width: 400px;
  padding-right: 5px;
  .shapeGroup {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .shapeCategory {
      color: @theme;
      background: rgba(248, 181, 87, 0.15);
      padding: 7px 0 7px 15px;
      margin-bottom: 15px;
      font-size: 13px;
      position: relative;
      font-weight: bold;
      &:after {
        position: absolute;
        content: "";
        width: 2px;
        height: 100%;
        background: @theme;
        left: 0;
        top: 0;
      }
    }
    .shapeContainer {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      grid-gap: 15px;
      svg {
        cursor: pointer;
        path {
          transition: .2s all linear;
        }
        &:hover path{
          stroke: @theme;
        }
      }
    }
  }
}
</style>