import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Modele_Card.css';
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { AiOutlineRight } from "react-icons/ai"

export default function Modele_Card({ product, setAdd }) {

    const dispatch = useDispatch()
    const handleAddToCart = () => {
        addItem();
        dispatch(addToCart(product._id, 1));
    }
    
    const addItem = () => {
        setAdd(true);
        setTimeout(() => setAdd(false), 3000)
    }

    useEffect(() => {
        return () => {
        }
    }, [])
    
    return (
        <div className="mt-4 card card-product">
            <Link to={`/modele/${product.slug}/${product.faceNumber}-pers`}>
            <div className="p-2 card-image row">
                 <img className="img" alt="" src={`${product.image}`}/>
            </div>
            <div className="card-content row">
{/*                 <div className="card-cart-button mx-auto col-9 d-flex justify-content-around align-items-center rounded p-2" onClick={() => handleAddToCart()}>
                    <FiShoppingCart className="cart-icon" size={20} />
                    <h6 className="add-to-cart text-uppercase m-0 border-left pl-2">Ajouter au panier</h6>
                </div> */}
                <div className="card-title text-left text-capitalize my-2 row w-100 justify-content-between">
                    <h2 className="m-0 p-0 text-left card-product-name col-9">{product.name}eeeeeeeeeeeee <span>- {product.category[0]}</span></h2>
                    <h2 className="m-0 p-0 text-right card-price col-3">{String(product.price).split('.')[0]}<span>.{String(product.price).split('.')[1]}€</span></h2>
                </div>
                <div className="card-description text-left col-12 p-0">50x70cm</div>
{/*                 <div className="card-infos row justify-content-between align-items-end w-100">
                    <div className="col-3 btn btn-warning mb-3 card-details-button d-flex align-items-center justify-content-center" onClick={() => handleAddToCart()}><FiShoppingCart className="cart-icon text-white" size={20} />Plus d'infos <AiOutlineRight className="ml-1"/></div>
               </div>
                <div className="card-category d-flex justify-content-center">
                    {product.category.map((category, i) => (
                        <span key={i} className="badge badge-warning rounded-0 m-1">{category}</span>
                    ))}
                </div> */}
            </div>
            </Link>
        </div>
    )
}