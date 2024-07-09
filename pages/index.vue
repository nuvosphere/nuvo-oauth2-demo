<template>
  <div id="page-index">
    <h4>Login Type</h4>

    <el-radio-group v-model="loginType">
      <el-radio value="popup">popup window</el-radio>
      <el-radio value="iframe">iframe</el-radio>
    </el-radio-group>

    <h1>Nuvo oauth2 SDK demo</h1>
    <el-button class="login" @click="login">Login or Signup</el-button>

    <!-- iframe -->
    <div id="Oauth2" v-show="showIframe" @click="showIframe = false">
      <iframe :src="network"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const loginType = ref('iframe')
const showIframe = ref(false)

const network =
  'https://oauth2.staging.nuvosphere.io?app_id=646da224e530a70013d94d8f&return_url=https://me.staging.nuvosphere.io'

const login = async () => {
  // const res = await axios({
  //   url: '/api/v1/oauth2/access_token',
  //   baseURL: 'https://api.staging.nuvosphere.io',
  //   params: {
  //     appid: '646da224e530a70013d94d8f',
  //     appkey: 'f57c91e92f2846f99db27aba641e7dfd',
  //     code,
  //   },
  // })
  // console.log('🌊', res)
  const type = loginType.value
  if (type === 'popup') {
    popupLogin()
  } else if (type === 'iframe') {
    showIframe.value = true
  }
}

const popupLogin = () => {
  const windowName = 'Nuvo oauth2 SDK'
  // 新窗口的宽度和高度
  const windowWidth = 480
  const windowHeight = 551

  // 计算屏幕居中位置
  const screenLeft = window.screenLeft || window.screenX
  const screenTop = window.screenTop || window.screenY
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height

  const left = screenWidth / 2 - windowWidth / 2 + screenLeft
  const top = screenHeight / 2 - windowHeight / 2 + screenTop

  // 配置新窗口的特性
  const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},menubar=no,toolbar=no,location=no,scrollbars=yes`

  // 使用 window.open 方法打开新的窗口
  const popup = window.open(network, windowName, windowFeatures)

  // 检查 popup 是否成功打开
  if (!popup) {
    alert('window.open 新窗口被浏览器阻止，请检查浏览器设置。')
  }
}
onMounted(() => {
  window.addEventListener('message', async (event) => {
    const url = new URL(network)
    if (event.origin === url.origin) {
      if (event.data === 'close') {
        showIframe.value = false
      } else if (event.data?.type === 'login-success') {
        const code = event.data.code
        console.log('🌊 Code', code)
      }
    }
  })
})
</script>

<style lang="scss">
#Oauth2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#Oauth2 iframe {
  border: none;
  border-radius: 20px;
  box-shadow: 0px 30px 56px 0px rgba(0, 0, 0, 0.35), 0px 4px 12px 0px rgba(0, 0, 0, 0.65);
  width: 480px;
  height: 551px;
}
</style>
