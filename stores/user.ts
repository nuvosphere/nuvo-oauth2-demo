export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      address: '',
      accessToken: '',
    }
  },
})
