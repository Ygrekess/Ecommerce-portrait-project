import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { savePayment } from '../../../actions/cartActions';
import CheckoutSteps from './CheckoutSteps'
import { GrPaypal } from 'react-icons/gr'
import { MdPayment } from 'react-icons/md'

export default function Payment_Page(props) {

    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('placeorder');
    };

    useEffect(() => {
        console.log(paymentMethod)
        return () => {
            //
        }
    }, [paymentMethod])

    return (
    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Règlement</h2>
                </li>
                <li>
                    <div>
                        <span className={"btn btn-warning mr-2 " + (paymentMethod === "Paypal" ? "border-dark" : "")} onClick={() => setPaymentMethod("Paypal")}><GrPaypal /></span>
                        <span className={"btn btn-warning mr-2 " + (paymentMethod === "Carte bancaire" ? "border-dark" : "")} onClick={() => setPaymentMethod("Carte bancaire")}><MdPayment/></span>
                    </div>
                </li>
                <li>
                    <button type="submit" className="btn btn-primary">Continuer</button>
                </li>
            </ul>
            </form>
        </div>
    </div>
    )
}
