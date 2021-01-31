import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { countProducts, listProducts, resetListProducts } from '../../actions/productActions';
import Modele_Card from './Modele_Card';
import { ImSpinner8 } from "react-icons/im";
import '../css/Modeles_Page.css'
import Pagination from '../Pagination';
import Filter from './Filter';

export default function Modeles_Page(props) {

    const productList = useSelector(state => state.listProducts);
    const { error, loading, products } = productList;
    const dispatch = useDispatch();

    /* Filter */
    const { 
        page = 'page=1', 
        style = 'style=all', 
        size = 'size=all',
        max = 'max=100',
        min = 'min=0'
    } = useParams();
    const test = useParams();

    const pageQuery = Number(page.split("=")[1]);
    const styleQuery = style.split("=")[1];
    const sizeQuery = size.split("=")[1]; 
    const maxQuery = max.split("=")[1]; 
    const minQuery = min.split("=")[1];

    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
    const { count } = countDb;
    const totalProductsInDb = count.count;
    const per_page = 9;
    const skip = (pageQuery * per_page) - per_page
    
    useEffect(() => {
        console.log(products)
        dispatch(countProducts(styleQuery, sizeQuery, null, maxQuery, minQuery));
        dispatch(listProducts(skip, per_page, styleQuery, sizeQuery, null, maxQuery, minQuery));
        return () => {
        dispatch(resetListProducts());
        };
    }, [pageQuery, styleQuery, sizeQuery, maxQuery, minQuery]);
    
    return (
        <div className="container modeles-page-container">
            <div className="modeles-page-content">
                <h2 className="text-left font-weight-light ml-5 mt-5">Nos modèles</h2>
                <div className="row justify-content-center my-5">
                    <div className='filter-style pop-art-filter col-md-3 col-10' onClick={() => props.history.push('/modeles/page=1/style=pop%20art/size=all/max=100/min=0')}>
                        <img src="/photos-site/pop-art.png"></img>
                        <div className='div-title col-11 m-auto d-flex align-items-center'>
                            <h4 className='m-auto text-white p-2'>Pop art</h4>
                        </div>
                    </div>
                    <div className='filter-style cartoon-filter col-md-3 col-10' onClick={() => props.history.push('/modeles/page=1/style=cartoon/size=all/max=100/min=0')}>
                        <img src="/photos-site/tete-cartoon-1.png"></img>
                        <div className='div-title col-11 m-auto d-flex align-items-center'>
                            <h4 className='m-auto text-white p-2'>Cartoon</h4>
                        </div>
                    </div>
                    <div className='filter-style funny-filter col-md-3 col-10' onClick={() => props.history.push('/modeles/page=1/style=autre/size=all/max=100/min=0')}>
                        <img src="/photos-site/portrait-design.jpeg"></img>
                        <div className='div-title col-11 m-auto d-flex align-items-center'>
                            <h4 className='m-auto text-white p-2'>Autres</h4>
                        </div>
                    </div>
                </div>
                <Filter props={props} productStyle={styleQuery} productSize={sizeQuery} />
                <div className="row">
                    {loading ? <div className="loading-spinner-div d-flex justify-content-center w-100">{/* <ImSpinner8 className="loading-spinner my-3" size={60}/> */}</div> : null }
                    {error && <h4 className="text-center mx-auto">{error}</h4>}
                </div>
                <div className="row d-flex justify-content-between align-items-start flex-wrap">
                    {
                    products.map(product => (
                        <div className="col-md-4 col-sm-6 col-12 mb-5 d-flex justify-content-center align-items-center" key={product._id}>
                            <Modele_Card product={product}/>
                        </div>
                    ))
                    }
                </div>
                <Pagination url={props.location.pathname} pageName={"modeles"} page={pageQuery} totalInDb={totalProductsInDb} per_page={per_page}/>
            </div>
        </div>
    )
}
