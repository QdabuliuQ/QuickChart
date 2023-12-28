<template>
  <el-popover
    ref="exportPopoverRef"
    popper-class="functionListPopoverClass"
    placement="right-start"
    trigger="click"
    :hide-after="0"
  >
    <div class="typeContainer">
      <div @click="exportClick('html')" class="typeItem">
        <img src="@/assets/image/html.svg" />
        HTML
      </div>
      <div @click="exportClick('image')" class="typeItem">
        <img src="@/assets/image/image.svg" />
        图片
      </div>
    </div>
    <template #reference>
      <button-item
        title="导出"
        icon="i_export"
        tip="导出内容" />
    </template>
  </el-popover>
  <el-dialog
    v-model="visible"
    title="导出图片"
    width="30%"
  >
    <el-select style="width: 100%" v-model="imgType" placeholder="选择图片格式" size="large">
      <el-option
        key="jpg"
        label="JPG"
        value="jpg"
      />
      <el-option
        key="png"
        label="PNG"
        value="png"
      />
    </el-select>
    <el-select style="width: 100%; margin-top: 20px" v-model="size" placeholder="选择图片格式" size="large">
      <el-option
        v-for="item in sizes"
        :key="item.key"
        :value="item.key"
      >
        <div style="transform: scale(.75); font-size: 15px; padding: 0 15px; display: inline-block; background: #f8b55738; color: #f8b557; border-radius: 6px">{{item.tar}}</div>
        <span style="font-size: 13px">{{item.label}}</span>
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="exportImage">
          导出
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {postScreenHtml} from "@/network/screen";
import useStore from "@/store";
import useProxy from "@/hooks/useProxy";
import ButtonItem from "./buttonItem.vue";

const exportPopoverRef = ref()
const {screen} = useStore()
const proxy = useProxy()
const visible = ref<boolean>(false)
const imgType = ref<"jpg" | "png">("jpg")
const size = ref<string>('1920*1080')
const sizes = [
  {
    key: "1920*1080",
    label: "1920px * 1080px",
    tar: '普通'
  },
  {
    key: "3840*2160",
    label: "3840px * 2160px",
    tar: '标清'
  },
  {
    key: "5760*3240",
    label: "5760px * 3240px",
    tar: '高清'
  },
  {
    key: "7680*4320",
    label: "7680px * 4320px",
    tar: '超清'
  }
]

const exportClick = async (type: string) => {
  switch (type) {
    case 'html':
      let loading = proxy.$loading({
        lock: true,
        text: "正在导出HTML，请稍后...",
        background: "rgba(0, 0, 0, 0.7)",
      })
      Promise.all([
        postScreenHtml({
          option: JSON.stringify(screen.getScreenOption),
          c_width: document.getElementById("dragElement")?.clientWidth as number,
          c_height: document.getElementById("dragElement")?.clientHeight as number
        }),
        new Promise((resolve) => {
          setTimeout(resolve, 1000)
        }),
      ]).then((res: any) => {
        res = res[0]
        if (!res.status) {
          throw new Error()
        }
        const blob = new Blob([res.data], {
          type: "text/html"
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'chart.html'
        link.click()
        proxy.$notice({
          message: "下载文件成功",
          type: "success",
          position: "top-left"
        })
      }).catch(() => {
        proxy.$notice({
          message: "下载文件失败",
          type: "error",
          position: "top-left"
        })
      }).finally(() => {
        loading.close()
      })
      break
    case 'image':
      visible.value = true
      break
  }
  exportPopoverRef.value.hide()
}

const exportImage = () => {  // 导出图片
  visible.value = false
  proxy.$Bus.emit("exportImage", {
    size: size.value.split("*"),
    type: imgType.value
  })
}
</script>