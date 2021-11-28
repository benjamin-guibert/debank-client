import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { provider } from 'web3-core'

export interface MetaMaskHandler {
  web3: Web3
  networkId: number
}

export const connect = async (): Promise<MetaMaskHandler | undefined> => {
  const provider = (await detectEthereumProvider()) as provider
  if (!provider) {
    return
  }

  const web3 = new Web3(provider)
  const networkId = await web3.eth.net.getId()

  return {
    web3,
    networkId,
  }
}

export const getAccount = async (handler: MetaMaskHandler): Promise<string | undefined> => {
  return (await handler.web3?.eth.getAccounts())?.[0]
}
