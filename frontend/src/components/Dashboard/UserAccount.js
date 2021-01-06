import React, { useEffect } from 'react';
import {BsPencil} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { getInfos, resetUpdateUserName, signin } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';

export default function UserAccount() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userDetails) {
            dispatch(getInfos(userInfo._id))
        }
        return () => {
        }
    }, [userInfo])

    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-account-page col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h1 className="mb-5 text-uppercase w-100">Mon compte</h1>
                <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                    <ul className="p-0">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <li className="col-6 mb-4">
                                <label htmlFor="email">Email de connexion</label>
                                <div className="input-group">
                                    <input type="email" value={userDetails.email} className="form-control text-left p-2 rounded-0 text-center" disabled />
                                    <div className="input-group-prepend ">
                                        <Link className="input-group-text update-button" to="/mon-compte/modifier-nomdecompte"><BsPencil/></Link>                                       
                                    </div>
                                </div>
                            </li>
                            <li className="col-6 mb-4">
                                <label htmlFor="password">Mot de passe</label>
                                <div className="input-group">
                                    <input type="password" value="**********" className="form-control text-left p-2 rounded-0 text-center" disabled/>
                                    <div className="input-group-prepend">
                                        <Link className="input-group-text update-button" to="/mon-compte/modifier-motdepasse"><BsPencil/></Link>                                   
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </form>
            </div>
        </div>
    )
}
