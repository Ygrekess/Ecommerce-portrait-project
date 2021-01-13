import './App.css';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home_Page from './components/Home_Page';
import Modeles_Page from './components/Modele/Modeles_Page';
import { logout } from './actions/userActions';
import { FiShoppingCart } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import Modele_Page from './components/Modele/Modele_Page';
import { useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import Dashboard from './components/Dashboard/Dashboard';
import useVisible from "./components/Cart/useVisible"
import PlaceOrder_Page from './components/Order/PlaceOrder_Page';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Upload_Page from './components/Order/Upload_Page';
import { recupCartDetails } from './actions/cartActions';
import Admin_dashboard from './components/Admin/Admin_dashboard';
import Connexion from './components/Connexion/Connexion';

const stripePromise = loadStripe('pk_test_51I5SwjCkP1aIaUis7r9xPfgttfwYd9Dbz6joX9VcgV4KX1PnxFofxQS0Z1vSHZ1Q4UMUqO5ZIVBMiNYLFuILznKd00ElOrsevC');

function App() {

  const { ref, isVisible, setIsVisible } = useVisible(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, cookieItems } = cart;

  const dispatch = useDispatch()
    
  const numbItemsCart = () => {
    return cartItems.reduce((total, cartItems) => {
    return total + (1 * cartItems.qty)
    }, 0)
  }

  useEffect(() => {
    dispatch(recupCartDetails())

  }, [cookieItems])

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
      <div className="app container-fluid d-flex flex-column justify-content-start min-vh-100">
        <header className="header row justify-content-between ">
          <div className="brand">
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links col-6">
            <ul className="d-flex justify-content-around justify-content-center align-items-center">
              <li>
                <NavLink exact to="/" activeClassName="selected">Accueil</NavLink>
              </li>
              <li>
                <NavLink to="/modeles" activeClassName="selected">Nos modèles</NavLink>
              </li>
              <li>
                <NavLink to="/contact" activeClassName="selected">Nous contacter</NavLink>
              </li>
              <li>
                <NavLink to="/admin" activeClassName="selected">Admin</NavLink>
              </li>
              {
              userInfo ?
              <li>
                <NavLink to="/mon-compte" activeClassName="selected"><VscAccount size={22} /></NavLink>
              </li> 
              : null
              }
              <li>
                <div className="cart d-flex flex-column align-items-center" onClick={e => setIsVisible(!isVisible)}><div className="div-icon-cart"><FiShoppingCart size={22}/></div><span className="numbitemscart">{numbItemsCart()}</span></div>
              </li>
              {userInfo ? 
              <li>
                <Link to="#" onClick={handleLogout}>Déconnexion</Link>
              </li> :
              <li>
                <NavLink to="/connexion" activeClassName="selected">Connexion</NavLink>
              </li> }
            </ul>
{/*             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )} */}
          </div>
        </header>

      {isVisible && <div ref={ref}>
        <Cart isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>}

        <div className="page-content d-flex justify-content-center align-items-start">
          <Route path="/" exact component={Home_Page} />
          <Route path="/connexion" component={Connexion} />
          <Route path="/modeles/:page?" component={Modeles_Page} />
          <Route path="/modele/:slug/:faceNumber" component={Modele_Page} />
          <Route path="/commande" component={PlaceOrder_Page} />
          <Route path="/envoyer-photos/:id" component={Upload_Page} />
          <Route path="/mon-compte" component={Dashboard} />
          <Route path="/admin" component={Admin_dashboard} />
        </div>
        <footer className="footer">All right reserved.</footer>
      </div>
    </Elements>
    </BrowserRouter>

  );
}

export default App;
