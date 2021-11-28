import { createContext, useRef, useState } from 'react'
import { MetaMaskHandler, connect, getAccount } from 'libraries/metamask'
import { DBankHandler, deposit, initializeContract, withdraw } from 'libraries/contracts/dBank'

export interface MetaMaskContextValue {
  networkId: number | undefined
  currentAccount: string | undefined
  connect: () => Promise<boolean>
  getAccount: () => Promise<string | undefined>
  deposit: (value: string) => Promise<boolean>
  withdraw: () => Promise<boolean>
}

export const useMetaMaskContext = (): MetaMaskContextValue => {
  const metaMaskHandlerRef = useRef<MetaMaskHandler>()
  const dBankHandlerRef = useRef<DBankHandler>()
  const [networkId, setNetworkId] = useState<number | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()

  const connectValue = async () => {
    metaMaskHandlerRef.current = await connect()
    if (!metaMaskHandlerRef.current) {
      return false
    }

    const { web3, networkId } = metaMaskHandlerRef.current
    dBankHandlerRef.current = initializeContract(web3, networkId)
    setNetworkId(metaMaskHandlerRef.current.networkId)
    return true
  }

  const getAccountValue = async () => {
    if (!metaMaskHandlerRef.current) {
      return undefined
    }

    const account = await getAccount(metaMaskHandlerRef.current)
    setCurrentAccount(account)

    return account
  }

  const depositValue = async (value: string) => {
    if (!dBankHandlerRef.current || !currentAccount) {
      return false
    }

    return await deposit(dBankHandlerRef.current, currentAccount, value)
  }

  const withdrawValue = async () => {
    if (!dBankHandlerRef.current || !currentAccount) {
      return false
    }

    return await withdraw(dBankHandlerRef.current, currentAccount)
  }

  return {
    networkId,
    currentAccount,
    connect: connectValue,
    getAccount: getAccountValue,
    deposit: depositValue,
    withdraw: withdrawValue,
  }
}

export const MetaMaskContext = createContext<MetaMaskContextValue>({
  networkId: undefined,
  currentAccount: undefined,
  connect: async () => false,
  getAccount: async () => undefined,
  deposit: async () => false,
  withdraw: async () => false,
})
