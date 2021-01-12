import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, signin } from '../../actions/userActions';


export default function Register_Page() {

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, error } = userRegister

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const dispatch = useDispatch();
    
    const registerUser = (e) => {
        e.preventDefault();
        dispatch(register(username, email, password, newsletter))
    }

    useEffect(() => {
        if (error) {
            setRegisterError('Adresse email déjà utilisée.')
        }
        if (userInfo) {
            dispatch(signin(username, password)) 
        }
        return () => {
        }
    }, [error, userInfo])

    return (
        <form className="sign-up-form col-12 d-flex flex-column align-items-center justify-content-center py-5" id="addContact" onSubmit={registerUser}>
            <div className="row">
                <h2 className="font-weight-bold mb-4 mx-auto">Inscription</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <input placeholder="Nom de compte" id="username" type="text" className="validate form-control text-center" onChange={(e) => { setRegisterError(''); setUsername(e.target.value)}}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <input placeholder="Email" id="email" type="email" className="validate form-control text-center" onChange={(e) => { setRegisterError(''); setEmail(e.target.value)}}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <input placeholder="Mot de passe" id="password" type="password" className="validate form-control text-center" onChange={(e) => { setRegisterError(''); setPassword(e.target.value)}}/>
            </div>
            <div className="d-flex justify-content-center align-items-center my-2">
                    <label htmlFor="city">M'inscrire à la newsletter ?</label>
                    <input type="checkbox" className="col-1" onClick={() => setNewsletter(!newsletter)}/>
            </div>
            <div className="row mt-3 w-100">
                <button className="btn mx-auto p-2 rounded-0 text-uppercase border-0 col-2" type="submit" name="action">Valider</button>
            </div>
            <div className="register-error">
                {error && <h6 className="text-center mx-auto my-4 text-danger">{registerError}</h6>}
            </div>
        </form>
    )
}
