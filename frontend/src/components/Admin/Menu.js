import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';

export default function Menu({props}) {

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
      }, [])

    return (
        <div className="dashboard-menu col-12 d-flex align-items-center">
          <div className="dashboard-menu-links w-100 h-100">
            <ul className="d-flex flex-column justify-content-center align-items-center h-100 w-100 py-5 p-0">
              <li className="d-flex border-top w-100">
                <Link className="py-2 text-left w-100" /* + (checkActive("infos-perso") ? "active" : "") */ to="/admin/liste-utilisateurs">Liste utilisateurs</Link>
              </li>
              <li className="d-flex border-top w-100">
                <Link className="py-2 text-left w-100" /* + (checkActive("mes-commandes") ? "active" : "") */ to="/admin/liste-commandes">Listes commandes</Link>
              </li>
              <li className="d-flex border-top w-100">
                <Link className="py-2 text-left w-100" /* + (checkActive("envoyer-photo") ? "active" : "") */ to="/admin/liste-produits">Liste produits</Link>
              </li>
              <li className="d-flex border-top w-100">
                <Link className="py-2 text-left w-100" /* + (checkActive("envoyer-photo") ? "active" : "") */ to="/admin/statistiques">Statistiques</Link>
              </li>
              <li className="d-flex border-top w-100">
                <Link className="py-2 text-left w-100" to="#" onClick={handleLogout}>Déconnexion</Link>
              </li>
            </ul>
          </div>
        </div>
    )
}
