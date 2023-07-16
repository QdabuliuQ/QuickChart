<template>
  <div class="registerPanel">
    <el-form ref="ruleFormRef" :rules="rules" :model="form">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="form.code" placeholder="验证码">
          <template #append>
            <div :style="{
              backgroundColor: disable ? '#e8e8e8' : '#ffae34',
              color: disable ? '#000' : '#fff'
            }" class="codeBtn" @click="sendCode">
              {{ disable ? codeTime + '后重新发送' : '发送验证码' }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="form.password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="form.re_password" placeholder="请确认密码"/>
      </el-form-item>
    </el-form>
    <button @click="registerEvent" class="login">注册</button>
  </div>
</template>
<script setup lang="ts">
import {defineExpose, reactive, ref} from "vue";
import JsEncrypt from "jsencrypt"
import {FormInstance, FormRules} from "element-plus";
import {
  getCode,
  register
} from '@/network/login'
import {
  emailPattern,
  publicKey
} from '@/utils/index'
import useProxy from "@/hooks/useProxy";

const emits = defineEmits(['finished']);
const ruleFormRef = ref<FormInstance>()
defineExpose({
  ruleFormRef
})
const proxy = useProxy()
const en = new JsEncrypt()
en.setPublicKey(publicKey)
const disable = ref(false)
const codeTime = ref(60)
let timer: any = null
const form = reactive({
  email: '',
  code: '',
  password: '',
  re_password: ''
})
const rules = reactive<FormRules>({
  email: [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {pattern: emailPattern, message: '邮箱格式错误', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
    {
      pattern: /^\d{6}$/,
      message: '请输入6位验证码',
      trigger: 'blur'
    },
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {
      pattern: /^[\S]{6,12}$/,
      message: '密码长度在6-12位之间',
      trigger: 'blur'
    },
  ]
})

const sendCode = async () => {  // 发送验证码
  if (disable.value) return
  let email = form.email.trim()
  if (email.length == 0) return proxy.$notice({
    message: "邮箱不能为空",
    type: "error",
    position: "top-left",
  });
  if (emailPattern.test(email)) {
    let {data} = await getCode({
      email,
      type: 'register'
    })
    if (!data.status) return proxy.$notice({
      message: "验证码发送失败",
      type: "error",
      position: "top-left",
    });
    disable.value = true
    timer = setInterval(() => {
      codeTime.value -= 1
      if (codeTime.value === 0) {
        clearInterval(timer)
        disable.value = false
        codeTime.value = 60
      }
    }, 1000)
  } else {
    proxy.$notice({
      message: "邮件格式错误",
      type: "error",
      position: "top-left",
    });
  }
}

const registerEvent = async () => {  // 注册账号
  if (form.password != form.re_password) return proxy.$notice({
    message: "确认密码不一致",
    type: "error",
    position: "top-left",
  })
  await (ruleFormRef.value as any).validate(async (valid: boolean) => {
    if (valid) {
      let {data} = await register({
        email: form.email,
        code: form.code,
        password: en.encrypt(form.password) as string,
        re_password: en.encrypt(form.re_password) as string,
      })
      if (!data.status) return proxy.$notice({
        message: "账号注册失败",
        type: "error",
        position: "top-left",
      })
      localStorage.setItem('token', data.token)  // 本地存储
      localStorage.setItem('id', data.id)
      emits('finished')
    } else {
      proxy.$notice({
        message: "请完善输入内容",
        type: "error",
        position: "top-left",
      })
    }
  })
}

</script>

<style lang="less">
.registerPanel {
  .inputStyle();

  .el-form {
    display: flex;
    flex-direction: column;

    .el-form-item {
      margin-bottom: 22px;
    }

    .el-input-group__append {
      overflow: hidden;
      padding: 0;
      background-color: @grey2;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 1px 0 0 @grey2 inset,0 -1px 0 0 @grey2 inset, -1px 0 0 0 @grey2 inset;
    }

    .codeBtn {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
    }
  }
  .login {
    width: 100%;
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
    background-color: @theme;
    border: 0;

    &:hover {
      background-color: @hover;
    }
  }
}
</style>