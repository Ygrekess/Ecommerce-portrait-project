import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { listProducts } from '../../actions/productActions';
import Modele_Card from './Modele_Card';

export default function Modeles_Page(props) {

    const productList = useSelector(state => state.listProducts);
    const { error, loading, products } = productList;
    const [add, setAdd] = useState(false)

    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
    const { count } = countDb;
    const totalProductsInDb = count.count;
    const page = props.match.params.page ? props.match.params.page.split("=")[1] : 1;    
    const per_page = 6;
    const skip = (page * per_page) - per_page

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(countCollection("products"));
        dispatch(listProducts(skip));
        return () => {
        //
        };
    }, [page]);


    return (
        <div className="container">
            { add ? 
                <div className="add-test rounded d-flex justify-content-center align-items-center">
                    <div className="add-border rounded border-success">
                        <h5 className="m-0 text-success">Ajouté au panier !</h5>
                    </div>
                </div>
                :
                null
            }
            <h1 className="text-left">Nos modèles</h1>
            <div className="container">
                <div className="row">
                    {loading && <h4 className="text-center mx-auto">Loading...</h4>}
                    {error && <h4 className="text-center mx-auto">{error}</h4>}
                </div>
                <div className="row d-flex justify-content-between flex-wrap">
                    {
                    products.map(product => (
                        <div className="col-md-4 col-10" key={product._id}>
                            <Modele_Card setAdd={setAdd} product={product}/>
                        </div>
                    ))
                    }
                </div>
                <div className="row justify-content-between my-5">
                    {Number(page) > 1 ?
                        <Link to={"/modeles/page=" + (Number(page) - 1)} className="btn btn-primary">Précedent</Link>
                        : null
                    }
                    { Number(page) < Math.floor((totalProductsInDb/per_page) + 1) ? 
                        <Link to={"/modeles/page=" + (Number(page) + 1)} className="btn btn-outline-primary ml-auto">Suivant</Link>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
