import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, savePayment, saveShipping } from '../../actions/cartActions';
import { useForm } from "react-hook-form";
import {PayPalButton} from 'react-paypal-button-v2';
import "../css/Order.css"
import { CgDanger } from "react-icons/cg"
import { GoTrashcan } from 'react-icons/go'
import { createOrder, resetOrder } from '../../actions/orderActions';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Axios from 'axios';
import { FiCheckSquare } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im"

export default function PlaceOrder_Page(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const orderCreate = useSelector((state) => state.orderCreate);
    const { success, order } = orderCreate;

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false)
    const [orderIsValidate, setOrderIsValidate] = useState(false);////// REMETTRE A FALSE

/* CARTITEMS */
    const cart = useSelector((state) => state.cart);
    const { cartItems, shipping, payment } = cart;

    const removeItemFromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    const cancelOrder = () => {
        console.log("Annuler la commande") ///////////////////
    }
/* ///////////////////////////// */
/* SHIPPING */
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        setOrderIsValidate(true)
        //console.log(data)
        dispatch(saveShipping({ address: data.address, city: data.city, postalCode: data.postalCode, country: data.country }));
        //dispatch(savePayment({ paymentMethod }))
    };
/* ///////////////////////////// */
/* ORDER */
    const totalItemsInCart = () => {
        return cartItems.reduce((total, cartItems) => {
            return total + (cartItems.price * cartItems.qty)
        }, 0).toFixed(2)
    }
    const numbItemsInCart = () => {
        return cartItems.reduce((total, cartItems) => {
        return total + (1 * cartItems.qty)
        }, 0)
    }
    const itemsNumb = numbItemsInCart();
    const tva = ((Number(totalItemsInCart()) / 120) * 20).toFixed(2);
    const shippingPrice = Number(totalItemsInCart()) > 50 ? 0 : 4.99;
    const total = ((Number(totalItemsInCart()) + Number(shippingPrice))).toFixed(2);
/* ///////////////////////////// */
/* PAIEMENT STRIPE */
    const stripe = useStripe();
    const element = useElements();
    const [isProcessingCard, setIsProcessingCard] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); 
    const [checkErrorMessage, setCheckErrorMessage] = useState('');

    const handlerErrors = (e) => {
        if (e.error) {
            return setCheckErrorMessage(e.error.message)
        }
        setCheckErrorMessage('');
    }
    
    const onSubmitCheckout = async (e) => {
        e.preventDefault();
        setIsProcessingCard(true);
        const amount = Number(total);

        try {
            
            //Got our client secret
            const paymentIntent = await Axios.post('/api/orders/checkout', { amount: amount * 100 })

            //Create PaymentMethod Object
            const paymentMethodObject = await stripe.createPaymentMethod({
                type: "card",
                card: element.getElement('cardNumber'),
                billing_details: {
                    name: "Youssef",
                }
            })

            //Confirm Payment Method
            const confirmPayment = await stripe.confirmCardPayment(paymentIntent.data, {
                payment_method: paymentMethodObject.paymentMethod.id
            })

            if (confirmPayment) {
                setIsProcessingCard(false);
                dispatch(createOrder({
                    orderItems: cartItems, 
                    shipping, 
                    payment : { paymentMethod : paymentMethod }, 
                    itemsNumb, 
                    tva, 
                    shippingPrice, 
                    total
                }))
                
                //setTimeout(() => props.history.push(`/envoyer-photos/${order._id}`), 4000)
            }
        } catch (error) {
            setIsProcessingCard(false);
        }
    }
/* ///////////////////////////// */
/* PAIEMENT PAYPAL */
    const [isProcessingPaypal, setIsProcessingPaypal] = useState(false);
    const [sdkReady, setSdkReady] = useState(false)

    const handleSuccessPayment = (paymentResult) => {
        dispatch(createOrder({
            orderItems: cartItems,
            shipping, 
            payment : { paymentMethod : paymentMethod }, 
            itemsNumb, 
            tva, 
            shippingPrice, 
            total
        }))
        
    }
    
    const setPayment = () => {
        setIsProcessingPaypal(true);
    }

    const cancelPayment = () => {
        setIsProcessingPaypal(false); 
    }
