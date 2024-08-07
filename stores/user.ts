import { PolisClient, PolisProvider } from '@metis.io/middleware-client'
import { BrowserProvider, parseEther, formatEther, toBigInt } from 'ethers'

const getProvider = async (accessToken: string) => {
  const polisClient = new PolisClient({
    chainId: 1088,
    appId: '64ec797cf07153000129ca00',
    apiHost: 'https://api.nuvosphere.io/',
    oauthHost: 'https://oauth2.nuvosphere.io/',
    oauthPath: 'oauth2',
  })
  await polisClient.connect(accessToken, true)
  return polisClient.web3Provider
}

const toAddress = '0xC70AEF5Db0fC96E9B6c0c76A2F21206c24618932'
const toAmount = '0.001'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      address: '',
      accessToken: '',
      balance: '0',
    }
  },
  actions: {
    async sendNativeToken() {
      const tx = {
        to: toAddress,
        value: parseEther(toAmount).toString(),
      }
      const provider = await getProvider(this.accessToken)
      const signer = await provider.getSigner()
      try {
        // 发送交易
        console.log('🌊', tx)
        const response = await signer.sendTransaction(tx)
        console.log('Transaction hash:', response.hash)
        // 等待交易被确认
        const receipt = await response.wait()
        console.log('Transaction was confirmed in block:', receipt?.blockNumber)
      } catch (error) {
        console.log('tx error', error)
      }
    },
    async getBalance() {
      this.balance = '0'
      const fullLoading = ElLoading.service({ fullscreen: true, text: 'Get Balance' })
      const provider = await getProvider(this.accessToken)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const balance = await provider.getBalance(address)
      this.balance = formatEther(balance.toBigInt()).toString()
      fullLoading.close()
    },
  },
})
