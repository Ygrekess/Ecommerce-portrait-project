import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {PayPalButton} from 'react-paypal-button-v2';
import '../css/PlaceOrder_Page.css'
import { detailsOrder, payOrder } from '../../actions/orderActions';
import Axios from 'axios';

export default function Order_Page(props) {
    const dispatch = useDispatch()
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.payOrder);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await Axios.get('http://localhost:5000/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }
        if (successPay) {
            props.history.push("/");
        }
        if (!order) {
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true)
                }
            }
        }
        return () => {
            //
        }
    }, [dispatch, order, orderId, sdkReady, successPay])

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    return loading ? <div>Loading ...</div> : error ? <div>{error}</div> : (
        <div>
            <h1>Commande {order._id}</h1>
            <div className="placeorder d-flex justify-content-around align-items-center">
                <div className="placeorder-info">
                <div>
                    <h3>Livraison</h3>
                    <div>
                        {order.shipping.address}, {order.shipping.city},
                        {order.shipping.postalCode}, {order.shipping.country},
                    </div>
                </div>
                <div>
                    <h3>Règlement</h3>
                    <div>Méthode de paiement : {order.payment.paymentMethod}</div>
                    { !order.isPaid ? <div className="alert alert-danger m-auto">À payer</div> : <div className="alert alert-success">Payée</div>}
                </div>         
                <div>
                    <ul className="row cart-list-container">
                        <li className="col-12">
                            <h3>Votre panier</h3>
                        </li>
                        {
                        order.orderItems.length === 0 ?
                            <div>Votre panier est vide</div>
                                    :
                            
                            order.orderItems.map(item =>
                            <li className="col-6" key={item._id}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product"/>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Quantité: {item.qty}
                                    </div>
                                </div>
                                <div className="cart-price">{item.price}€</div>
                            </li>
                            )
                        }
                    </ul>
                </div>
            </div>       
            <div className="placeorder-action">
                <ul>
                    <li>
                        <h3>Résumé de votre commande</h3>
                    </li>
                    <li>
                        <div>Produit(s)</div>
                        <div>{order.itemsNumb}</div>
                    </li>
                    <li>
                        <div>Frais de livraison</div>
                        <div>{order.shippingPrice}€</div>
                    </li>
                    <li>
                        <div>TVA</div>
                        <div>{order.taxPrice}€</div>
                    </li>
                    <li>
                        <div>Total</div>
                        <div>${order.totalPrice}</div>
                    </li>
                    {
                        !order.isPaid && (
                            <li>
                                { !sdkReady ? <h5>Veuillez patienter...</h5> : 
                                    <PayPalButton amount={order.totalPrice} onSuccess={handleSuccessPayment}/>
                                }
                            </li>   
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
    )
}
