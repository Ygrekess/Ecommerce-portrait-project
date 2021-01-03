import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {PayPalButton} from 'react-paypal-button-v2';
import '../css/PlaceOrder_Page.css'
import { detailsOrder, payOrder } from '../../../actions/orderActions';
import Axios from 'axios';
import { resetCart } from '../../../actions/cartActions';
import { ImSpinner8 } from "react-icons/im"
import {FiCheckSquare} from "react-icons/fi"

export default function Order_Page(props) {

    const orderId = props.match.params.id;
    const [modal, setModal] = useState(false)
    const [sdkReady, setSdkReady] = useState(false)
    const [wait, setWait] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.payOrder);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

    const dispatch = useDispatch()

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
            dispatch(resetCart())
            displayModal();
            setTimeout(() => props.history.push("/mon-compte/mes-commandes"), 3000) 
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

    }, [order, sdkReady, successPay, wait])

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const setPayment = () => {
        setWait(true)
    }

    const cancelPayment = () => {
        setWait(false)  
    }

    const displayModal = () => {
        setModal(!modal);
    }

    return (loading ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60} /></div> : error ? <div>{error}</div> :
        <div className="container order-page">
            { modal ? 
                <div className="modal-background">
                    <div className="modal-test m-auto rounded d-flex flex-column justify-content-center align-items-center p-3">
                        <h3>Votre commande a bien été validée !</h3>
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center w-100"><FiCheckSquare size={60}/></div>
                        <p>Veuillez patienter, vous allez être redirigé.</p>
                    </div>
                </div>
                :
                null
            }
            { !successPay ?
            <div className={"placeorder-resume d-flex align-items-center mt-5 text-left justify-content-between"}>
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
                <div className={"placeorder-action d-flex flex-column align-items-start rounded justify-content-center p-4 col-4"}>
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
                    <div className="d-flex flex-column align-items-center justify-content-center w-100">
                        { !sdkReady ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> : 
                            <PayPalButton onClick={() => setPayment()} amount={order.totalPrice} onSuccess={handleSuccessPayment} onCancel={cancelPayment} />
                        }
                        { wait && <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div>}
                    </div>
                </div>
            </div>
                :
            null
            }
        </div>
    )
}
