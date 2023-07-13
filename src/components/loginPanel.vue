<template>
  <div class="loginPanel">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item v-show="type == 'password'" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item v-show="type == 'code'" prop="code">
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
      <drag-verify class="dragItem" v-model:value="form.verify"></drag-verify>
      <div class="tip">
        <span @click="type = 'password'" class="toggle" v-show="type == 'code'">密码登录</span>
        <span @click="type = 'code'" class="toggle" v-show="type == 'password'">验证码登录</span>
        <span class="forget">忘记密码？</span>
      </div>
      <button @click="toLogin" class="login">登录</button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  watch
} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {emailPattern} from "@/utils";
import dragVerify from "@/components/dragVerify.vue";
import {getCode, login} from "@/network/login";
import useProxy from "@/hooks/useProxy";

const proxy = useProxy()
const ruleFormRef = ref<FormInstance>()
let rules = reactive<FormRules>({
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { pattern: emailPattern, message: '邮箱格式错误', trigger: 'blur' },
  ],
})
const form = reactive({
  email: '',
  password: '',
  code: '',
  verify: false
})
const type = ref('code')
const disable = ref(false)
const codeTime = ref(60)
watch(type, (val: any) => {
  if(val === 'password') {
    delete rules['code']
    rules['password'] = [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      {
        pattern: /^[\S]{6,12}$/,
        message: '密码长度在6-12位之间',
        trigger: 'blur'
      },
    ];
    ruleFormRef.value && (ruleFormRef.value as any).resetFields()
  } else if(val === 'code') {
    delete rules['password']
    rules['code'] = [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      {
        pattern: /^\d{6}$/,
        message: '请输入6位验证码',
        trigger: 'blur'
      },
    ];
    ruleFormRef.value && (ruleFormRef.value as any).resetFields()
  }
}, {
  immediate: true
})

let timer: any = null
const sendCode = async () => {  // 发送验证码
  if(disable.value) return
  let email = form.email.trim()
  if(email.length == 0) return proxy.$notice({
    message: "邮箱不能为空",
    type: "error",
    position: "top-left",
  });
  if(emailPattern.test(email)) {
    let { data } = await getCode({
      email
    })
    if(!data.status) return  proxy.$notice({
      message: "验证码发送失败",
      type: "error",
      position: "top-left",
    });
    disable.value = true
    timer = setInterval(() => {
      codeTime.value -= 1
      if(codeTime.value === 0) {
        clearInterval(timer)
        disable.value = false
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

const toLogin = () => {  // 登录
  if(!form.verify) return proxy.$Notice({
    type: 'error',
    message: '请完成滑动验证',
    position: "top-left",
  });
  (ruleFormRef.value as any).validate(async (valid: boolean) => {
    if(!valid) return proxy.$notice({
      message: "请完善输入内容",
      type: "error",
      position: "top-left",
    })
    if(type.value === 'code') {
      let { data } = await login({
        email: form.email,
        code: form.code
      })
      if(!data.status) return proxy.$Notice({
        type: 'error',
        message: data.msg,
        position: "top-left"
      })
      saveData(data.token, data.id, data.data)
    } else {
      let { data } = await login({
        email: form.email,
        password: form.password
      })
      if(!data.status) return proxy.$Notice({
        type: 'error',
        message: data.msg,
        position: "top-left"
      })
      saveData(data.token, data.id, data.data)
    }
  })
}

const saveData = (token: string, id: string, info: any) => {
  localStorage.setItem('token', token)
  localStorage.setItem('id', id)
  localStorage.setItem('info', JSON.stringify(info))
}

</script>
<style lang="less">
.loginPanel {
  display: flex;
  flex-direction: column;
  .inputStyle();
  .tip {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 13px;
    span {
      cursor: pointer;
    }
    .forget {
      color: @grey;
    }
    .toggle {
      color: @theme;
    }
  }
  .login {
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
    background-color: @theme;
    border: 0;
    width: 100%;
    &:hover {
      background-color: @hover;
    }
  }
  .dragItem {
    margin-bottom: 10px;
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