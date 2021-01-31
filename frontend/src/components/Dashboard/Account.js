import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword, getInfos, passwordCheckReset, resetUpdateUserName, signin, updatePassword, updateUserName } from '../../actions/userActions';
import { ImSpinner8 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function Account() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userInfos = useSelector(state => state.userInfos)
    const { loading, userDetails } = userInfos;

    const checkPasswordState = useSelector(state => state.checkPassword)
    const { error: passwordVerifyError, validate } = checkPasswordState;

    const updateUsernameState = useSelector(state => state.updateUserName)
    const { error: usernameAlreadyUse, success } = updateUsernameState;

    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();
    const { register: register1, handleSubmit: handleSubmit1, errors: errors1 } = useForm(); 

    const [updateUsername, setUpdateUsername] = useState(false)
    const [successUsernameUpdate, setSuccessUsernameUpdate] = useState("")
    const [errorUsernameUpdate, setErrorUsernameUpdate] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [successPassword, setSuccessPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const onSubmitUsername = data => {
        dispatch(updateUserName(userInfo._id, data.username))
    };

    const onSubmitPassword = data => {
        if (data.newPassword1 === data.newPassword2) {
            console.log("OK")
            dispatch(checkPassword(userInfo._id, data.passwordCheck))
        } else {
            setErrorPassword("Merci de saisir deux mots de passe identiques.")
        }
    };

    useEffect(() => {
        if (!userDetails) {
            dispatch(getInfos(userInfo._id))
        }
        if (passwordVerifyError) {
            setErrorPassword("Mot de passe incorrect.")
        }
        if (validate) {
            dispatch(updatePassword(userInfo._id, newPassword2))
            dispatch(passwordCheckReset())
            setSuccessPassword("Votre mot de passe a été mis à jour.")
            setPasswordCheck("")
            setNewPassword1("")
            setNewPassword2("")
            setTimeout(() => setSuccessPassword(""), 4000)
        }
        if (success) {
            setErrorUsernameUpdate("");
            setSuccessUsernameUpdate("Votre identifiant a été mis à jour.");
            setUpdateUsername(!updateUsername);
            setTimeout(() => setSuccessUsernameUpdate(""), 4000)
        }
        if (usernameAlreadyUse) {
            setErrorUsernameUpdate("L'identifiant est déjà utilisé.");
        }
        return () => {
        }
    }, [validate, passwordVerifyError, usernameAlreadyUse, success, userInfo])

    return ( loading ? <div className="col-md-8 col-12 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
        <div className="user-account-page col-md-8 col-12">
            <div className="form d-flex flex-column justify-content-start align-items-center col-12">
                <h4 className="text-left font-weight-light align-self-start">Mon compte</h4>
                <form id="username-update-form" className="d-flex flex-column col-md-8 col-12" onSubmit={handleSubmit1(onSubmitUsername)}>
                    <div className="input-group row flex-column align-items-center">
                        <div className="col-md-8 col-12 d-flex flex-column my-2">
                            <label htmlFor="username" className="text-left">Identifiant de connexion<span className="text-danger">*</span></label>
                            <input
                                className={"p-2 " + ( errors1.username ? "border-danger" : "")}
                                defaultValue={userDetails.username}
                                name="username"
                                disabled={updateUsername ? false : true}
                                onChange={() => { setSuccessUsernameUpdate(""); setErrorUsernameUpdate("")}}
                                placeholder=""
                                ref={register1({
                                validate: value => value !== ""
                                })}
                            />
                            {errors1.username && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner votre nom.</p></div>}
                        </div>
                    </div>
                    {successUsernameUpdate && <div className="row my-2 pt-1 text-success "><p className="m-auto">{successUsernameUpdate}</p></div>}
                    {errorUsernameUpdate && <div className="row my-2 pt-1 text-danger "><p className="m-auto">{errorUsernameUpdate}</p></div>}
                    {
                        updateUsername &&
                        <div className="submit-update-username col-12 mt-4 mb-4">
                            <button form="username-update-form" className={"submit-update-username btn btn-outline-dark rounded-0 p-2 col-8"}>Modifier l'identifiant de connexion.</button>
                        </div>
                    }
                    <Link className="mt-2" to="#" onClick={() => { setUpdateUsername(!updateUsername); setSuccessUsernameUpdate("")}}>{updateUsername ? "Annuler la modification." : "Modifier l'identifiant de connexion."}</Link>
                </form>
                <form id="password-update-form" className="d-flex flex-column col-md-8 col-12 px-4 py-2 mt-4" onSubmit={handleSubmit(onSubmitPassword)}>
                    <h6 className="font-weight-bold mb-3">Modifier mon mot de passe</h6>
                    <div className="input-group row flex-column align-items-center">
                        <div className="col-md-8 col-12 d-flex flex-column my-2">
                            <label htmlFor="passwordCheck" className="text-left">Mot de passe actuel<span className="text-danger">*</span></label>
                            <input
                                className={"p-2 " + ( errors.passwordCheck ? "border-danger" : "")}
                                name="passwordCheck"
                                type="password"
                                value={passwordCheck}
                                onChange={(e) => { setPasswordCheck(e.target.value); setErrorPassword(""); setSuccessPassword(""); }}
                                placeholder=""
                                ref={register({
                                validate: value => value !== ""
                                })}
                            />
                        </div>
                        <div className="col-md-8 col-12 d-flex flex-column my-2">
                            <label htmlFor="newPassword1" className="text-left">Nouveau mot de passe<span className="text-danger">*</span></label>
                            <input
                                className={"p-2 " + ( errors.newPassword1 ? "border-danger" : "")}
                                name="newPassword1"
                                type="password"
                                value={newPassword1}
                                onChange={(e) => { setNewPassword1(e.target.value); setErrorPassword(""); }}
                                ref={register({
                                validate: value => value !== ""
                                })}
                            />
                            {errors.newPassword1 && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de saisir un mot de passe dans les deux champs.</p></div>}
                        </div>
                        <div className="col-md-8 col-12 d-flex flex-column my-2">
                            <label htmlFor="newPassword2" className="text-left">Confirmation du nouveau mot de passe<span className="text-danger">*</span></label>
                            <input
                                className={"p-2 " + ( errors.newPassword2 ? "border-danger" : "")}
                                name="newPassword2"
                                type="password"
                                value={newPassword2}
                                onChange={(e) => { setNewPassword2(e.target.value); setErrorPassword("");}}
                                ref={register({
                                validate: value => value !== ""
                                })}
                            />
                            {errors.newPassword2 && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de saisir un mot de passe dans les deux champs.</p></div>}
                        </div>
                        {errorPassword && <div className="d-flex align-items-center mt-2 pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">{errorPassword}</p></div>}
                        {successPassword && <div className="d-flex align-items-center mt-2 pt-1 text-success"><p className="m-0 ml-1">{successPassword}</p></div>}

                        <div className="col-12 mt-4 mb-4">
                            <button form="password-update-form" className={"btn btn-outline-dark rounded-0 p-2 col-8"}>Modifier le mot de passe.</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
