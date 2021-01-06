import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard_Menu from './Dashboard_Menu'
import UserAccount from './UserAccount'
import UserInfos from './UserInfos'
import UserOrders from './UserOrders'
import "../css/Dashboard.css"
import { Route } from 'react-router-dom'
import Password_Update from './Password_Update'
import UserName_Update from './UserName_Update'
import Infos_Update from './Infos_Update'
import OrderDetails_Page from './OrderDetails_Page'
import { resetListProducts } from '../../actions/productActions'


export default function Dashboard(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetListProducts());
        if (!userInfo) {
            props.history.push("/");
        }
        return () => {
        }
    }, [userInfo])

    return ( !userInfo ? <h1>Impossible d'afficher la page</h1> : //loading
        <div className="container col-12 d-flex justify-content-center">
            <div className="col-2 d-flex justify-content-center">
                <Dashboard_Menu props={props} />
            </div>
            <Route path="/mon-compte/compte" component={UserAccount} />
            <Route path="/mon-compte/infos-perso" component={UserInfos} />
            <Route path="/mon-compte/mes-commandes" exact component={UserOrders} />
            <Route path="/mon-compte/mes-commandes/:id" component={OrderDetails_Page} />
            <Route path="/mon-compte/modifier-motdepasse" component={Password_Update} />
            <Route path="/mon-compte/modifier-nomdecompte" component={UserName_Update} />
            <Route path="/mon-compte/modifier-infos" component={Infos_Update} />
        </div>
    )
}
