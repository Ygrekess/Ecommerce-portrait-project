import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';

export default function Dashboard_Menu({props}) {

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
    }

  const checkActive = (url) => {
        if (props.location.pathname === url) {
            return true
        } 
        return false
    }

  useEffect(() => {
    }, [])

    return (
        <div className="dashboard-menu col-12">
          <div className="dashboard-menu-links w-100 h-100">
            <ul className="col-12 d-flex flex-column justify-content-center align-items-center h-100 w-100 p-0">
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"py-2 text-center w-100 " + (checkActive("/mon-compte/compte") ? "active" : "")} to="/mon-compte/compte">Mon compte</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"py-2 text-center w-100 " + (checkActive("/mon-compte/infos-perso") ? "active" : "")} to="/mon-compte/infos-perso">Mes infos</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"py-2 text-center w-100 " + (checkActive("/mon-compte/mes-commandes") ? "active" : "")} to="/mon-compte/mes-commandes">Mes commandes</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"py-2 text-center w-100 "} to="#" onClick={handleLogout}>Déconnexion</Link>
              </li>
            </ul>
          </div>
        </div>
    )
}
