import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetOrder } from '../../actions/orderActions'

export default function Upload_Page() {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(resetOrder())

	}, [])
	return (
		<div>
			Upload Page
		</div>
	)
}
