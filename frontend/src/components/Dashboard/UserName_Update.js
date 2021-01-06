import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkPassword, passwordCheckReset, resetInfos, updateUserName } from '../../actions/userActions';

export default function UserName_Update(props) {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    const updateUsernameState = useSelector(state => state.updateUserName)
    const { errorUsernameUpdate, success } = updateUsernameState;

    const passwordCheckState = useSelector(state => state.checkPassword)
    const { error, validate } = passwordCheckState;

    const [passwordCheck, setPasswordCheck] = useState("")
    const [userName1, setUserName1] = useState("")
    const [userName2, setUserName2] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const dispatch = useDispatch();

    const signinUserCheck = () => {
        dispatch(checkPassword(userInfo._id, passwordCheck))
    };
    
    const changePassword = () => {
        if (userName1 !== "") {
            setErrorPassword("")
            if (userName2 !== "") {
                setErrorPassword("")
                if (userName1 === userName2) {
                    setErrorPassword("")
                    dispatch(updateUserName(userInfo._id, userName2))
                } else {
                    setErrorPassword("Merci de saisir deux identifiants identiques.")
                }
            } else {
                setErrorPassword("Merci de saisir un identifiant dans les deux champs.")
            }
        } else {
            setErrorPassword("Merci de saisir un identifiant dans les deux champs.")
        }
    };

    const goBack = () => {
        dispatch(passwordCheckReset())
        props.history.push('/mon-compte/compte')
    }
    
    useEffect(() => {
        if (success) {
            dispatch(resetInfos());
            props.history.push('/mon-compte/compte')
        }
        if (error) {
            setErrorPassword("Mot de passe invalide.")
        }
        if (validate) {
            setErrorPassword("")
        }
        return () => {
        }
    }, [userInfo, passwordCheck, validate, error, success])
    
    return (
        <div className="user-account-page-update col-8">
            <div className="form d-flex flex-column justify-content-start col-12">
                <h1 className="mb-5 text-uppercase w-100">Modifier mon identifiant</h1>
                <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                {errorPassword || errorUsernameUpdate ? 
                <div className="alert alert-danger">{errorPassword || errorUsernameUpdate}</div>
                :
                    null
                }
                <ul className="p-0">
                    {validate ? 
                    <li className="col-8 mb-4 m-auto">
                        <label htmlFor="country">Saisissez votre nouveau identifiant</label>
                        <div className="input-group mb-3">
                            <input type="email" onChange={(e) => setUserName1(e.target.value)} className="form-control text-center p-2 rounded-0 m-auto col-6" value={userName1} />
                        </div>
                        <label htmlFor="country">Confirmez votre nouveau identifiant</label>
                        <div className="input-group">
                            <input type="email" onChange={(e) => setUserName2(e.target.value)} className="form-control text-center p-2 rounded-0 m-auto col-6" value={userName2} />
                            <div className="input-group-prepend"></div>
                        </div>
                        <button className="btn btn-primary update-button mt-3" onClick={() => changePassword()}>Valider</button>                                        

                    </li>
                    :  
                    <li className="col-8 mb-4 m-auto">
                        <label htmlFor="country">Veuillez confirmer votre mot de passe</label>
                        <div className="input-group">
                            <input type="password" onChange={(e) => setPasswordCheck(e.target.value)} className="form-control text-center p-2 rounded-0 m-auto col-6" value={passwordCheck}/>
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

