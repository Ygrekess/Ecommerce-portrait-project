import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';

export default function Cart() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
        
    const totalCart = () => {
        return cartItems.reduce((total, cartItems) => {
            return total + (cartItems.price * cartItems.qty)
        }, 0).toFixed(2)
    }

    const numbItemsCart = () => {
        return cartItems.reduce((total, cartItems) => {
        return total + (1 * cartItems.qty)
        }, 0)
    }
    
    const tva = ((Number(totalCart()) / 120) * 20).toFixed(2);
    const shipping = Number(totalCart()) > 50 ? 0 : 4.99;
    const total = (Number(totalCart()) + Number(shipping)).toFixed(2);
    
    useEffect(() => {
        return () => {
        //
        }
    }, [cartItems])

    return (
        <div className="cart-component row flex-column position-fixed align-items-center p-0">
        <h3 className="cart-title m-0 mt-2 font-weight-normal col-12 text-left">Votre panier <span>({numbItemsCart()} article{numbItemsCart() > 1 ? "s" : ""})</span></h3>
        {
            cartItems.length > 0 ?
            <div className="col-12 p-0">
                <div className="px-4 mt-2 mb-3">
                    {                
                        cartItems.map((product) => (    
                        <CartItems product={product} key={product._id}/>
                        ))
                    }
                </div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">TVA : </span>{ tva }€</h4></div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">Livraison : </span>{ shipping }€</h4></div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">Total : </span>{ total }€ TTC</h4></div>
                <div className="my-3 cart-total col-12"><Link to="/connexion?redirect=shipping" className="btn btn-dark text-white my-3">Valider mon panier</Link></div>
            </div>
            :
            <h4 className="empty-cart col-12 m-0 my-5 font-weight-light text-center">Votre panier est vide.</h4>
        }
        </div>
    )
}
