import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { listProducts, resetListProducts } from '../../actions/productActions';
import Modele_Card from './Modele_Card';
import { ImSpinner8 } from "react-icons/im";
import '../css/Modeles_Page.css'
import Pagination from '../Pagination';
import Filter from './Filter';

export default function Modeles_Page(props) {

    const productList = useSelector(state => state.listProducts);
    const { error, loading, products } = productList;
    const [add, setAdd] = useState(false)

    /* Filter */
    const { 
        page = 'page=1', 
        style = 'style=all', 
        size = 'size=all'
    } = useParams();

    const pageQuery = Number(page.split("=")[1]);
    const styleQuery = style.split("=")[1];
    const sizeQuery = size.split("=")[1]; 

    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
    const { count } = countDb;
    const totalProductsInDb = count.count;
    const per_page = 3;
    const skip = (page * per_page) - per_page
/*     const page = props.match.params.page ? props.match.params.page.split("=")[1] : 1;    
 */
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(pageQuery, styleQuery, sizeQuery)
        dispatch(countCollection("products"));
        dispatch(listProducts(skip, per_page, styleQuery, sizeQuery));
        return () => {
        dispatch(resetListProducts());
        };
    }, [page, style, size]);
    
    return (
        <div className="container modeles-page-container">
            { add ? 
                <div className="add-test rounded d-flex justify-content-center align-items-center">
                    <div className="add-border rounded border-success">
                        <h5 className="m-0 text-success">Ajouté au panier !</h5>
                    </div>
                </div>
                :
                null
            }
            
            <div className="modeles-page-content">
                <Filter props={props} page={pageQuery} productStyle={styleQuery} productSize={sizeQuery}/>
                <h1 className="text-left">Nos modèles</h1>
                <div className="row">
                    {loading ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> : null }
                    {error && <h4 className="text-center mx-auto">{error}</h4>}
                </div>
                <div className="row d-flex justify-content-between align-items-start flex-wrap">
                    {
                    products.map(product => (
                        <div className="col-md-4 col-sm-6 col-12 mb-5 d-flex justify-content-center align-items-center" key={product._id}>
                            <Modele_Card setAdd={setAdd} product={product}/>
                        </div>
                    ))
                    }
                </div>
                <Pagination pageName={"modeles"} page={page} totalProductsInDb={totalProductsInDb} per_page={per_page}/>
            </div>
        </div>
    )
}
