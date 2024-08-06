import axios from 'axios'

export const useLogin = () => {
  const loginType = ref('iframe')
  const oauth2Host = ref('http://localhost:1025/')
  const showIframe = ref(false)

  const app_id = '66b13e5b6feb840014f0568d'
  const app_key = '3a19878f8e2b40749a38a24e172f5104'
  const return_url = 'http://localhost:3000'
  const network = computed(() => {
    return `${oauth2Host.value}?app_id=${app_id}&return_url=${return_url}`
  })

  const login = async () => {
    const type = loginType.value
    if (type === 'popup') {
      popupLogin()
    } else if (type === 'open') {
      location.href = network.value
    } else if (type === 'iframe') {
      showIframe.value = true
    }
  }

  const userStore = useUserStore()
  const router = useRouter()
  const init = async (accessToken: string) => {
    const { data: res } = await axios({
      baseURL: 'https://api.staging.nuvosphere.io',
      url: '/api/v1/oauth2/nft/my-profile',
      params: { chainid: 59902 },
      headers: { 'Access-Token': accessToken },
    })
    if (res.code === 200) {
      userStore.address = res.data.eth_address
      userStore.accessToken = accessToken
      router.replace('/')
    }
  }

  const loginCallback = async (code: string) => {
    const { data: res } = await axios({
      baseURL: 'https://api.staging.nuvosphere.io',
      url: '/api/v1/oauth2/access_token',
      params: {
        appid: app_id,
        appkey: app_key,
        code,
      },
    })
    const accessToken = res?.data?.accessToken
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      init(accessToken)
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
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight || screen.height

    const left = screenWidth / 2 - windowWidth / 2 + screenLeft
    const top = screenHeight / 2 - windowHeight / 2 + screenTop

    // 配置新窗口的特性
    const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},menubar=no,toolbar=no,location=no,scrollbars=yes`

    // 使用 window.open 方法打开新的窗口
    const popup = window.open(network.value, windowName, windowFeatures)

    // 检查 popup 是否成功打开
    if (!popup) {
      alert('window.open 新窗口被浏览器阻止，请检查浏览器设置。')
    }
  }

  return {
    init,
    login,
    loginCallback,
    oauth2Host,
    network,
    showIframe,
    loginType,
  }
}
