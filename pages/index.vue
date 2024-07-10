<template>
  <div id="page-index">
    <h4>ETH Address: {{ userStore.address }}</h4>
    <h4>Access Token: {{ userStore.accessToken }}</h4>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  if (!userStore.address) {
    router.push('/login')
  }
})
</script>

<style lang="scss"></style>
