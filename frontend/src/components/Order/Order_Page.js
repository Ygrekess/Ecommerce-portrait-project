import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {PayPalButton} from 'react-paypal-button-v2';
import '../css/PlaceOrder_Page.css'
import { detailsOrder, payOrder, resetPayOrder } from '../../actions/orderActions';
import Axios from 'axios';
import Cookie from 'js-cookie';
import { resetCart } from '../../actions/cartActions';


export default function Order_Page(props) {
    const dispatch = useDispatch()
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false)
    const [wantPay, setWantPay] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.payOrder);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

    useEffect(() => {
        console.log(order)
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
            dispatch(detailsOrder(orderId));
            dispatch(resetCart())
            props.history.push("/mon-compte/mes-commandes")
            dispatch(resetPayOrder())
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
            
        }
    }, [order, dispatch, sdkReady, successPay])

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const makePayment = () => {
        setWantPay(!wantPay);
    }

    return (loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
        <div className="container order-page">
            <h1>Votre commande <span className="numb-order">(n° {order._id})</span></h1>

            <div className={"placeorder-resume d-flex align-items-center mt-5 text-left " + (wantPay ? "justify-content-center" : "justify-content-between")}>
                { !wantPay ?
                <div className="placeorder-info rounded p-4 col-6">
                    <div className="border-bottom pb-3">
                        <h3>Livraison</h3>
                        <div>
                            {order.shipping.address}, <br />
                            {order.shipping.postalCode} {order.shipping.city}, {order.shipping.country}.
                        </div>
                    </div>
                    <div className="border-bottom py-3">
                        <h3>Règlement</h3>
                        <div>Méthode de paiement : {order.payment.paymentMethod}</div>
                    </div>         
                    <div className="py-3">
                        <div className="cart-list-container p-0">
                            <h3>Votre panier</h3>
                        </div>
                        <ul className="cart-list-container row flex-wrap p-0">
                            {
                            order.orderItems.length === 0 ?
                                <li>Votre panier est vide</li>
                                :
                                order.orderItems.map(item =>
                                <li className="col-3" key={item._id}>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product"/>
                                    </div>
                                    <div className="cart-name">
                                        <h5 className="mx-0 my-1 font-weight-bold">{item.name}</h5>
                                        <div>
                                            Qté : {item.qty}
                                        </div>
                                    </div>
                                    <div className="cart-price">{item.price}€</div>
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                    :
                null
                }    
                <div className={"placeorder-action d-flex flex-column align-items-start rounded justify-content-center p-4 " + (!wantPay ? "col-4" : "")}>
                    <h3>Résumé</h3>
                    <ul className="p-0">
                        <li>
                            <div>Statut : { !order.isPaid ? <span className="text-danger">Non payée</span> : <span className="text-success">Payée</span>}</div>
                        </li>
                        <li>
                            <div>Produit{order.itemsNumb > 1 ? "s" : ""} : <span className="numb-items">{order.itemsNumb}</span></div>
                        </li>
                        <li>
                            <div>Frais de livraison : <span className="shipping-price">{order.shippingPrice}€</span></div>
                        </li>
                        <li>
                            <div>TVA : <span className="tva-price">{order.taxPrice}€</span></div>
                        </li>
                        <li>
                            <div>Total : <br/>
                                <span className="total-price">{order.totalPrice}€</span>
                            </div>
                        </li>
                    </ul>
                    { wantPay ?                     
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            { !sdkReady ? <h5>Veuillez patienter...</h5> : 
                                <PayPalButton amount={order.totalPrice} onSuccess={handleSuccessPayment}/>
                            }
                            <button className="btn btn-outline-primary m-auto" onClick={() => makePayment()} >Annuler</button>
                        </div>
                        :
                        <button className="btn btn-primary m-auto" onClick={() => makePayment()} >Payer</button>
                    }
                </div>
            </div>
            
        </div>
    )
}
