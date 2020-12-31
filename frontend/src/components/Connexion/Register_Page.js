import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, signin } from '../../actions/userActions';


export default function Register_Page() {

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo } = userRegister

    const [email, setEmail] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    
    const dispatch = useDispatch();
    
    const registerUser = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            dispatch(register(lastname, firstname, email, password, newsletter))
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(signin(userInfo.email, password)) 
        }
        return () => {
        }
    }, [userInfo])

    return (
    <div className="div-register col-md-6 col-12">
        <form className="col-12 d-flex flex-column align-items-center justify-content-center py-5" id="addContact" onSubmit={registerUser}>
            <div className="row">
                <h2 className="font-weight-bold mb-4 mx-auto">Inscription</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label htmlFor="lastname">Nom</label>
                    <input  id="lastname" type="text" className="validate form-control text-center" onChange={(e) => setLastname(e.target.value)}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label htmlFor="firstname">Prénom</label>
                    <input  id="firstname" type="text" className="validate form-control text-center" onChange={(e) => setFirstname(e.target.value)}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label htmlFor="email">Email</label>
                    <input  id="email" type="email" className="validate form-control text-center" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" type="password" className="validate form-control text-center" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label htmlFor="passwordConfirmation">Confirmation du mot de passe</label>
                    <input id="passwordConfirmation" type="password" className="validate form-control text-center" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-center align-items-center col-md-8 col-10 my-1">
                    <label className="col-8" htmlFor="city">M'inscrire à la newsletter ?</label>
                    <input type="checkbox" className="col-4 " id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onClick={() => setNewsletter(!newsletter)}/>
            </div>
            <div className="row mt-3">
                <button className="btn btn-primary mx-auto" type="submit" name="action">Valider</button>
            </div>
        </form>
    </div>
    )
}
