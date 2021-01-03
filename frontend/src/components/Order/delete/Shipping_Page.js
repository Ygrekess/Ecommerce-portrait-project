import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import '../css/Shipping_Page.css'
import { saveShipping } from '../../../actions/cartActions';

export default function Shipping_page(props) {

    let shippingCookie = {};
    if (Cookie.getJSON('shipping')) {
        shippingCookie = Cookie.getJSON('shipping');
    }
    
    const [address, setAddress] = useState(shippingCookie.address ? shippingCookie.address : '');
    const [city, setCity] = useState(shippingCookie.city ? shippingCookie.city : '');
    const [postalCode, setPostalCode] = useState(shippingCookie.postalCode ? shippingCookie.postalCode : '');
    const [country, setCountry] = useState(shippingCookie.country ? shippingCookie.country : '');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('payment');
    }
    
    useEffect(() => {
        return () => {
            //
        }
    }, [])
    
    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                    <li>
                        <h2>Livraison</h2>
                    </li>
                    <li>
                        <label htmlFor="address">Adresse</label>
                        <input className="form-control" value={address} type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="city">Ville</label>
                        <input className="form-control" value={city} type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="postalCode">Code postal</label>
                        <input className="form-control" value={postalCode} type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="country">Pays</label>
                        <input className="form-control" value={country} type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <button onClick={submitHandler} type="submit" className="btn btn-primary">Continuer</button>
                    </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
