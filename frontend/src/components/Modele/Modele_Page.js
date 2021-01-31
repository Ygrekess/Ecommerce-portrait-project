import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, resetListProducts } from '../../actions/productActions';
import { FiShoppingCart } from 'react-icons/fi'
import { addToCart } from '../../actions/cartActions';
import '../css/Modele_Page.css'
import { Link } from 'react-router-dom';
import { ImSpinner8 } from "react-icons/im"
import Modele_Card from './Modele_Card';

export default function Modele_Page(props) {


    const productId = props.match.params.id.split('=')[1];
    const details = useSelector((state) => state.detailsProduct);
    const { loading, product, similarProducts, error } = details;
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
        dispatch(productDetails(productId, props.match.params.slug))
        return () => {
        }
    }, [productId])

    return ( loading ? <div className="loading-spinner-div d-flex justify-content-center w-100">{/* <ImSpinner8 className="loading-spinner my-3" size={60}/> */}</div> :
        <div className="model-page-container">
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

            <div className="modele-page-content w-100 mt-5">
                <div className="modele-page-img col-md-4 col-12 p-2">
                    <img src={product.image}></img>
                </div>
                <div className="modele-page-details col-md-5 col-12 py-5 d-flex flex-column align-items-start justify-content-around">
                    <div className="row text-left m-0"><h2 className="m-0 font-weight-bold text-uppercase">{product.name.split('-')[0]}<span className='font-weight-lighter'> - {product.name.split('-')[1]}</span></h2></div>
{/*                     <div className="row text-left category-style">
                    {product.category.style.map((category, i ) => (
                        <span key={i} className="badge badge-warning m-0 p-2 rounded-0 text-uppercase">{category}</span>
                    ))}
                    </div> */}
                    <div className="row text-left m-0"><h2 className="m-0 font-weight-lighter text-lowercase">{product.face} pers.</h2></div>
                    <div className="row text-left category-colors">
                    {product.category.colors.map((color, i ) => (
                        <div key={i} className="m-0 mr-1 p-2 text-uppercase" style={{ backgroundColor: `${color}`, height:"1.5rem", width:"1.5rem", borderRadius:"50%"}}></div>
                    ))}
                    </div>
                    <div className="row text-left">
                        <h2 className="m-0 price">{String(product.price).split('.')[0]}<span>.{String(product.price).split('.')[1]}€</span></h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="modele-page-cart-button row justify-content-center align-items-center my-4" onClick={() => handleAddToCart()}>
                            <FiShoppingCart className="cart-icon text-white" size={20} />
                            <h6 className="add-to-cart text-uppercase m-0 text-white ml-4">Ajouter au panier</h6>
                        </div>
                        <Link to={"#"} onClick={() => props.history.goBack()}>Retour</Link>
                    </div>
                    <div className="row text-left"><span className="font-weight-bold text-uppercase">Description : </span><br/><p className="m-0 ">{product.description}</p></div>
                </div>
            </div>
            
            {similarProducts.length > 0 &&
                <Fragment>
                <h2 className='text-left ml-5 mt-5'><u>Produits apparentés</u></h2>
                <div className='similar-products-container'>
                    <div className="similar-products mt-5 mb-5">
                        {similarProducts.map((numb, i) => {
                            if (i < 3) {
                                return <Modele_Card key={i} product={numb}/>
                            }
                        })}
                    </div>
                </div>
                </Fragment>
            }
        </div>
    )
}
