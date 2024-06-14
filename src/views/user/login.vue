<template>
  <div class="body">
    <div class="main">
      <div class="container a-container" :class="{ 'is-txl': is_switch }">
        <div class="form">
          <h2 class="form_title title">注册</h2>
          <input class="form__input" type="text" placeholder="用户名" v-model="username">
          <input class="form__input" type="password" placeholder="密码" v-model="password">
          <el-radio-group v-model="valid" style="width: 350px">
            <el-radio value="0">手机号</el-radio>
            <el-radio value="1" style="margin-left: 50px">邮箱</el-radio>
          </el-radio-group>
          <input v-if="valid === '1'" class="form__input" type="email" placeholder="邮箱" v-model="account">
          <input v-else class="form__input" type="tel" placeholder="手机号" v-model="account">
          <div class="code">
            <input class="form__input" style="width: 200px;" type="text" placeholder="验证码" v-model="code">
            <span @click="getcode">获取验证码</span>
          </div>
          <button class="form__button button" @click="register">注册</button>
        </div>
      </div>
      <div class="container b-container" :class="[{ 'is-txl': is_switch }, { 'is-z200': is_switch }]">
        <div class="form">
          <h2 class="form_title title">登录</h2>
          <input class="form__input" type="text" placeholder="邮箱/手机号" v-model="account">
          <input class="form__input" type="password" placeholder="密码" v-model="password">
          <a class="form__link" @click="openFindPW()">忘记密码？</a>
          <button class="form__button button" @click="login">登录</button>
        </div>
      </div>
      <div class="switch" :class="{ 'is-txr': is_switch }">
        <div class="switch__circle" :class="{ 'is-txr': is_switch }"></div>
        <div class="switch__circle switch__circle--t" :class="{ 'is-txr': is_switch }"></div>
        <div class="switch__container" :class="{ 'is-hidden': !is_switch }">
          <h2 class="switch__title title">没有帐号？</h2>
          <p class="switch__description description">立即注册吧😃</p>
          <button class="switch__button button" @click="is_switch = !is_switch">注册</button>
        </div>
        <div class="switch__container" :class="{ 'is-hidden': is_switch }">
          <h2 class="switch__title title">已有帐号？</h2>
          <p class="switch__description description">请登录🚀</p>
          <button class="switch__button button" @click="is_switch = !is_switch">登录</button>
        </div>
      </div>
    </div>

    <el-dialog title="密码找回" v-model="is_findPW" width="25%" center>
      <input class="form__input" type="text" placeholder="邮箱/手机号" v-model="account" />
      <input class="form__input" type="text" placeholder="新密码" v-model="password" />
      <input class="form__input" style="width: 200px;" type="text" placeholder="验证码" v-model="code">
      <span @click="getcodeForPW()" style="cursor: pointer;padding-left: 10px;">获取验证码</span>
      <template #footer>
        <el-button type="info" @click="submitFindPD()">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { login_API, register_API, getVerificationCode_API, findPD_API } from '@/api/auth';
import type { RegisterForm } from "@/models/auth";
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import { useWebInfoStore } from '@/store/webInfo';
import { useRouter } from 'vue-router';

const router = useRouter()
const webInfoStore = useWebInfoStore()

// 组件数据
const is_switch = ref(true)

/**
 * 验证方式 0:手机号 1:邮箱
 */
const valid = ref("0")
// 表单数据
const account = ref("")
const password = ref("")
const username = ref("")
const code = ref("")

const login = () => {
  if (account.value === "") {
    ElMessage.error({
      message: "请输入手机号或邮箱"
    })
    return
  }
  if (!(phoneNumberStyle(account.value) || emailValidator(account.value))) {
    ElMessage.error({
      message: "请输入正确的手机号或者邮箱"
    })
    return
  }
  if (password.value === "") {
    ElMessage.error({
      message: "请输入密码"
    })
    return
  }
  let data = {
    account: account.value,
    password: password.value
  }
  login_API(data)
    .then(res => {
      if (res.data.code === 400) {
        ElMessage.error(res.data.message)
      }
      if (res.data.code === 200) {
        // console.log(res.data.data)
        ElMessage.success({
          message: "登录成功"
        })
        useUserStore().setUser(res.data.data)
        // console.log(useUserStore().currentUser)
        webInfoStore.login()
        localStorage.setItem("userToken", res.data.data.userToken)
        localStorage.setItem("currentUser", JSON.stringify(res.data.data))
        router.push({ name: "home" })
      }
    })
    .catch(err => {
    })
}

