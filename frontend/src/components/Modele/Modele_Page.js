import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, resetListProducts } from '../../actions/productActions';
import { FiShoppingCart } from 'react-icons/fi'
import { addToCart } from '../../actions/cartActions';
import '../css/Modele_Page.css'
import { Link } from 'react-router-dom';
import { ImSpinner8 } from "react-icons/im"

export default function Modele_Page(props) {

    const details = useSelector((state) => state.detailsProduct);
    const { loading, product, faceNumber, error } = details;
    const [add, setAdd] = useState(false)

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        addItem();
        dispatch(addToCart(product._id, 1));
    }

    const addItem = () => {
        setAdd(true);
        setTimeout(() => setAdd(false), 3000);
    }

    useEffect(() => {
        dispatch(resetListProducts());
        dispatch(productDetails(props.match.params.slug, props.match.params.faceNumber))
        return () => {
        }
    }, [props.match.params.faceNumber])

    return ( loading ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="model-page-container container d-flex align-items-start">
            { add ? 
                <div className="add-test rounded d-flex justify-content-center align-items-center">
                    <div className="add-border rounded border-success">
                        <h5 className="m-0 text-success">Ajouté au panier !</h5>
                    </div>
                </div>
                :
                null
            }
{/*             <div className="row">
                {loading && <h4 className="text-center mx-auto">Chargement...</h4>}
                {error && <h4 className="text-center mx-auto">{error}</h4>}
            </div> */}

            <div className="modele-page-content d-flex flex-wrap align-items-center">
                <div className="modele-page-img col-6">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F1xjsW3tgByU%2Fmaxresdefault.jpg&f=1&nofb=1"></img>
                </div>
                <div className="modele-page-details col-6 d-flex flex-column align-items-start justify-content-around">
                    <div className="row text-left"><h2 className="m-O font-weight-bold text-uppercase">{product.name} <span className="font-weight-lighter text-lowercase">- {product.faceNumber} pers.</span></h2></div>
                    {product.category.map((category, i ) => (
                        <div key={i} className="row text-left"><span className="badge badge-warning m-O">{category}</span></div>
                    ))}
                    <div className="row text-left"><p className="m-O">{product.description}{product.description}</p></div>
                    <div className="row text-left">
                        <h2 className="m-0 card-price">{String(product.price).split('.')[0]}<span>.{String(product.price).split('.')[1]}€</span></h2>
                    </div>
                    {faceNumber.length > 0 &&
                    <div className="row align-items-center">
                        Autre taille{faceNumber.length > 1 && "s"} :
                        {faceNumber.map((numb, i ) => (
                            <Link key={i} to={`/modele/${numb.slug}/${numb.faceNumber}-pers`}><span className="badge badge-dark m-O mx-2 p-2">{numb.faceNumber} pers</span>{i + 1 !== faceNumber.length && ","}</Link>
                        ))}
                    </div>
                    }
                    <div className="modele-page-cart-button row justify-content-around align-items-center rounded p-2" onClick={() => handleAddToCart()}>
                        <FiShoppingCart className="cart-icon" size={20} />
                        <h6 className="add-to-cart text-uppercase m-0 border-left pl-2">Ajouter au panier</h6>
                    </div>
                    <Link className="btn btn-outline-primary border-0 align-self-end" to={"#"} onClick={() => props.history.goBack()}>Retour</Link>
                </div>
            </div>
        </div>
    )
}