/* ///////////////////////////// */
    
    useEffect(() => {
        if (!userInfo) {
            props.history.push('/connexion?redirect=commande')
        }
        const addPaypalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}&disable-funding=credit,card`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true)
        }
        if (order) {
            if (Object.entries(order).length !== 0) {
                setTimeout(() => props.history.push(`/envoyer-photos/${order._id}`), 4000)
            }
        }
        if (success) {
            setModal(true)
        }
        return () => {
        }
    }, [userInfo, orderIsValidate, sdkReady, order, cartItems, success])

    return (
        <div className="checkout-page container">
            { modal ? 
                <div className="modal-background">
                    <div className="modal-test m-auto rounded d-flex flex-column justify-content-center align-items-center p-3">
                        <h3>Votre commande a bien été validée !</h3>
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center w-100"><FiCheckSquare size={60}/></div>
                        <p>Veuillez patienter, vous allez être redirigé...</p>
                    </div>
                </div>
                :
                null
            }
            <h2 className="text-left">Validation de la commande</h2>
            <div className="cart-resume row align-items-start p-5">
                <table className="table table-bordered text-left">
                    <thead>
                        <tr>
                            <th scope="col" ></th>
                            <th scope="col" >Produit</th>
                            <th scope="col" >Prix</th>
                            <th scope="col" >Quantité</th>
                            <th scope="col" >Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {                
                        cartItems.map((product) => (  
                            <tr key={product.cartItemId}>
                                <td className="text-danger"><GoTrashcan style={{cursor:"pointer"}} size={20} onClick={() => removeItemFromCart(product)}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}€</td>
                                <td>{product.qty}</td>
                                <td>{(product.price * product.qty).toFixed(2)}€</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="col-12 d-flex flex-column p-0">
                    <button className="py-3 text-uppercase btn btn-dark rounded-0 font-weight-light ml-auto">Poursuivre mes achats</button>
                </div>
            </div>
            <div className="order-content row mt-5">
                <div className="shipping-form col-7">
                    <form id="shipping-form" className="d-flex flex-column p-0" onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="text-left px-3 font-weight-light">Détails de livraison</h4>
                        <div className="input-group row">
                            <div className="col-8 d-flex flex-column my-2">
                                <label htmlFor="lastName" className="text-left">Nom <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.lastName ? "border-danger" : "")}
                                    defaultValue=""
                                    name="lastName"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.lastName && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre nom.</p></div>}
                            </div>
                            <div className="col-4 d-flex flex-column my-2">
                                <label htmlFor="firstName" className="text-left">Prénom <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.firstName ? "border-danger" : "")}
                                    defaultValue=""
                                    name="firstName"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.firstName && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre prénom.</p></div>}
                            </div>
                        </div>
                        <div className="input-group row">
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="address" className="text-left">Numéro et nom de rue <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.address ? "border-danger" : "")}
                                    defaultValue={ shipping.address ? shipping.address : ""}
                                    name="address"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.address && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre adresse.</p></div>}
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="addressDetails" className="text-left"></label>
                                <input
                                    className={"p-2 " + ( errors.addressDetails ? "border-danger" : "")}
                                    defaultValue=""
                                    name="addressDetails"
                                    placeholder="Appartement, bureau, etc. (optionnel) "
                                    ref={register}
                                />
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="postalCode" className="text-left">Code postal <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + (errors.postalCode ? "border-danger" : "")}
                                    defaultValue={ shipping.postalCode ? shipping.postalCode : ""}
                                    name="postalCode"
                                    type="number"
                                    ref={register({ required: true })}

                                />
                                {errors.postalCode && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de saisir votre code postal.</p></div>}
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="city" className="text-left">Ville <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.city ? "border-danger" : "")}
                                    defaultValue={ shipping.city ? shipping.city : ""}
                                    name="city"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.city && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre ville.</p></div>}
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="country" className="text-left">Ville <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.country ? "border-danger" : "")}
                                    defaultValue={ shipping.country ? shipping.country : ""}
                                    name="country"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.country && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre pays.</p></div>}
                            </div>
                        </div>
                        <div className="input-group row">
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="phone" className="text-left">Téléphone <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.phone ? "border-danger" : "")}
                                    defaultValue=""
                                    name="phone"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.phone && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre numéro de téléphone.</p></div>}
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="email" className="text-left">Adresse de messagerie <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.email ? "border-danger" : "")}
                                    defaultValue=""
                                    name="email"
                                    type="email"
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.email && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre adresse de messagerie.</p></div>}
                            </div>
                        </div>
  
                    </form>
                </div>        
                <div className="order-resume col-5">
                    <h4 className="text-left font-weight-light">Votre commande</h4>
                    <table className="table table-bordered text-left">
                        <thead>
                            <tr>
                                <th scope="col" >Produit{numbItemsInCart() > 1 ? "s" : ""} <span className="font-weight-light">({itemsNumb} articles)</span></th>
                                <th scope="col" >Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {                
                            cartItems.map((product) => (  
                                <tr className="table-product-row" key={product.cartItemId}>
                                    <td >{product.name} <span className="span-qty font-weight-bold">(x {product.qty})</span></td>
                                    <td >{product.price.toFixed(2)}€</td>
                                </tr>
                                ))
                            }

                            <tr>
                                <th scope="row">Sous-total</th>
                                <td>{Number(total - shippingPrice).toFixed(2)}€</td>
                            </tr>
                            <tr>
                                <th scope="row">Expédition</th>
                                <td>{shippingPrice.toFixed(2)}€</td>
                            </tr>
                            <tr>
                                <th className="table-total-th" scope="row">Total</th>
                                <td className="table-total-td font-weight-bold">{Number(total).toFixed(2)}€ <br/><span className="span-tva">(dont {Number(tva).toFixed(2)}€ TVA)</span></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="input-group row">
                        {
                        orderIsValidate &&
                        <div className="order-pay-div col-12 p-0">
                            <div onClick={() => setPaymentMethod("Paypal")} className="paypal-button-div d-flex align-items-center p-3">
                                <div className="paypal-icons d-flex align-items-center justify-content-around w-100">
                                    <h6 className="m-0 mr-auto">Paypal</h6>
                                    {
                                        isProcessingPaypal &&
                                        <div className="loading-spinner-div d-flex justify-content-center"><ImSpinner8 className="loading-spinner my-3" size={40} /></div>
                                    }
                                    {
                                    paymentMethod === "Paypal" &&      
                                        sdkReady &&
                                            <PayPalButton
                                                amount={total}
                                                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                onClick={() => setPayment()}
                                                onSuccess={handleSuccessPayment} 
                                                onCancel={cancelPayment}
                                            />        
                                    }
                                </div>
                            </div>
                            <div onClick={() => setPaymentMethod("Carte bancaire")} className="credit-card-button d-flex flex-column justify-content-center align-items-center p-3">
                                <div className="credit-card-icons d-flex align-items-center w-100">
                                    <h6 className="m-0 mr-auto">Carte bancaire</h6>
                                    <img src="../../../images/creditCards/mc.png"/>
                                    <img src="../../../images/creditCards/visa.png"/>
                                </div>
                                {
                                paymentMethod === "Carte bancaire" && 
                                    <div className="credit-card-input d-flex flex-wrap align-items-center justify-content-around my-3 w-100">
                                        <form className="d-flex flex-wrap align-items-center justify-content-center p-0 w-100" onSubmit={onSubmitCheckout}>
                                        <div className="col-12  ">
                                            <p className="mx-auto col-11 text-left px-0 mb-1">Numéro de carte 4242 4242 4242 4242<span className="text-danger">*</span></p>
                                                <CardNumberElement  
                                                className={"border col-11 p-2 bg-white mx-auto " + (!checkErrorMessage &&  "mb-4")}
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': {
                                                                fontWeight: "200",
                                                                color: '#aab7c4',
                                                            },
                                                        },
                                                        invalid: {
                                                            color: '#9e2146',
                                                        },
                                                    },
                                                }}
                                                onChange={handlerErrors}
                                                />
                                            {checkErrorMessage && <div className="d-flex align-items-center text-danger mb-3 my-1"><CgDanger  size={20}/><p className="m-0 ml-1">{checkErrorMessage}</p></div>}
                                        </div>
                                        <div className="d-flex col-12">
                                            <div className="d-flex flex-column col-6">
                                                <p className="text-left px-0 mb-1">Date d'expiration <span className="text-danger">*</span></p>
                                                    <CardExpiryElement
                                                    className="border col-12 p-2 mr-auto bg-white mb-3"
                                                    options={{
                                                        style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                    fontWeight: "200",
                                                                    color: '#aab7c4',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#9e2146',
                                                            },
                                                        },
                                                    }}
                                                    />
                                            </div>
                                            <div className="d-flex flex-column col-6">
                                                <p className="text-left px-0 mb-1">Cryptogramme visuel <span className="text-danger">*</span></p>
                                                    <CardCvcElement
                                                    className="border col-12 p-2 bg-white mb-3"
                                                    options={{
                                                        style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                    fontWeight: "200",
                                                                    color: '#aab7c4',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#9e2146',
                                                            },
                                                        },
                                                    }}
                                                    />
                                            </div> 
                                        </div>
                                        <div className="d-flex flex-column col-11">
                                            <button disabled={isProcessingCard} className="btn btn-dark rounded-0 col-12 my-3" type="submit">{!isProcessingCard ? "Payer" : "Paiement en cours..."}</button>
                                        </div> 
                                        {
                                            isProcessingCard &&
                                            <div className="loading-spinner-div d-flex justify-content-center col-12"><ImSpinner8 className="loading-spinner my-3" size={40} /></div>
                                        }
                                        </form>                                     
                                    </div>
                                }
                            </div>
                        </div>
                        }
                        <div className="col-12 d-flex flex-column p-0">
                            {
                            orderIsValidate ?
                            <button className="cancel-order-button py-3 mt-3 text-uppercase btn btn-outline-dark rounded-0 font-weight-light" onClick={() => cancelOrder()} >Annuler ma commande</button>
                            :
                            <button form="shipping-form" className="py-3 text-uppercase btn btn-dark rounded-0 font-weight-light" type="submit">Valider ma commande</button>
                            }
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )   
}
