<template>
  <button-item
    @click-event="clickEvent"
    title="文本"
    icon="i_text"
    tip="插入文本" />
</template>
<script setup lang="ts">
import {getTextConfig} from "@/utils/screenUtil";
import useStore from "@/store";
import ButtonItem from "./buttonItem.vue";

const {screen} = useStore()
const clickEvent = () => {
  screen.addScreenOptionOfElements(getTextConfig())
}
</script>