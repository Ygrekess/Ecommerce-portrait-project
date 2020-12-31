import React from 'react';
import '../css/CheckoutSteps.css'

function CheckoutSteps(props) {
  return <div className="checkout-steps d-flex">
    <div className={props.step1 ? 'active' : ''} >Inscription</div>
    <div className={props.step2 ? 'active' : ''} >Livraison</div>
    <div className={props.step3 ? 'active' : ''} >Mode de paiement</div>
    <div className={props.step4 ? 'active' : ''} >Validation</div>
  </div>
}

export default CheckoutSteps;