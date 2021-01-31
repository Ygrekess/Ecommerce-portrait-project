import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, addToCart, setQty } from '../../actions/cartActions'
import { IoMdAdd } from "react-icons/io"
import { BiMinus } from "react-icons/bi"
import { GoTrashcan } from 'react-icons/go'
import '../css/Cart.css'

export default function Cart({isVisible, setIsVisible}) {

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shipping, payment, cookieItems} = cart;
        
    const totalCart = () => {
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
    const tva = ((Number(totalCart()) / 120) * 20).toFixed(2);
    const shippingPrice = Number(totalCart()) > 50 ? 0 : 4.99;
    const total = (Number(totalCart()) + Number(shippingPrice)).toFixed(2);

    useEffect(() => {
        return () => {
        }
    }, [])

    const removeCartItem = (product) => {
        dispatch(removeFromCart(product))
    }

    return (
        <div className="cart-component row flex-column align-items-center p-0">
            <h3 className="cart-title px-2 m-0 my-2 font-weight-normal col-12 text-left">Votre panier <span>({numbItemsInCart()} article{numbItemsInCart() > 1 ? "s" : ""})</span></h3>
            {
            cartItems.length > 0 ?
            <Fragment>
            <table className="table table-bordered text-left m-0">
                <thead>
                    <tr>
                        <th scope="col">Produit{numbItemsInCart() > 1 ? "s" : ""} <span className="font-weight-light">({itemsNumb} article{numbItemsInCart() > 1 ? "s" : ""})</span></th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {                
                    cartItems.map((product) => ( 
                        product.qty > 0 &&
                        <tr className="table-product-row" key={product.cartItemId}>
                            <td className="cart-product-row d-flex align-items-center justify-content-around">
                                <div className='cart-product-name'>
                                    <Link to={`/modele/${product.slug}/${product.person}-pers`} className="text-left text-uppercase">{product.name}
                                        <span className="font-weight-light text-lowercase"><br/>- {product.person} pers.</span>
                                    </Link >
                                </div>
                                <span className="span-qty font-weight-bold">(x {product.qty})</span>
                                <div className="cart-product-qty d-flex justify-content-around align-items-center p-0">
                                    <IoMdAdd size={40} className="add-icon" onClick={() => dispatch(setQty(product.cartItemId, 1))}/>
                                    <BiMinus size={40} className="minus-icon" onClick={() => dispatch(setQty(product.cartItemId, -1))}/>
                                </div>
                            </td>
                            <td className="p-0 text-center">
                                <span>{product.price}€</span>
                                <GoTrashcan size={22} className="icon-close ml-3" onClick={() => removeCartItem(product)} />
                            </td>
                        </tr>
                        ))
                    }

                    <tr>
                        <th scope="row">Sous-total</th>
                        <td>{Number(total - shippingPrice).toFixed(2)}€</td>
                    </tr>
                    <tr>
                        <th scope="row">Expédition</th>
                        <td>{Number(shippingPrice).toFixed(2)}€</td>
                    </tr>
                    <tr>
                        <th className="table-total-th" scope="row">Total</th>
                        <td className="table-total-td font-weight-bold">{Number(total).toFixed(2)}€ <br/><span className="span-tva">(dont {tva}€ TVA)</span></td>
                    </tr>
                </tbody>
            </table>     
            <div className="cart-total col-12 p-0"><Link  to="/connexion?redirect=commande" onClick={() => setIsVisible(!isVisible)} className="btn btn-dark border-0 text-white rounded-0 p-3 text-uppercase col-12">Valider mon panier</Link></div>
            </Fragment>
            :
            <h4 className="empty-cart col-12 m-0 my-5 font-weight-light text-center">Votre panier est vide.</h4>
        } 











{/*         {
            cartItems.length > 0 ?
            <div className="col-12 p-0">
                <div className="cart-item-container p-0 mt-2 mb-3">
                    {                
                        cartItems.map((product) => (    
                        <CartItems product={product} key={product._id}/>
                        ))
                    }
                </div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">TVA : </span>{ tva }€</h4></div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">Livraison : </span>{ shippingPrice }€</h4></div>
                <div className="cart-total col-12"><h4 className="text-left font-weight-lighter"><span className="font-weight-bold">Total : </span>{ total }€ TTC</h4></div>
                <div className="cart-total col-12 p-0"><Link  to="/connexion?redirect=shipping"  to="/commande" onClick={() => setIsVisible(!isVisible)} className="btn btn-dark text-white rounded-0 p-3 text-uppercase col-12">Valider mon panier</Link></div>
                </div>
            :
            <h4 className="empty-cart col-12 m-0 my-5 font-weight-light text-center">Votre panier est vide.</h4>
        } */}
        </div>
    )
}
