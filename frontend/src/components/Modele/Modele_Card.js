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
            <div className="py-2 card-image">
                <Link to={`/modele/${product.slug}/${product.faceNumber}-pers`}> <img className="img" alt="" src={product.image}/> </Link>
            </div>
            <div className="card-content">
                <div className="card-cart-button mx-auto col-9 d-flex justify-content-around align-items-center rounded p-2" onClick={() => handleAddToCart()}>
                    <FiShoppingCart className="cart-icon" size={20} />
                    <h6 className="add-to-cart text-uppercase m-0 border-left pl-2">Ajouter au panier</h6>
                </div>
                <h4 className="card-title text-left text-uppercase mt-4 px-3">
                    <Link to={`/modele/${product.slug}/${product.faceNumber}-pers`}>{product.name}</Link>
                </h4>
                <div className="card-description text-justify px-3">{product.description}</div>
                <div className="card-infos d-flex justify-content-between align-items-center p-3">
                        <h2 className="m-0 card-price">{String(product.price).split('.')[0]}<span>.{String(product.price).split('.')[1]}€</span></h2>
                        <Link className="btn card-details-button d-flex align-items-center justify-content-between" to={`/modele/${product.slug}/${product.faceNumber}-pers`}>Plus d'infos <AiOutlineRight className="ml-1"/></Link>
                </div>
{/*                 <div className="card-category d-flex justify-content-center">
                    {product.category.map((category, i) => (
                        <span key={i} className="badge badge-warning rounded-0 m-1">{category}</span>
                    ))}
                </div> */}
            </div>
        </div>
    )
}