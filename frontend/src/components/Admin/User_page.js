import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../actions/userActions';
import { ImSpinner8 } from "react-icons/im";

export default function User_page(props) {

	const userDetails = useSelector(state => state.userDetails)
	const { loading, user, orders } = userDetails;

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getDetails(props.match.params.id))
		return () => {
		}
	}, [])

	return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-infos-page-update col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <div className="user-form col-12">
                    <form id="user-form" className="d-flex flex-column">
						<h4 className="text-left font-weight-light">Infos utilisateur</h4>
						<div className="input-group row">
							<div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="userid" className="text-left">Id</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user._id }
                                    name="userid"
                                    disabled
                                />
                            </div>
                            <div className="col-8 d-flex flex-column my-2">
                                <label htmlFor="username" className="text-left">Nom d'utilisateur</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.username }
                                    name="username"
                                    disabled
                                />
                            </div>
                            <div className="col-4 d-flex flex-column my-2">
                                <label htmlFor="isadmin" className="text-left">Statut</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.isAdmin ? "Admin" : "Client" }
                                    name="isadmin"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="input-group row">
                            <div className="col-8 d-flex flex-column my-2">
                                <label htmlFor="lastname" className="text-left">Nom</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.lastname }
                                    name="lastname"
                                    disabled
                                />
                            </div>
                            <div className="col-4 d-flex flex-column my-2">
                                <label htmlFor="firstname" className="text-left">Prénom</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.firstname }
                                    name="firstname"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="input-group row">
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="phone" className="text-left">Téléphone</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.phone }
                                    name="phone"
                                    disabled
                                />
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="email" className="text-left">Adresse de messagerie</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.email }
                                    name="email"
                                    disabled={true}
                                    type="email"
                                    disabled
                                />
                            </div>
						</div>
                        <div className="input-group row">
                            <div className="col-8 d-flex flex-column my-2">
                                <label htmlFor="created_at" className="text-left">Date d'inscription</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ user.date.split("T")[0] }
                                    name="created_at"
                                    disabled
                                />
                            </div>
                            <div className="col-4 d-flex flex-column my-2">
                                <label htmlFor="orders" className="text-left">Commande{orders.length > 1 && "s"} passée{orders.length > 1 && "s"}</label>
                                <input
                                    className={"p-2 "}
                                    defaultValue={ orders.length }
                                    name="orders"
                                    disabled
                                />
							</div>
                            <div className="col-12 d-flex justify-content-center align-items-center my-2">
                                <label htmlFor="newsletter" className="text-left m-0">Inscrit à la newsletter ?</label>
                                <input
                                    className={"p-2 mx-3 "}
                                    defaultValue={user.newsletter}
                                    type="checkbox"
                                    defaultChecked={ user.newsletter ? true : false }
                                    name="newsletter"
                                    placeholder=""
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                </div>        
            </div>
        </div>
	)
}
