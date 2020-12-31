import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';

export default function Signin_Page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, error } = userSignin;

    const dispatch = useDispatch();

    const signinUser = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    };

    return (
    <div className="div-signin col-md-6 col-12 d-flex align-items-center">
        <form className="col-12 d-flex flex-column align-items-center justify-content-center" id="addContact" onSubmit={signinUser}> 
            <div className="row">
                <h2 className="font-weight-bold mb-4 mx-auto">Connexion</h2>
            </div>
            <div className="d-flex flex-column text-input col-md-10 col-12">
                {loading && <h4 className="text-center mx-auto">Loading...</h4>}
                {error && <h4 className="text-center mx-auto">{error}</h4>}
            </div>
            <div className="d-flex flex-column text-input col-md-8 col-10 my-1">
                <label htmlFor="email">Email</label>
                <input  id="email" type="email" className="validate form-control text-center" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="d-flex flex-column text-input col-md-8 col-10 my-1">
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" className="validate form-control text-center" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="row mt-3">
                <button className="btn btn-primary mx-auto" type="submit" name="action">Valider</button>
            </div>
        </form>
    </div>
    )
}
