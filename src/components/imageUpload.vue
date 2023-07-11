<template>
  <div class="imageUpload">
    <div v-if="base64">
      <el-link @click="dialogVisible = true" type="primary">查看</el-link>
      <el-link @click="deleteImage" type="danger">删除</el-link>
    </div>
    <div v-else>
      <input @change="fileUpload" accept="image/jpeg, image/png, image/jpg" ref="inputRef" style="display: none" type="file">
      <el-button @click="uploadEvent" size="small" type="primary">
        <span style="transform: scale(.85)">
          上传图片
        </span>
      </el-button>
    </div>
    <el-dialog class="imagePreviewDialog" v-model="dialogVisible">
      <img w-full :src="props.base64" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {defineProps, ref} from "vue";
import {fileType} from "@/utils";
import useProxy from "@/hooks/useProxy";
const proxy = useProxy()
const props = defineProps<{
  base64: string
}>()
const emits = defineEmits([
    "imageChange",
    "deleteImage"
])
const dialogVisible = ref<boolean>(false)
const inputRef = ref<HTMLInputElement>()
const uploadEvent = () => {
  inputRef.value?.click()
}
const deleteImage = () => {
  emits('deleteImage')
}
const fileUpload = (e: Event) => {
  let img = (inputRef.value as any).files[0]
  if(fileType(img.name) == 'image') {
    if(img.size / 1024 > 100) {
      proxy.$notice({
        message: '图片大小不能大于100kb',
        type: 'error',
      })
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function (e)  {
        emits("imageChange", this.result)
      }
    }
  } else {
    proxy.$notice({
      message: '请上传图片',
      type: 'error',
    })
  }
}

</script>
<style lang="less">
.imagePreviewDialog {
  .el-dialog__body {
    height: 50vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.imageUpload {
  .el-link {
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>