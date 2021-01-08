import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from './Menu'
import Account from './Account'
import UserOrders from './UserOrders'
import "../css/Dashboard.css"
import { Route } from 'react-router-dom'
import Infos from './Infos'
import OrderDetails_Page from './OrderDetails_Page'
import { resetListProducts } from '../../actions/productActions'
import Upload_Photo from './Upload_Photo'
import { getInfos } from '../../actions/userActions'
import { ImSpinner8 } from "react-icons/im"


export default function Dashboard(props) {
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetListProducts());

        if (Object.keys(userDetails).length === 0) {
            dispatch(getInfos(userInfo._id))
        }
        if (!userInfo) {
            props.history.push("/");
        }
        return () => {
        }
    }, [userInfo])

    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="container col-12 d-flex justify-content-center">
            <div className="col-2 d-flex justify-content-center">
                <Menu props={props} />
            </div>
            { loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
            <Fragment>
                <Route path="/mon-compte/compte" component={Account} />
                <Route path="/mon-compte/infos-perso" component={Infos} />
                <Route path="/mon-compte/mes-commandes" exact component={UserOrders} />
                <Route path="/mon-compte/mes-commandes/:id" component={OrderDetails_Page} />
                <Route path="/mon-compte/envoyer-photo" component={Upload_Photo} />
                <div className="col-2 d-flex justify-content-center">
                </div>
            </Fragment>
            }
        </div>
    )
}
