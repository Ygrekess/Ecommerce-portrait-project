import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recupUserOrders, resetOrder } from '../../actions/orderActions';
import { ImSpinner8 } from 'react-icons/im';

export default function Upload_Photo() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch()
	const userOrders = useSelector(state => state.userOrders)
    const { loading, orders, error } = userOrders;

	useEffect(() => {
		if (orders) {
			console.log(orders)
		}
        dispatch(resetOrder());
        dispatch(recupUserOrders(userInfo._id));
        return () => {
        }
	}, [])
	
    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
		<div className="col-8">
			{
				orders.map((order, i) => {
					return order.orderItems.map(orderItem => orderItem.photoUpload === false ? 
						<div>{order._id} - {orderItem.name} - En attente</div> : "")
				})
			}
		</div>
	)
}
