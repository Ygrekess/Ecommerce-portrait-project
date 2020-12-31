import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import '../css/PlaceOrder_Page.css'
import { createOrder } from '../../actions/orderActions';

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
            props.history.push("/order/" + order._id);
        }
        return () => {
            //
        }
    }, [success])



    return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
        <div className="placeorder">
                <div className="placeorder-info">

                <div>
                    <h3>Livraison</h3>
                        <div>
                            {shipping.address}, {shipping.city},
                            {shipping.postalCode}, {shipping.country},
                        </div>
                </div>
                <div>
                    <h3>Règlement</h3>
                        <div>Méthode de paiement : { payment.paymentMethod }</div>
                </div>         
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>Votre panier</h3>
                            <div>Price</div>
                        </li>
                        {
                        cartItems.length === 0 ?
                            <div>Votre panier est vide</div>
                            :
                            cartItems.map(item =>
                            <li key={item._id}>
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
                        <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Produit(s)</div>
                        <div>{itemsNumb}</div>
                    </li>
                    <li>
                        <div>Livraison</div>
                        <div>{shippingPrice}€</div>
                    </li>
                    <li>
                        <div>TVA</div>
                        <div>{tva}€</div>
                    </li>
                    <li>
                        <div>Total</div>
                        <div>${total}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}
