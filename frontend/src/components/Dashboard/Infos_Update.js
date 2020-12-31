import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateInfos } from '../../actions/userActions';

export default function Infos_Update(props) {

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const updateUserInfos = useSelector(state => state.updateUserInfos)
    const { success } = updateUserInfos;

    const [lastname, setLastname] = useState(userDetails.lastname);
    const [firstname, setFirstname] = useState(userDetails.firstname);
    const [phone, setPhone] = useState(userDetails.phone ? userDetails.phone : "");    
    const [newsletter, setNewsletter] = useState(userDetails.newsletter);

    const dispatch = useDispatch();

    useEffect(() => { 
        if (Object.keys(userDetails).length === 0) {
            props.history.push("/mon-compte/infos-perso")  
        }
        if (success) {
            props.history.push("/mon-compte/infos-perso")  
        }
        return () => {
        }
    }, [lastname, firstname, phone, newsletter, success])

    const handleUpdateInfos = () => {
        console.log("debut")
        dispatch(updateInfos(userDetails._id, lastname, firstname, phone, newsletter))
    }

    return ( loading ? <div>Loading...</div> :
        <div className="col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h1 className="mb-5 text-uppercase w-100">Mes infos</h1>
                <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                    <ul className="d-flex flex-column justify-content-center align-items-center p-0 w-100">
                        <li className="col-6 mb-4">
                            <label htmlFor="address">Nom</label>
                            <div className="input-group">
                                <input type="text" className="form-control text-center" defaultValue={lastname} onChange={(e) => setLastname(e.target.value)} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="city">Prénom</label>
                            <div className="input-group">
                                <input type="text" className="form-control text-center" defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="postalCode">Email</label>
                            <div className="input-group">
                                <input type="email" className="form-control text-center" defaultValue={userDetails.email} disabled={true} aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="col-6 mb-4">
                            <label htmlFor="address">Téléphone</label>
                            <div className="input-group">
                                <input type="phone" className="form-control text-center" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} placeholder="XX-XX-XX-XX-XX" aria-describedby="inputGroupPrepend2" />
                            </div>
                        </li>
                        <li className="user-infos-newsletter-div col-6 mb-4 d-flex align-items-center">
                            <label className="col-8" htmlFor="city">M'inscrire à la newsletter ?</label>
                            <input type="checkbox" defaultChecked={ userDetails.newsletter ? true : false } className="col-4" onChange={(e) => setNewsletter(!newsletter)} id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" />
                        </li>
                        <li className="user-infos-newsletter-div col-6 mb-4 d-flex justify-content-center align-items-center">
                            <button className={"btn btn-outline-primary"} onClick={() => handleUpdateInfos()}>Valider</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
