import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import '../css/PlaceOrder_Page.css'
import { createOrder } from '../../../actions/orderActions';

export default function PlaceOrder_Page(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const dispatch = useDispatch()
    
    if (!shipping.address) {
        props.history.push("shipping")
    }
    if (!payment.paymentMethod) {
        props.history.push("payment")
    }

    const totalCartPrice = () => {
        return cartItems.reduce((total, cartItems) => {
            return total + (cartItems.price * cartItems.qty)
        }, 0).toFixed(2)
    }
    const numbItemsCart = () => {
        return cartItems.reduce((total, cartItems) => {
            return total + (1 * cartItems.qty)
        }, 0)
    }
    const itemsNumb = numbItemsCart();
    const tva = ((Number(totalCartPrice()) / 120) * 20).toFixed(2);
    const shippingPrice = Number(totalCartPrice()) > 50 ? 0 : 4.99;
    const total = (Number(totalCartPrice()) + Number(shippingPrice)).toFixed(2);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsNumb, tva, shippingPrice, total
        }))
    }
    
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
        }
        return () => {
            //
        }
    }, [success])



    return (
    <div className="container placeorder-page">
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
        <div className="placeorder-resume d-flex justify-content-between align-items-center mt-5 text-left">
            <div className="placeorder-info col-6">
                <div className="border-bottom pb-3">
                    <h3>Livraison</h3>
                    <div>
                        {shipping.address}, <br />
                        {shipping.postalCode} {shipping.city}, {shipping.country}.
                    </div>
                </div>
                <div className="border-bottom py-3">
                    <h3>Règlement</h3>
                    <div>Méthode de paiement : { payment.paymentMethod }</div>
                </div>         
                <div className="py-3">
                    <div className="cart-list-container p-0">
                        <h3>Votre panier</h3>
                    </div>
                    <ul className="cart-list-container row flex-wrap p-0">
                        {
                        cartItems.length === 0 ?
                            <li>Votre panier est vide</li>
                            :
                            cartItems.map(item =>
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
            <div className="placeorder-action col-4 d-flex flex-column align-items-start justify-content-center pl-5">
                <h3>Votre commande</h3>
                <ul className="p-0">
                    <li>
                        <div>Produit{itemsNumb > 1 ? "s" : ""} : <span className="numb-items">{itemsNumb}</span></div>
                    </li>
                    <li>
                        <div>Frais de livraison : <span className="shipping-price">{shippingPrice}€</span></div>
                    </li>
                    <li>
                        <div>TVA : <span className="tva-price">{tva}€</span></div>
                    </li>
                    <li>
                        <div>Total : <br/>
                            <span className="total-price">{total}€</span>
                        </div>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={placeOrderHandler} >Valider</button>
            </div>
        </div>
    </div>
    )
}
