import './App.css';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Connexion_Page from './components/Connexion/Connexion_Page';
import Home_Page from './components/Home_Page';
import Modeles_Page from './components/Modele/Modeles_Page';
import { logout } from './actions/userActions';
import { FiShoppingCart } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import Modele_Page from './components/Modele/Modele_Page';
import { useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import Shipping_Page from './components/Order/Shipping_Page';
import Payment_Page from './components/Order/Payment_Page';
import PlaceOrder_Page from './components/Order/PlaceOrder_Page';
import Order_Page from './components/Order/Order_Page';
import PhotoImport_Page from './components/Order/PhotoImport_Page';
import Dashboard from './components/Dashboard/Dashboard';
import OrderDetails_Page from './components/Dashboard/OrderDetails_Page';
import useVisible from "./components/Cart/useVisible"


function App() {

  const { ref, isVisible, setIsVisible } = useVisible(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch()
    
  const numbItemsCart = () => {
    return cartItems.reduce((total, cartItems) => {
    return total + (1 * cartItems.qty)
    }, 0)
  }

  useEffect(() => {
  }, [cartItems])

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <BrowserRouter>
      <div className="app container-fluid d-flex flex-column justify-content-between min-vh-100">
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
              {
              userInfo ?
              <li>
                <NavLink to="/mon-compte/compte" activeClassName="selected"><VscAccount size={22} /></NavLink>
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

        <div className="d-flex justify-content-center align-items-start">
          <Route path="/" exact component={Home_Page} />
          <Route path="/connexion" component={Connexion_Page} />
          <Route path="/modeles/:page?" component={Modeles_Page} />
          <Route path="/modele/:productId" component={Modele_Page} />
          <Route path="/shipping" component={Shipping_Page} />
          <Route path="/payment" component={Payment_Page} />
          <Route path="/placeorder" component={PlaceOrder_Page} />
          <Route path="/order/:id" component={Order_Page} />
          <Route path="/image" component={PhotoImport_Page} />
          <Route path="/mon-compte/" component={Dashboard} />
          <Route path="/mes-commandes/:id" component={OrderDetails_Page} />
        </div>
        <footer className="footer">All right reserved.</footer>
      </div>

    </BrowserRouter>

  );
}

export default App;
