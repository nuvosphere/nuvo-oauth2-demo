<template>
  <div id="page-index">
    <h4>Login Type</h4>
    <el-radio-group v-model="loginType">
      <el-radio value="open">open url</el-radio>
      <el-radio value="popup">popup window</el-radio>
      <el-radio value="iframe">iframe</el-radio>
    </el-radio-group>
    <h4>Network</h4>
    <el-radio-group v-model="oauth2Host">
      <!-- <el-radio value="https://oauth2.nuvosphere.io/nuvo-login">mainnet</el-radio> -->
      <el-radio value="https://oauth2.staging.nuvosphere.io/nuvo-login/">
        https://oauth2.staging.nuvosphere.io/nuvo-login/
      </el-radio>
      <el-radio value="http://localhost:1025/nuvo-login/">
        http://localhost:1025/nuvo-login/
      </el-radio>
    </el-radio-group>

    <h1>Nuvo oauth2 SDK demo</h1>
    <el-button @click="login">Login or Signup</el-button>

    <div id="Oauth2" v-show="showIframe" @click="showIframe = false">
      <iframe :src="network"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
const { init, login, loginCallback, loginType, network, showIframe, oauth2Host } = useLogin()

onMounted(() => {
  window.addEventListener('message', async (event) => {
    const url = new URL(network.value)
    if (event.origin === url.origin) {
      if (event.data === 'close') {
        showIframe.value = false
      } else if (event.data?.type === 'login-success') {
        const code = event.data.code
        loginCallback(code)
      }
    }
  })

  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    init(accessToken)
  }
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
  width: 582px;
  height: 602px;
}
</style>
