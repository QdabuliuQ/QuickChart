<template>
  <div ref="containerRef" @click.stop>
    <slot></slot>
    <!-- 通过 Teleport 将菜单传送到 body 中  -->
    <Teleport to="body">
      <div
        v-show="showMenu"
        class="context-menu"
        :style="{
          width: props.width + 'px',
          left: x + 'px',
          top: y + 'px',
          background: props.background,
          border: `1px solid ${props.borderColor}`
        }"
        >
        <div class="menu-list">
          <div @click="handleClick(item)" class="menu-item" v-for="(item, i) in props.menu" :key="item.label">
            <i style="margin-right: 5px; font-size: 14px" v-if="item.icon" :class="['iconfont', item.icon] " />
            {{ item.label }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useContextMenu from '@/hooks/useContextMenu';
const containerRef = ref(null);
const { x, y, showMenu } = useContextMenu(containerRef);

interface IMenu {
  label: string
  icon?: string
}
const props = withDefaults(defineProps<{
  menu: Array<IMenu>
  background?: string
  borderColor?: string
  width?: number
}>(), {
  menu: [] as any,
  background: '#fff',
  borderColor: 'transparent',
  width: 150
})
const emits = defineEmits(['select'])
const handleClick = (item: any) => {
  emits('select', item)
}
</script>
<style lang="less">
.context-menu {
  position: fixed;
  z-index: 10000;
  padding: 7px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 2px 2px 11px 0 rgba(0, 0, 0, .3);
  .menu-item {
    cursor: pointer;
    padding: 8px 20px;
    color: #000;
    font-size: 13px;
    transition: .2s all linear;
    &:hover {
      background: rgba(248, 181, 87, 0.2);
    }
  }
}
</style>