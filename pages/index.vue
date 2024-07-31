<template>
  <div id="page-index">
    <el-button type="danger" @click="disconnect">Disconnect</el-button>

    <h4>ETH Address: {{ userStore.address }}</h4>
    <h4>Access Token: {{ userStore.accessToken }}</h4>

    <div>
      <el-button @click="userStore.getBalance">Get Balance</el-button>
      <el-button @click="userStore.sendNativeToken">Send Metis</el-button>
    </div>
    <br />
    <span> Balance: {{ userStore.balance }} METIS </span>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const { loginCallback } = useLogin()
const disconnect = () => {
  localStorage.removeItem('accessToken')
  router.push('/login')
}
onMounted(() => {
  const code = route.query.code as string
  if (code) {
    loginCallback(code)
  } else if (!userStore.address) {
    router.push('/login')
  }
})
</script>

<style lang="scss"></style>
