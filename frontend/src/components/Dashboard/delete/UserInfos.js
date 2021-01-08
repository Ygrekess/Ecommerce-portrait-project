import React, { useEffect, useState } from 'react'
import {BsPencil} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInfos } from '../../actions/userActions';
import { ImSpinner8 } from 'react-icons/im';

export default function UserInfos() {

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
    }, [])
    

    return ( loading ? <div className="col-6 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-infos-page col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h1 className="mb-5 text-left text-uppercase w-100">Mes infos</h1>
                <form className="w-100">
                    <ul className="d-flex flex-column justify-content-center align-items-center p-0 w-100">
                        <li className="col-6 mb-4">
                            <label htmlFor="address">Nom</label>
                            <div className="input-group">
                                <input type="text" className="form-control text-center p-2 rounded-0" defaultValue={userDetails.lastname} disabled={true} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="city">Prénom</label>
                            <div className="input-group">
                                <input type="text" className="form-control text-center p-2 rounded-0" defaultValue={userDetails.firstname} disabled={true} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="postalCode">Email</label>
                            <div className="input-group">
                                <input type="email" className="form-control text-center p-2 rounded-0" defaultValue={userDetails.email} disabled={true} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="address">Téléphone</label>
                            <div className="input-group">
                                <input type="phone" className="form-control text-center p-2 rounded-0" defaultValue={userDetails.phone} disabled={true} placeholder="XX-XX-XX-XX-XX" aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="user-infos-newsletter-div col-6 mb-4 d-flex align-items-center">
                            <label className="col-8" htmlFor="city">M'inscrire à la newsletter ?</label>
                            <input type="checkbox" disabled={true} defaultChecked={ userDetails.newsletter ? true : false } className="col-4 " id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" />
                        </li>
                        <li className="user-infos-newsletter-div col-6 mb-4 d-flex justify-content-center align-items-center">
                            <Link to="/mon-compte/modifier-infos">Modifier mes infos</Link>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
