<template>
  <el-dialog
    v-model="visible"
    title="保存图表"
    width="30%"
    @close="closeEvent"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-position="'top'"
    >
      <el-form-item prop="name" label="图表名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelEvent">取消</el-button>
        <el-button type="primary" @click="saveEvent">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onUnmounted, reactive, ref, watch} from "vue";
import {FormInstance, FormRules} from "element-plus";
import useProxy from "@/hooks/useProxy";

const proxy = useProxy()
const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
}>(), {
  visible: false,
  title: "保存图表"
})
const emits = defineEmits([
  'saveChart',
  'update:visible'
])
const visible = ref<boolean>(false)
const form = reactive({
  name: '',
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '图表名称不能为空', trigger: 'blur' },
    { max: 15, message: '图表名称不能超过15个字符', trigger: 'blur' },
  ],
})

const saveEvent = () => {
  (formRef.value as any).validate(async (valid: boolean) => {
    if(!valid) {
      proxy.$notice({
        type: 'error',
        message: "图表名称不符合规范",
        position: 'top-left'
      })
    } else {
      emits("saveChart", form.name)
    }
  })
}

const cancelEvent = () => {
  visible.value = false
  emits("update:visible", false)
}

const closeEvent = () => {
  formRef.value!.resetFields()
  emits("update:visible", false)
}

const stop = watch(() => props.visible, (val: boolean) => {
  visible.value = val
})

onUnmounted(() => {
  stop()  // 取消监听
})

</script>

<style lang="less">

</style>