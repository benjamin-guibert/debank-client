import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import DBank from '../../contracts/DBank.json'

export interface DBankHandler {
  web3: Web3 | undefined
  contract: Contract | undefined
}

export const initializeContract = (web3: Web3, networkId: number): DBankHandler => {
  const network = (DBank.networks as { [id: string]: { address: string } })[networkId]
  const contract = new web3.eth.Contract(DBank.abi as AbiItem[], network.address)

  return {
    web3,
    contract,
  }
}

export const deposit = async (handler: DBankHandler, from: string, value: string): Promise<boolean> => {
  try {
    await handler.contract?.methods.deposit().send({ value: Web3.utils.toWei(value), from })
    return true
  } catch {
    return false
  }
}

export const withdraw = async (handler: DBankHandler, from: string): Promise<boolean> => {
  try {
    await handler.contract?.methods.withdraw().send({ from })
    return true
  } catch {
    return false
  }
}
