import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';

export default function Signin_Page() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, error } = userSignin;
    
    const [signinError, setSigninError] = useState('');

    const dispatch = useDispatch();

    const signinUser = (e) => {
        e.preventDefault();
        dispatch(signin(username, password))
    };

    useEffect(() => {
        if (error) {
            setSigninError('Identifiant ou mot de passe incorrect.')
        }
        return () => {
        }
    }, [error])
    return (
        <form className="sign-in-form d-flex flex-column align-items-center justify-content-center" id="addContact" onSubmit={signinUser}> 
            <div className="row">
                <h2 className="font-weight-bold mb-4 mx-auto">Connexion</h2>
            </div>
            {
                loading || error &&
                <div className="d-flex flex-column text-input">
                    {loading && <h4 className="text-center mx-auto">Loading...</h4>}
                </div>
            }
            <div className="d-flex flex-column justify-content-center align-items-center my-2">
                <input id="username" type="text" className="validate form-control text-center" onChange={(e) => {setSigninError(''); setUsername(e.target.value)}}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <input id="password" type="password" className="validate form-control text-center" onChange={(e) => {setSigninError(''); setPassword(e.target.value)}}/>
            </div>
            <div className="row mt-3 w-100">
                <button className="btn mx-auto p-2 rounded-0 text-uppercase col-2" type="submit" name="action">Valider</button>
            </div>
            <div className="signin-error">
                {error && <h6 className="text-center mx-auto my-4 text-danger">{signinError}</h6>}
            </div>
        </form>
    )
}
