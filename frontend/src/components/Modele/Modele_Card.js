import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Modele_Card.css';

export default function Modele_Card({ product }) {
    return (
        <div className="card card-product">
            <Link to={`/modele/${product.slug}/pers=${product.person}/visage=${product.face}/id=${product._id}`}>
            <div className="p-2 card-image row">
                 <img className="img" alt="" src={`${product.image}`}/>
            </div>
            <div className="card-content row">
                <div className="card-title text-left text-capitalize my-2 row w-100 justify-content-between">
                    <h2 className="m-0 p-0 text-left card-product-name col-9">{product.name.split('-')[0]}<span> - {product.name.split('-')[1]}</span></h2>
                    <h2 className="m-0 p-0 text-right card-price col-3">{String(product.price).split('.')[0]}<span>.{String(product.price).split('.')[1]}€</span></h2>
                </div>
                <div className="card-description text-left col-12 p-0">{product.category.size}cm</div>
            </div>
            </Link>
        </div>
    )
}