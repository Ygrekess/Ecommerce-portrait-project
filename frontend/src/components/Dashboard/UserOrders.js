import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { recupUserOrders, resetOrder } from '../../actions/orderActions';
import '../css/UserOrders.css';
import { ImSpinner8 } from 'react-icons/im';

export default function UserOrders() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch()

    const userOrders = useSelector(state => state.userOrders)
    const { loading, orders, error } = userOrders;

    useEffect(() => {
        dispatch(resetOrder());
        dispatch(recupUserOrders(userInfo._id));
        return () => {
        }
    }, [])

    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-orders-page col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h4 className="text-left font-weight-light">Mes commandes</h4>
                <div className={"user-orders-container mt-2"}>
                { orders.length === 0 ? 
                    <div>Vous n'avez passé aucune commande.</div> :
                    orders.map((order, i) => (
                        order.orderItems.map((item, i) => (
                            <div key={i} className="user-order d-flex w-100 mb-2 p-3">
                                <img src={item.image} className="col-3"/>
                                <div className="col-7 p-3 order-infos d-flex flex-column justify-content-center text-left ml-3">
                                    <h4>{item.name}</h4>
                                    <p className="order-number">Quantité : {item.qty}</p>
                                    <p className="order-number">Commande : {order._id}</p>
                                    <p className="order-date font-italic">{"Le " + order.created_at.split('T')[0] + " à " + order.created_at.split('T')[1].split('.')[0]}</p>
                                </div>
                                <Link to={`/mon-compte/mes-commandes/${order._id}`} className="col-2 btn btn-outline-dark rounded-0 my-auto">Plus d'infos</Link>
                            </div>
                        ))
                    ))
                }
                </div>
            </div>  
        </div>
    )
}
