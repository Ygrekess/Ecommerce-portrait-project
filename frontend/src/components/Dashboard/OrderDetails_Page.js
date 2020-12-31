import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function OrderDetails_Page(props) {
    useEffect(() => {
        return () => {
        }
    }, [])
    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <Link className={""} to="/mon-compte/mes-commandes">Retour</Link>
                <h4>Commande n° {props.match.params.id}</h4>
            </div>
            

        </div>
    )
}
