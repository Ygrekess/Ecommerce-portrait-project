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
    console.log(props.location.pathname.split('/'))
        if (props.location.pathname.split('/')[2] === url) {
            return true
        } 
        return false
    }

  useEffect(() => {
    }, [])

    return (
        <div className="dashboard-menu col-12 d-flex align-items-center">
          <div className="dashboard-menu-links w-100 h-100">
            <ul className="d-flex flex-column justify-content-around align-items-center h-100 w-100 py-5 p-0">
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"border-0 py-2 text-center w-100 " + (checkActive("compte") ? "active" : "")} to="/mon-compte/compte">Mon compte</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"border-0 py-2 text-center w-100 " + (checkActive("infos-perso") ? "active" : "")} to="/mon-compte/infos-perso">Mes infos</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"border-0 py-2 text-center w-100 " + (checkActive("mes-commandes") ? "active" : "")} to="/mon-compte/mes-commandes">Mes commandes</Link>
              </li>
              <li className="d-flex align-items-center justify-content-center w-100">
                <Link className={"border-0 py-2 text-center w-100 "} to="#" onClick={handleLogout}>Déconnexion</Link>
              </li>
            </ul>
          </div>
        </div>
    )
}
