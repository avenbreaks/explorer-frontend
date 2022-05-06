import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { AddressBlockProps } from 'pages/Addresses/AddressDetails/address-details.interface'
import React, { useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { TParams } from '../../types'

const AddressBlock: React.FC<AddressBlockProps> = ({
	txhash,
	method,
	from,
	to,
	date,
	block,
	amount,
	txfee,
	token,
	methodFilters,
	setTransactionType,
}) => {
	const [isShow, setIsShow] = useState(false)
	const { address }: TParams = useParams()
	const methodRef = useRef(null)

	useOnClickOutside(methodRef, () => setIsShow(false))

	const isTxHash =
		txhash === null ? null : (
			<div className="addressDetails__thead-td">{txhash}</div>
		)
	const isMethod =
		method === null ? null : (
			<div ref={methodRef} className="addressDetails__thead-td">
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontWeight: 700,
						fontSize: '0.86rem',
						lineHeight: '1.77em',
					}}
					// onClick={() => setIsShow(true)}
				>
					{method}
					{/* <ArrowDown /> */}
				</div>
				<div ref={methodRef} className="methodModal__table">
					{isShow &&
						methodFilters.map((filter: { title: string; value: number }) => (
							<NavLink
								key={filter.title}
								to={`/addresses/${address}/${filter.value}`}
								tabIndex={-1}
								className="methodModal__link"
								onClick={() => setTransactionType(filter.value)}
							>
								{filter.title}
							</NavLink>
						))}
				</div>
			</div>
		)
	const isFrom =
		from === null ? null : (
			<div className="addressDetails__thead-td">{from}</div>
		)
	const isTo =
		to === null ? null : <div className="addressDetails__thead-td">{to}</div>
	const isDate =
		date === null ? null : (
			<div className="addressDetails__thead-td">{date}</div>
		)
	const isBlock =
		block === null ? null : (
			<div className="addressDetails__thead-td">{block}</div>
		)
	const isAmount =
		amount === null ? null : (
			<div className="addressDetails__thead-td">{amount}</div>
		)
	const isTxFee =
		txfee === null ? null : (
			<div className="addressDetails__thead-td">{txfee}</div>
		)
	const isToken =
		token === null ? null : (
			<div className="addressDetails__thead-td">
				{token && token[0].toUpperCase() + token.slice(1)}
			</div>
		)

	return (
		<>
			{isTxHash}
			{isMethod}
			{isFrom}
			{isTo}
			{isDate}
			{isBlock}
			{isAmount}
			{isTxFee}
			{isToken}
		</>
	)
}

export default AddressBlock
