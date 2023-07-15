<template>
  <div class="DetailPage">
    <div class="pageTitle">账户管理</div>
    <el-form
      ref="ruleFormRef"
      :label-position="'top'"
      :model="form"
      :rules="rules"
      style="max-width: 600px"
    >
      <el-form-item label="头像">
        <avatar-upload v-model:url="form.user_pic" />
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input disabled v-model="form.email" />
      </el-form-item>
      <el-form-item label="个人主页">
        <el-input v-model="form.homePage" placeholder="展示自我的主页" />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="form.desc" placeholder="简单的介绍一下自己吧" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="updateInfo">
      <i style="font-size: 12px; margin-right: 6px;" class="iconfont i_update"></i>
      更新资料
    </el-button>
  </div>
</template>
<script setup lang="ts">
import {
  reactive, ref
} from "vue";
import {useLogin} from "@/hooks/useLogin";
import avatarUpload from "@/components/avatarUpload.vue"
import {FormInstance, FormRules} from "element-plus";
import {
  putProfile,
  getProfile
} from "@/network/info"
import useProxy from "@/hooks/useProxy";
import {debounce} from "lodash";

const proxy = useProxy()
const ruleFormRef = ref<FormInstance>()
const info = useLogin(false)
const form: any = reactive({
  nickname: (info as any).nickname,
  email: (info as any).email,
  homePage: (info as any).homePage,
  desc: (info as any).desc,
  user_pic: (info as any).user_pic
})
const rules = reactive<FormRules>({
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 1, max: 15, message: '昵称长度不能超过15个字符', trigger: 'blur' },
  ],
})

const updateInfo = debounce(async () => {
  (ruleFormRef.value as any).validate((valid: boolean) => {
    if(!valid) return proxy.$notice({
      type: 'error',
      message: "请完善输入内容",
      position: 'top-left'
    })
  })
  let { data } = await putProfile({
    user_pic: form.user_pic,
    desc: form.desc,
    homePage: form.homePage,
    nickname: form.nickname
  })
  if(!data.status) {
    proxy.$notice({
      type: 'error',
      message: data.msg,
      position: "top-left"
    })
  } else {
    let { data } = await getProfile();
    localStorage.setItem('info', JSON.stringify(data.data))
    for(let key in data.data) {
      form[key] = data.data[key]
    }
    proxy.$Bus.emit('logined')
    proxy.$notice({
      type: 'success',
      message: '修改用户资料成功',
      position: "top-left"
    })
  }
})
</script>
<style lang="less">

</style>