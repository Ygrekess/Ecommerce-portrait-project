import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { deleteProduct, listProducts, resetListProducts } from '../../actions/productActions';
import Pagination from '../Pagination';
import { ImSpinner8 } from "react-icons/im";
import '../css/Admin.css'
import { Link } from 'react-router-dom';
import { GoTrashcan } from 'react-icons/go';

export default function Products(props) {

    const productList = useSelector(state => state.listProducts);
    const { error, loading, products, deleteSuccess } = productList;
    const [add, setAdd] = useState(false)

    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
    const { count } = countDb;
    const totalProductsInDb = count.count;
    const page = props.match.params.page ? props.match.params.page.split("=")[1] : 1;    
    const per_page = 8;
    const skip = (page * per_page) - per_page

	const dispatch = useDispatch();
	
	const onDelete = (productId) => {
		dispatch(deleteProduct(productId))
	}
    
	useEffect(() => {
        dispatch(countCollection("products"));
        dispatch(listProducts(skip, per_page));
        return () => {
        dispatch(resetListProducts());
        };
	}, [page, deleteSuccess]);
	
	return (
		<div className="col-8 d-flex flex-column products-page">
			<div className="d-flex justify-content-between align-items-center mb-5">
				<h4 className="text-left m-0">Liste produits</h4>
				<Link to="/admin/liste-produits/produit/ajouter-produit" className="btn btn-primary my-auto">Ajouter</Link>
			</div>
			{
            	loading ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
				<table className="table table-striped">
				<thead>
					<tr>
					<th scope="col">ID</th>
					<th scope="col">Montant</th>
					<th scope="col">Nom</th>
					<th scope="col"></th>
					<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((product, i) => (
						<tr key={i}>
						<td>{product._id}</td>
						<td>{product.price}</td>
						<td>{product.name}</td>
						<td>
							<Link to={`/admin/liste-produits/produit/id=${product._id}`} className="btn btn-outline-dark">Détails</Link >
						</td>
						<td>
							<button className="btn btn-outline-danger" onClick={() => onDelete(product._id)}><GoTrashcan size={20}/></button>
						</td>
						</tr>							
						))
					}
				</tbody>
				</table>
			}	
            <Pagination url={props.location.pathname} pageName={"admin/liste-produits"} page={page} totalInDb={totalProductsInDb} per_page={per_page}/>
		</div>
	)
}
