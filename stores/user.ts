import { PolisClient } from '@metis.io/middleware-client'
import { parseEther, formatEther } from 'ethers'

const getProvider = async (accessToken: string) => {
  const polisClient = new PolisClient({
    chainId: 59902,
    appId: '66b13e5b6feb840014f0568d',
    apiHost: 'https://api.staging.nuvosphere.io',
    oauthHost: 'https://oauth2.staging.nuvosphere.io/',
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
      const fullLoading = ElLoading.service({ fullscreen: true, text: 'Send Native Token' })
      const tx = {
        to: toAddress,
        value: parseEther(toAmount).toString(),
      }
      try {
        const provider = await getProvider(this.accessToken)
        const signer = provider.getSigner()
        // 发送交易
        console.log('tx', tx)
        const response = await signer.sendTransaction(tx)
        console.log('Transaction hash:', response.hash)
        // 等待交易被确认
        const receipt = await response.wait()
        console.log('Transaction was confirmed in block:', receipt?.blockNumber)
      } catch (error) {
        console.log('tx error', error)
      }
      fullLoading.close()
    },
    async getBalance() {
      const fullLoading = ElLoading.service({ fullscreen: true, text: 'Get Balance' })
      try {
        this.balance = '0'
        const provider = await getProvider(this.accessToken)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const balance = await provider.getBalance(address)
        this.balance = formatEther(balance.toBigInt()).toString()
      } catch (error) {
        console.log('get balance error', error)
      }
      fullLoading.close()
    },
  },
})
