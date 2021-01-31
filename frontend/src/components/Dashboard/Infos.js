import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { getInfos, resetInfos, updateInfos } from '../../actions/userActions';
import { CgDanger } from "react-icons/cg"
import { ImSpinner8 } from "react-icons/im"

export default function Infos(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const updateUserInfos = useSelector(state => state.updateUserInfos)
    const { success } = updateUserInfos;

    const [newsletter, setNewsletter] = useState(userDetails.newsletter)

    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data)
        dispatch(updateInfos(userDetails._id, data.lastname, data.firstname, data.email, data.phone, newsletter))
    };

    useEffect(() => { 
        if (success) {
            dispatch(resetInfos());
            dispatch(getInfos(userInfo._id))
        }
        return () => {
        }
    }, [userDetails, success])


    return ( loading ? <div className="col-md-8 col-12 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-infos-page-update col-md-8 col-12">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h4 className="text-left font-weight-light">Infos personnelles</h4>

                <div className="user-form col-12">
                    <form id="user-form" className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group row">
                            <div className="col-md-8 col-12 d-flex flex-column my-2">
                                <label htmlFor="lastname" className="text-left">Nom <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.lastname ? "border-danger" : "")}
                                    defaultValue={ userDetails.lastname }
                                    name="lastname"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.lastname && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre nom.</p></div>}
                            </div>
                            <div className="col-md-4 col-12 d-flex flex-column my-2">
                                <label htmlFor="firstname" className="text-left">Prénom <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.firstname ? "border-danger" : "")}
                                    defaultValue={ userDetails.firstname }
                                    name="firstname"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.firstname && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre prénom.</p></div>}
                            </div>
                        </div>
                        <div className="input-group row">
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="phone" className="text-left">Téléphone <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.phone ? "border-danger" : "")}
                                    defaultValue={ userDetails.phone }
                                    name="phone"
                                    placeholder=""
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.phone && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre numéro de téléphone.</p></div>}
                            </div>
                            <div className="col-12 d-flex flex-column my-2">
                                <label htmlFor="email" className="text-left">Adresse de messagerie <span className="text-danger">*</span></label>
                                <input
                                    className={"p-2 " + ( errors.email ? "border-danger" : "")}
                                    defaultValue={ userDetails.email }
                                    name="email"
                                    type="email"
                                    ref={register({
                                    validate: value => value !== ""
                                    })}
                                />
                                {errors.email && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre adresse de messagerie.</p></div>}
                            </div>
                            <div className="col-12 d-flex justify-content-center align-items-center my-2">
                                <label htmlFor="newsletter" className="text-left m-0">M'inscrire à la newsletter ?</label>
                                <input
                                    className={"p-2 mx-3 " + ( errors.newsletter ? "border-danger" : "")}
                                    defaultValue={userDetails.newsletter}
                                    type="checkbox"
                                    defaultChecked={ userDetails.newsletter ? true : false }
                                    name="newsletter"
                                    placeholder=""
                                    onClick={() => setNewsletter(!newsletter)}
                                    ref={register}
                                />
                                {errors.newsletter && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre nom.</p></div>}
                            </div>
                        </div>
                        <div className="col-12 my-2">
                            <button className={"btn btn-outline-dark rounded-0 col-12"} /* onClick={() => handleUpdateInfos()} */>Enregistrer les modifications</button>
                        </div>
                    </form>
                </div>        
            </div>
        </div>
    )
}
/* 
<div className="input-group row">
    <div className="col-12 d-flex flex-column my-2">
        <label htmlFor="address" className="text-left">Numéro et nom de rue <span className="text-danger">*</span></label>
        <input
            className={"p-2 " + ( errors.address ? "border-danger" : "")}
            defaultValue={ userDetails.address ? userDetails.address : ""}
            name="address"
            placeholder=""
            ref={register({required: false})}
        />
        {errors.address && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre adresse.</p></div>}
    </div>
    <div className="col-12 d-flex flex-column my-2">
        <label htmlFor="addressDetails" className="text-left"></label>
        <input
            className={"p-2 " + ( errors.addressDetails ? "border-danger" : "")}
            defaultValue=""
            name="addressDetails"
            placeholder="Appartement, bureau, etc. (optionnel) "
            ref={register({required: false})}
        />
    </div>
    <div className="col-12 d-flex flex-column my-2">
        <label htmlFor="postalCode" className="text-left">Code postal <span className="text-danger">*</span></label>
        <input
            className={"p-2 " + (errors.postalCode ? "border-danger" : "")}
            defaultValue={ userDetails.postalCode ? userDetails.postalCode : ""}
            name="postalCode"
            type="number"
            ref={register({required: false})}
        />
        {errors.postalCode && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de saisir votre code postal.</p></div>}
    </div>
    <div className="col-12 d-flex flex-column my-2">
        <label htmlFor="city" className="text-left">Ville <span className="text-danger">*</span></label>
        <input
            className={"p-2 " + ( errors.city ? "border-danger" : "")}
            defaultValue={ userDetails.city ? userDetails.city : ""}
            name="city"
            placeholder=""
            ref={register({required: false})}
        />
        {errors.city && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre ville.</p></div>}
    </div>
    <div className="col-12 d-flex flex-column my-2">
        <label htmlFor="country" className="text-left">Pays <span className="text-danger">*</span></label>
        <input
            className={"p-2 " + ( errors.country ? "border-danger" : "")}
            defaultValue={ userDetails.country ? userDetails.country : ""}
            name="country"
            placeholder=""
            ref={register({required: false})}

        />
        {errors.country && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre pays.</p></div>}
    </div>
    </div>
*/
