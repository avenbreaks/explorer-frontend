import { ethers } from 'ethers'
import { ReactNode } from 'react'

export type TokenType = {
	address: string
	balance: string
	decimals: number
	symbol: string
	token?: string
	contract: string
	name: string
	idx: number
	index: number
	totalSupply: number
}
export type OverallBalanceProps = {
	addressBalance: string | number
}

export interface TabsProps {
	lastCardRef?: any
	selectedToken: TokenType | null
	transactionType?: string
	data: any
	onClick: any
	setTransactionType: any
}

export type TransactionProps = {
	txHash: string
	method: string
	from: string
	to: string
	date: number
	block: number
	amount: any
	token: string | undefined
	txFee: any
}

export interface ExplorerTxType {
	hash: any
	type: any
	from: string | any[]
	to: string | any[]
	timestamp: number
	blockNumber: any
	value: { wei: ethers.BigNumberish }
	gasCost: { wei: any }
}
export interface AddressBlockProps {
	txhash: string | number
	method: string | number
	from: string | number
	symbol?: string | null
	lastCardRef?: any
	to: string | number
	date: string | number
	block: string | any
	amount: any
	txfee: any
	token: any
	methodFilters?: any
	setTransactionType?: any
	onClick?: any
	isLatest?: boolean
}

export type PropsWithChildren<P> = P & { children?: ReactNode | undefined }
