import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner8 } from 'react-icons/im';
import Upload_Part from '../Order/components/Upload_Part';

export default function Upload_Photo() {

    const userInfos = useSelector(state => state.userInfos);
	const { loading, userDetails, userOrders } = userInfos;
	
	const [photoToUpload, setPhotoToUpload] = useState(0);

    const dispatch = useDispatch()

	useEffect(() => {
		userOrders.map((order, i) => (
			order.orderItems.map((item, i) => !item.photoUpload ? 
				setPhotoToUpload(photoToUpload + 1)
				:
				null
			)
		))
		return () => {
		}
	}, [])
	
    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100 h-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
		<div className="col-md-8 col-12 h-100 m-auto">
			{ photoToUpload > 0 ?
            <div className="d-flex flex-column justify-content-start col-12">
                <h4 className="text-left font-weight-light">Envoyer mes photos</h4>
                <div className={" mt-2"}>{/* user-orders-container */}
				{
				userOrders.map((order, i) => (
					order.orderItems.map((item, i) => !item.photoUpload ? 
						<Upload_Part key={i} item={item} order={order} orderId={order._id} userId={order.user}/>
						:
						null
					)
				))
				}
				</div>
			</div>
			:
			<div className="d-flex align-items-center justify-content-center h-100">
				<h4 className="text-center font-weight-light">Vous n'avez aucune photo à nous transmettre.</h4>
			</div>
			}
		</div>
	)
}
