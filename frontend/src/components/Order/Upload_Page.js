import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder, resetOrder } from '../../actions/orderActions'
import { ImSpinner8 } from "react-icons/im"
import '../css/Upload_Page.css';
import Upload_Part from './components/Upload_Part';
import { resetCart } from '../../actions/cartActions';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { CgDanger } from 'react-icons/cg';
import { getInfos } from '../../actions/userActions';
import { Link } from 'react-router-dom';

export default function Upload_Page(props) {

	const orderDetails = useSelector(state => state.orderDetails);
	const { loading, order } = orderDetails;

	const [ orderPhotoToUpload, setOrderPhotoToUpload ] = useState(null)
	const [allUpload, setAllUpload] = useState(false)
	
	const dispatch = useDispatch();

	useEffect(() => {
		if (order) {
			setOrderPhotoToUpload(order.orderItems.filter( x => x.photoUpload === false))
		} else {
			dispatch(resetCart());
			dispatch(detailsOrder(props.match.params.id));
		}
		if (orderPhotoToUpload) {
			if (orderPhotoToUpload.length === 0) {
				setAllUpload(true)
			}
		}
		return () => {
			dispatch(resetOrder())
		}
	}, [orderPhotoToUpload])

	return ( loading ? <div className="loading-spinner-div d-flex justify-content-center"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :  
		<div className="upload-container py-2 container d-flex flex-column align-items-center mb-5">
			<div className="upload-advice d-flex w-100 align-items-around my-5 border-bottom pb-5">
				<div className="d-flex flex-column justify-content-center align-items-center col-8">
					<div className="bad-way-upload d-flex align-items-center justify-content-around pb-3">
						<div className="bad-way-photo">
							<img src="/photos-site/bad-portrait.png"></img>
						</div>
						<AiOutlineArrowRight size={60} className="cross"/>
						<ImCross size={40} className="sign-icon text-danger p-5" />
					</div>
					<div className="good-way-upload d-flex align-items-center justify-content-around">
						<div className="good-way-photo">
							<img src="/photos-site/good-portrait.png"></img>
						</div>
						<AiOutlineArrowRight size={60} className="cross"/>
						<TiTick size={140} className="sign-icon text-success p-3"/>
					</div>
				</div>
				<div className="advice-list text-left col-4 d-flex flex-column justify-content-center">
					<h3><CgDanger className="text-danger mr-1"/>Rappel</h3>
					<ul>
						<li>Evitez les photos sombres.</li>
						<li>Pas de photos floues.</li>
						<li>Tout votre visage doit être visible.</li>
					</ul>
				</div>
			</div>
			{
				order.orderItems.map((item, i) => (
					<Upload_Part order={order} key={i} item={item} orderId={order._id} userId={order.user}/>
				))
			}
			{
				allUpload ?
				<div className="d-flex justify-content-center">
					<Link to="/mon-compte/mes-commandes">Accéder à mon compte client.</Link>
				</div>					
					:
				<div className="d-flex justify-content-center">
					<Link to="/mon-compte/mes-commandes">Envoyer mes photos plus tard.</Link>
				</div>
			}
		</div>
	)
}
