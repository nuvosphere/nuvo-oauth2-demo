import { PolisProvider } from '@metis.io/middleware-client'
import { Contract, ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils'

const getProvider = (accessToken: string) => {
  const polisProvider = new PolisProvider({
    apiHost: 'https://api.staging.nuvosphere.io/',
    token: accessToken,
    chainId: 59902,
  })
  const provider = new ethers.providers.Web3Provider(polisProvider)
  return provider
}

const toAddress = '0xC70AEF5Db0fC96E9B6c0c76A2F21206c24618932'
const toAmount = '0.01'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      address: '',
      accessToken: '',
    }
  },
  actions: {
    async sendNativeToken() {
      const fullLoading = ElLoading.service({ fullscreen: true })
      const tx = {
        to: toAddress,
        value: parseEther(toAmount).toString(),
      }
      const provider = getProvider(this.accessToken)
      const signer = provider.getSigner()
      try {
        // 发送交易
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
    async sendERC20Token() {
      const fullLoading = ElLoading.service({ fullscreen: true })
      const provider = getProvider(this.accessToken)
      // ERC20 Token 合约地址
      const contractAddress = '0xAa0149B513f4b2a04998bb0E4fEA9463a7b51C74'
      // ERC20 合约接口
      const erc20Abi = [
        'function transfer(address to, uint amount) public returns (bool)',
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
      ]
      const signer = provider.getSigner()

      // 获取代币合约实例
      const contract = new Contract(contractAddress, erc20Abi, signer)
      // 发送代币
      try {
        // 获取 token 的 decimals
        const decimals = await contract.decimals()
        console.log('Token Decimals:', decimals)

        // 获取余额
        const balance = await contract.balanceOf(this.address)
        const formattedBalance = ethers.utils.formatUnits(balance, decimals)
        console.log('Formatted Balance:', Number(formattedBalance))

        // 估算 gas 费用
        const gasLimit = await contract.estimateGas.transfer(
          toAddress,
          parseUnits(toAmount, decimals),
        )
        console.log('Gas Limit:', gasLimit.toString())

        // 获取当前 gas price
        const gasPrice = await provider.getGasPrice()
        console.log('Gas Price:', gasPrice.toString())

        // 发送交易
        const response = await contract.transfer(toAddress, parseUnits(toAmount, decimals), {
          gasLimit,
          gasPrice,
        })
        console.log('Transaction hash:', response.hash)
        // 等待交易被确认
        const receipt = await response.wait()
        console.log('Transaction was confirmed in block:', receipt?.blockNumber)
      } catch (error) {
        console.log('tx error', error)
      }
      fullLoading.close()
    },
  },
})
