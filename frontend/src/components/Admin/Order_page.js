import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../../actions/orderActions'
import { ImSpinner8 } from "react-icons/im"

export default function Order_page(props) {

	const orderDetails = useSelector(state => state.orderDetails)
	const { loading, order } = orderDetails;

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(detailsOrder(props.match.params.id))
		return () => {
		}
	}, [])

	return (
		<div className="col-8">
			{
			loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
			<Fragment>
				<div className="d-flex justify-content-between w-100">
					<h4 className="text-left mb-5">Commande - { order._id}</h4>
					<button className="btn btn-outline-warning mb-auto">Télécharger</button>					
				</div>
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Détails de commande</h6>
					<table>
					<tbody className="text-left">
						<tr>
							<td>Date de commande : {order.created_at.split('T')[0]}</td>
						</tr>
						<tr>
							<td>N° de commande : {order._id}</td>
						</tr>
						<tr>
							<td>Total de la commande : EUR {order.totalPrice} ({order.itemsNumb} article{order.itemsNumb>1 && "s"})</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Produit{order.itemsNumb>1 && "s"}</h6>
					<div className="order-items-container d-flex flex-column flex-wrap">
					{
						order.orderItems.map((item, i) => (
							<Fragment key={i}>
							<div className="order-item col-5 d-flex align-items-center m-2 p-2">
								<div className="order-item-img">
									<img src={item.image} />
								</div>
								<div className="col-7 order-item-infos d-flex flex-column justify-content-center text-left ml-3">
									<h4 className="m-0">{item.name}</h4>
									<p className="order-item-facenumber m-1">{item.faceNumber} pers.</p>
									<p className="order-item-qty m-1">Quantité : {item.qty}</p>
									<p className="order-item-price m-1">Prix : {item.price}€</p>
								</div>
							</div>
							<div className="d-flex">
							{item.photo.map((photo, k) => (
							<div key={k} className="item-photos col-2 d-flex p-3">
								<div className="item-photos-img">
									<img src={`/orders/order-${order._id}/${item.name}-${item.cartItemId}/${photo}`} />
								</div>
							</div>
							))}
							</div>
							</Fragment>
						))
					}
					</div>
				</div>
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Adresse de livraison</h6>
					<table>
					<tbody className="text-left">
						<tr>
							<td>{order.shipping.address}</td>
						</tr>
						<tr>
							<td>{order.shipping.postalCode}, {order.shipping.city}</td>
						</tr>
						<tr>
							<td>{order.shipping.country}</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Adresse de facturation</h6>
					<table>
					<tbody className="text-left">
						<tr>
							<td>{order.shipping.address}</td>
						</tr>
						<tr>
							<td>{order.shipping.postalCode}, {order.shipping.city}</td>
						</tr>
						<tr>
							<td>{order.shipping.country}</td>
						</tr>
					</tbody>
					</table>
				</div>		
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Information sur le paiement</h6>
					<table>
					<tbody className="text-left">
						<tr>
							<td>Moyen de paiement : {order.payment.paymentMethod}</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div className="border-bottom py-4">
					<h6 className="text-left mb-3">Récapitulatif de commande</h6>
					<table>
					<tbody className="text-left">
						<tr>
							<td>Nombre d'article{order.itemsNumb > 1 && "s"} : {order.itemsNumb}</td>
						</tr>
						<tr>
							<td>Frais de livraison : EUR {order.shippingPrice}</td>
						</tr>
						<tr>
							<td>TVA : EUR {order.taxPrice}</td>
						</tr>
						<tr>
							<td className="font-weight-bold">Total : EUR {order.totalPrice}</td>
						</tr>
					</tbody>
					</table>
				</div>	
	
			</Fragment>
			}
		</div>
	)
}