const register = async () => {
  if (username.value === "") {
    ElMessage.error("请输入用户名!")
    return
  }
  if (account.value === "") {
    ElMessage.error("请输入手机号或者邮箱!")
    return
  }
  if (password.value === "") {
    ElMessage.error("请输入密码!")
    return
  }
  if (code.value === "") {
    ElMessage.error("请输入验证码!")
    return
  }
  let data: RegisterForm = {
    username: username.value,
    password: password.value,
    code: code.value
  }
  if (valid.value === "0") {
    data.phone = account.value
  } else {
    data.email = account.value
  }
  await register_API(data)
    .then(res => {
      if (res.data.code === 200) {
        ElMessage.success("注册成功")
      } else if (res.data.code === 400) {
        ElMessage.error(res.data.message)
      }

    })
    .catch(err => {
      ElMessage.error("注册失败")
    })
}
import { phoneNumberStyle, emailValidator } from '@/utils/common';
import { useUserStore } from '@/store/user';
/**
 * 获取验证码的函数
 * 根据输入账号的类型（手机或邮箱）验证账号格式，并发送验证码
 * 
 * 验证逻辑：
 * - 如果账号为空，则提示输入手机号或邮箱
 * - 如果账号验证状态为手机（valid.value为"0"），则检查账号是否为有效手机号
 * - 如果账号验证状态为邮箱，则检查账号是否为有效邮箱
 * - 如果账号格式有效，则提示获取验证码成功
 */
const getcode = () => {
  // 检查账号是否为空，如果为空，则提示输入手机号或邮箱并返回
  if (account.value === "") {
    ElMessage.error("请输入手机号或者邮箱!")
    return
  }
  // 根据验证状态决定账号格式的检查方式
  if (valid.value === "0") {
    // 如果账号验证状态为手机，检查账号是否为有效手机号
    if (!phoneNumberStyle(account.value)) {
      ElMessage.error("请输入有效手机号!")
      return
    } else {
      getVerificationCode_API(account.value, "phone")
        .then(res => {
          if (res.data.code === 200) {
            ElMessage.success("获取成功!")
          } else {
            ElMessage.error(res.data.message)
          }
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })

    }
  } else {
    // 如果账号验证状态为邮箱，检查账号是否为有效邮箱
    if (!emailValidator(account.value)) {
      ElMessage.error("请输入有效邮箱!")
      return
    } else {
      getVerificationCode_API(account.value, "email")
        .then(res => {
          if (res.data.code === 200) {
            ElMessage.success("获取成功!")
          } else {
            ElMessage.error(res.data.message)
          }
          console.log(res.data)
        })
        .catch(err => {
          // console.log(err)
        })
      ElMessage.success("获取成功!")
    }
  }
}
const is_findPW = ref(false)
const openFindPW = () => {
  is_findPW.value = true
}

const submitFindPD = () => {
  if (account.value === "") {
    ElMessage.error("请输入手机号或者邮箱!")
    return
  }
  if (password.value === '') {
    ElMessage.error("请输入密码!")
    return
  }
  if (code.value === '') {
    ElMessage.error("请输入验证码!")
    return
  }
  findPD_API(account.value, password.value, code.value)
    .then(res => {
      if (res.data.code === 200) {
        ElMessage.success("密码重置成功")
        code.value = ''
        is_findPW.value = false
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch(err => {
    })
}

const getcodeForPW = () => {
  if (account.value === "") {
    ElMessage.error("请输入手机或者邮箱!")
    return
  }
  if (emailValidator(account.value)) {
    getVerificationCode_API(account.value, "email")
      .then(res => {
        if (res.data.code === 200) {
          ElMessage.success("发送成功!")
        } else {
          ElMessage.error(res.data.message)
        }
      })
      .catch(err => {
      })
  }
  else if (phoneNumberStyle(account.value)) {
    ElMessage.error("暂不支持手机找回")
    return
  }
  else {
    ElMessage.error("请输入有效手机或者邮箱账号")
    return
  }

}
</script>

<style scoped>
*,
*::after,
*::before {
  /*user-select: none;*/
  box-sizing: border-box;
}

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.main {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 20px;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .main {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .main {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .main {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .main {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
}

.form__input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
}

.switch__circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch__circle--t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.switch__button {
  background-color: deepskyblue;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z200 {
  z-index: 200;
  transition: 1.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.code {
  width: 350px;
}

.code span {
  margin-left: 25px;
  cursor: pointer;
}

.code span:hover {
  color: #777e86;
}

.form__link {
  margin-top: 20px;
  cursor: pointer;
}

.form__link:hover {
  color: rgb(126, 128, 124);
}

.form__button:active {
  background: #b8bdbdc4;
}

.button:hover {
  cursor: pointer;
}
</style>