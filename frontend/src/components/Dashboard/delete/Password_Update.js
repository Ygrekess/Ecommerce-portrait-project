import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkPassword, passwordCheckReset, resetInfos, updatePassword } from '../../actions/userActions';

export default function Password_Update(props) {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    const checkPasswordState = useSelector(state => state.checkPassword)
    const { error, validate } = checkPasswordState;

    const updatePasswordState = useSelector(state => state.updatePassword)
    const { success } = updatePasswordState;

    const [passwordCheck, setPasswordCheck] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const dispatch = useDispatch();

    const signinUserCheck = () => {
        dispatch(checkPassword(userInfo._id, passwordCheck))
    };

    const submitNewPassword = () => {
        if (newPassword1 !== "") {
            setErrorPassword("")
            if (newPassword2 !== "") {
                setErrorPassword("")
                if (newPassword1 === newPassword2) {
                    setErrorPassword("")
                    dispatch(updatePassword(userInfo._id, newPassword2))
                } else {
                    setErrorPassword("Merci de saisir deux mots de passe identiques.")
                }
            } else {
                setErrorPassword("Merci de saisir un mot de passe dans les deux champs.")
            }
        } else {
            setErrorPassword("Merci de saisir un mot de passe dans les deux champs.")
        }
    };

    const goBack = () => {
        dispatch(passwordCheckReset())
        props.history.push('/mon-compte/compte')
    }
    
    useEffect(() => {
        if (error) {
            setErrorPassword("Mot de passe invalide.")
        }
        if (validate) {
            setErrorPassword("")
        }
        if (success) {
            dispatch(resetInfos());
            props.history.push('/mon-compte/compte')
        }
        return () => {
        }
    }, [userInfo, passwordCheck, validate, error, success])


    return (
        <div className="user-account-page-update col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h1 className="mb-5 text-uppercase w-100">Modifier mon mot de passe</h1>
                <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                {errorPassword ? 
                <div className="alert alert-danger">{errorPassword}</div>
                :
                    null
                }
                <ul className="p-0">
                    {validate ? 
                    <li className="col-8 mb-4 m-auto">
                        <label htmlFor="country">Saisissez votre nouveau mot de passe</label>
                        <div className="input-group mb-3">
                            <input type="password" onChange={(e) => setNewPassword1(e.target.value)} className="form-control text-center p-2 rounded-0 col-6 m-auto" value={newPassword1} />
                        </div>
                        <label htmlFor="country">Confirmez votre nouveau mot de passe</label>
                        <div className="input-group">
                            <input type="password" onChange={(e) => setNewPassword2(e.target.value)} className="form-control text-center p-2 rounded-0 col-6 m-auto" value={newPassword2} />
                            <div className="input-group-prepend"></div>
                        </div>
                        <button className="btn btn-primary update-button mt-3" onClick={() => submitNewPassword()}>Valider</button>                                        

                    </li>
                    :  
                    <li className="col-8 mb-4 m-auto">
                        <label htmlFor="country">Veuillez confirmer votre mot de passe</label>
                        <div className="input-group">
                            <input type="password" onChange={(e) => setPasswordCheck(e.target.value)} className="form-control text-center p-2 rounded-0 col-6 m-auto" value={passwordCheck}/>
                        </div>
                        <button className="btn btn-primary update-button mt-3" onClick={() => signinUserCheck()}>Valider</button>
                    </li>
                    }

                </ul>
                </form>
                <Link className="btn btn-outline-primary m-auto" to="#" onClick={() => goBack()}>Annuler</Link>
            </div>
        </div>
    )
}

