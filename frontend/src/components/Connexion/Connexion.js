import React, { useEffect, useState } from 'react'
import Register_Page from './Register_Page';
import Signin_Page from './Signin_Page';
import '../css/Connexion.css'
import { useSelector } from 'react-redux';

export default function Connexion(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

	const [mode, setMode] = useState('sign-in');

  useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
  }, [userInfo]);
  
	return (
    <div className={"container-page " + (mode === "sign-up" ? "sign-up-mode" : "")}>
      <div className="forms-container">
        <div className="signin-signup">
		  <Signin_Page/>
		  <Register_Page/>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel d-flex flex-column align-items-center">
          <div className="content">
            <h3>1ère visite ?</h3>
            <p>
              Créez rapidement votre compte en cliquant sur le bouton ci dessous.
            </p>
            <button className="btn transparent rounded-0 text-uppercase" onClick={() => setMode("sign-up")} id="sign-up-btn">
              M'inscrire
            </button>
          </div>
{/*           <img src="/photos-site/tableau.png" className="image cartoon-tab" id="cartoon-tab" alt="" />
 */}        </div>
        <div className="panel right-panel d-flex flex-column align-items-center">
          <div className="content">
            <h3>Déjà venu ?</h3>
            <p>
              Accédez à votre compte en cliquant sur le bouton ci dessous.
            </p>
            <button className="btn transparent rounded-0 text-uppercase" onClick={() => setMode("sign-in")} id="sign-in-btn">
              Me connecter
            </button>
          </div>
{/*           <img src="/photos-site/painttest.svg" className="image" alt="" />
 */}        </div>
      </div>
    </div>
	)
}
