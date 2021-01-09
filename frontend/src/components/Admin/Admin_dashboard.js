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

export default function Admin_dashboard(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (Object.keys(userDetails).length === 0) {
            dispatch(getInfos(userInfo._id))
        }
        if (!userInfo) {
            props.history.push("/");
        }
        return () => {
            dispatch(resetInfos())
        }
	}, [userInfo])
	
    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="container col-12 d-flex justify-content-center">
            <div className="col-2 d-flex justify-content-center">
                <Menu props={props} />
            </div>
            { loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
            <Fragment>
                <Route path="/admin/liste-commandes/" exact component={Orders} />
				<Route path="/admin/liste-commandes/:id" component={Orders} />
                <Route path="/admin/liste-utilisateurs" exact component={Users} />
				<Route path="/admin/liste-utilisateurs/:id" component={Users} />
                <Route path="/admin/liste-produits/:page?" exact component={Products} />
				<Route path="/admin/liste-produits/produit/id=:id" component={Product_page} />
                <Route path="/admin/statistiques" component={Stats} />
                <div className="col-2 d-flex justify-content-center">
                </div>
            </Fragment>
            }
        </div>
    )
}
