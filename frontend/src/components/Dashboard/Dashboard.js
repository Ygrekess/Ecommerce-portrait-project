import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from './Menu'
import Account from './Account'
import UserOrders from './UserOrders'
import "../css/Dashboard.css"
import { Route } from 'react-router-dom'
import Infos from './Infos'
import OrderDetails_Page from './OrderDetails_Page'
import Upload_Photo from './Upload_Photo_Dashboard'
import { getInfos, resetInfos } from '../../actions/userActions'
import { ImSpinner8 } from "react-icons/im"


export default function Dashboard(props) {
    
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
/*             console.log("getInfos")
            if (Object.keys(userDetails).length === 0) {
                
            } */
            dispatch(getInfos(userInfo._id))
        }
        return () => {
/*             dispatch(resetInfos())
 */        }
    }, [userInfo])

    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="dashboard-container container mt-5">
            <div className="dashboard-menu-container col-md-2 col-12">
                <Menu props={props} />
            </div>
            { loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
            <Fragment>
                <Route path="/mon-compte" exact component={Account} />
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
