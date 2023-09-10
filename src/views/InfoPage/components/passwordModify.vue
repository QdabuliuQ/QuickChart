<template>
  <el-dialog
    class="editDialogClass"
    v-model="props.visible"
    title="密码修改"
    :label-position="'top'"
    width="40%"
    @closed="closed"
  >
    <el-form
      ref="ruleFormRef"
      :label-position="'top'"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="原密码" prop="old_password">
        <el-input type="password" show-password v-model="form.old_password" placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" show-password v-model="form.new_password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="验证码">
          <template #append>
            <div :style="{
              backgroundColor: disable ? '#e8e8e8' : '#ffae34',
              color: disable ? '#000' : '#fff'
            }" class="codeBtn" @click="sendCode">
              {{ disable ? codeTime+'后重新发送' :'发送验证码' }}
            </div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits, reactive
} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {getCode, putPassword} from "@/network/info";
import {useLogin} from "@/hooks/useLogin";
import useProxy from "@/hooks/useProxy";
import JsEncrypt from "jsencrypt";
import {publicKey} from "@/utils";

const proxy = useProxy()
const ruleFormRef = ref<FormInstance>()
const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits(['update:visible'])
const disable = ref(false)
const codeTime = ref(60)
const form = reactive({
  old_password: '',
  new_password: '',
  code: ''
})
const rules = reactive<FormRules>({
  old_password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[\S]{6,12}$/,
      message: '密码长度在6-12位之间',
      trigger: 'blur'
    },
  ],
  new_password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[\S]{6,12}$/,
      message: '密码长度在6-12位之间',
      trigger: 'blur'
    },
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    {
      pattern: /^\d{6}$/,
      message: '请输入6位验证码',
      trigger: 'blur'
    },
  ]
})

const info: any = useLogin(false)
let timer: any = null
const sendCode = async() => {
  if(disable.value) return
  let data: any = await getCode()
  if(!data.status) return proxy.$notice({
    message: data.msg,
    type: "error",
    position: "top-left",
  });
  disable.value = true
  timer = setInterval(() => {
    codeTime.value -= 1
    if(codeTime.value === 0) {
      clearInterval(timer)
      disable.value = false
      codeTime.value = 60
    }
  }, 1000)
}
const cancel = () => {  // 取消 关闭窗口
  emits('update:visible', false)
}

const en = new JsEncrypt()
en.setPublicKey(publicKey)
const submit = async () => {  // 提交修改信息
  (ruleFormRef.value as any).validate(async (valid: boolean) => {
    if(!valid) return
    let data: any = await putPassword({
      old_password: en.encrypt(form.old_password) as string,
      new_password: en.encrypt(form.new_password) as string,
      code: form.code
    })
    if(!data.status) return proxy.$notice({
      message: data.msg,
      type: "error",
      position: "top-left",
    });
    proxy.$notice({
      message: data.msg,
      type: "success",
      position: "top-left",
    });
    emits('update:visible', false)
  })

}
const closed = () => {  // 关闭回调函数
  // 清空表单状态
  ruleFormRef.value && (ruleFormRef.value as any).resetFields()
}

</script>

<style lang="less">
.editDialogClass {
  width: 550px !important;
  .el-form-item {
    margin-bottom: 26px;
  }
  .el-input-group__append {
    overflow: hidden;
    padding: 0;
    background-color: @grey2;
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0 1px 0 0 @grey2 inset,0 -1px 0 0 @grey2 inset,-1px 0 0 0 @grey2 inset;
  }
  .codeBtn {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
}
</style>