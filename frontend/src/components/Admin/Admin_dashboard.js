import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from './Menu'
import "../css/Dashboard.css"
import { Route } from 'react-router-dom'
import { getInfos, resetInfos } from '../../actions/userActions'
import { ImSpinner8 } from "react-icons/im"
import Orders from './Orders'
import Users from './Users'
import Products from './Products'
import Stats from './Stats'
import Product_page from './Product_page'
import AddProduct_page from './AddProduct_page'
import Order_page from './Order_page'
import User_page from './User_page'

export default function Admin_dashboard(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!userInfo) {
            props.history.push("/");
        }
        if (userInfo) {
            console.log("getInfos")
            if (Object.keys(userDetails).length === 0) {
                dispatch(getInfos(userInfo._id))
            }
        }
        return () => {
/*             dispatch(resetInfos())
 */        }
	}, [userInfo])
	
    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="container col-12 d-flex justify-content-center mt-5">
            <div className="col-2 d-flex justify-content-center">
                <Menu props={props} />
            </div>
            { loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
            <Fragment>
                <Route path="/admin/liste-commandes/:page?" exact component={Orders} />
                <Route path="/admin/liste-commandes/commande/id=:id" component={Order_page} />
                <Route path="/admin/liste-utilisateurs/:page?" exact component={Users} />
				<Route path="/admin/liste-utilisateurs/utilisateur/id=:id" component={User_page} />
                <Route path="/admin/liste-produits/:page?" exact component={Products} />
				<Route path="/admin/liste-produits/produit/id=:id" component={Product_page} />
                <Route path="/admin/liste-produits/produit/ajouter-produit" component={AddProduct_page} />
                <Route path="/admin/statistiques" component={Stats} />
                <div className="col-2 d-flex justify-content-center">
                </div>
            </Fragment>
            }
        </div>
    )
}
