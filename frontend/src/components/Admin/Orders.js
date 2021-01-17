import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { listOrders, resetListOrders } from '../../actions/orderActions';
import { ImSpinner8 } from "react-icons/im";
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';

export default function Orders(props) {

    const orderList = useSelector(state => state.listOrders);
    const { error, loading, orders, deleteSuccess } = orderList;

    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
	const { count } = countDb;
	
    const totalOrdersInDb = count.count;
    const page = props.match.params.page ? props.match.params.page.split("=")[1] : 1;    
    const per_page = 8;
    const skip = (page * per_page) - per_page

	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(countCollection("orders"));
        dispatch(listOrders(skip, per_page));
		return () => {
			dispatch(resetListOrders())
		}
	}, [page, ]);

	return (
		<div className="col-8 d-flex flex-column orders-page">
			<h4 className="text-left mb-5">Liste commandes</h4>
			{
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Montant</th>
							<th scope="col">Date</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{
							orders.map((order, i) => (
							<tr key={i}>
								<td>{order._id}</td>
								<td>{order.totalPrice}€</td>
								<td>{order.created_at.split('T')[0]}</td>
								<td>
									<Link to={`/admin/liste-commandes/commande/id=${order._id}`} className="btn btn-outline-dark">Détails</Link >
								</td>
							</tr>								
							))
						}
					</tbody>
				</table>
			}	
            <Pagination url={props.location.pathname} pageName={"admin/liste-commandes"} page={page} totalInDb={totalOrdersInDb} per_page={per_page}/>
		</div>
	)
}
