import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { removeFromCart, savePayment, saveShipping } from '../../actions/cartActions';
import { useForm } from "react-hook-form";
import "../css/Order.css"
import { CgDanger } from "react-icons/cg"
import { GoTrashcan } from 'react-icons/go'
import { createOrder } from '../../actions/orderActions';

export default function Order() {

    const dispatch = useDispatch();
    const [orderIsValidate, setOrderIsValidate] = useState(false);

    /* CARTITEMS */
    const cart = useSelector((state) => state.cart);
    const { cartItems, shipping, payment } = cart;

    const removeItemFromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    const cancelOrder = () => {
        console.log("Annuler la commande") ///////////////////
    }

    /* SHIPPING */
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        setOrderIsValidate(true)
        console.log(data)
        dispatch(saveShipping({ address: data.address, city: data.city, postalCode: data.postalCode, country: data.country }));
        //dispatch(savePayment({ paymentMethod }))
    };

    
    /* ORDER */
    const [paymentMethod, setPaymentMethod] = useState('Paypal');

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
    const total = (Number(totalItemsInCart()) + Number(shippingPrice)).toFixed(2);

    const paypal = () => {
/*         dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsNumb, tva, shippingPrice, total
        })) */
    }


    useEffect(() => {
        console.log(orderIsValidate)
        return () => {
        }
    }, [orderIsValidate, cartItems])

    return (
    
        <div className="checkout-page container">
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
                            <tr key={product._id}>
                                <td className="text-danger"><GoTrashcan style={{cursor:"pointer"}} size={20} onClick={() => removeItemFromCart(product)}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}€</td>
                                <td>{product.qty}</td>
                                <td>{product.price * product.qty}€</td>
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
                    <form id="shipping-form" className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
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
                                <tr className="table-product-row" key={product._id}>
                                    <td >{product.name} <span className="span-qty font-weight-bold">(x {product.qty})</span></td>
                                    <td >{product.price}€</td>
                                </tr>
                                ))
                            }

                            <tr>
                                <th scope="row">Sous-total</th>
                                <td>{total - shippingPrice}€</td>
                            </tr>
                            <tr>
                                <th scope="row">Expédition</th>
                                <td>{shippingPrice}€</td>
                            </tr>
                            <tr>
                                <th className="table-total-th" scope="row">Total</th>
                                <td className="table-total-td font-weight-bold">{total}€ <br/><span className="span-tva">(dont {tva}€ TVA)</span></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="input-group row">
                        {
                        orderIsValidate &&
                        <div className="order-pay-div col-12 p-0">
                            <div onClick={() => paypal()} className="paypal-button d-flex align-items-center p-3">Paypal</div>
                            <div className="credit-card-button d-flex align-items-center p-3">Carte bancaire</div>
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
