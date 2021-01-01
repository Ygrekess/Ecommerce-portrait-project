import React, { useEffect, useState } from 'react'
import "../App.css"

export default function Home_Page() {

    const [modal, setModal] = useState(false)
    const [add, setAdd] = useState(false)
    
    const displayModal = () => {
        setModal(!modal);
    }

    const addItem = () => {
        setAdd(true);
        setTimeout(() => setAdd(false), 2500)
    }

    useEffect(() => {
        return () => {
        }
    }, [add])
    return (
        <div className="min-vh-100">
            <h1>HOMEPAGE</h1>
            { modal ? 
                <div className="modal-background">
                    <div className="modal-test m-auto rounded d-flex flex-column justify-content-center align-items-center">
                        <h3>Votre commande a bien été validée !</h3>
                        <button className="btn btn-primary " onClick={() => displayModal()}>Fermer</button>
                    </div>
                </div>
                :
                null
            }
            { add ? 
                <div className="add-test m-auto rounded d-flex flex-column justify-content-center align-items-center p-1">
                    <div className="add-border rounded border-success p-2">
                        <h5 className="text-success">Ajouté au panier !</h5>
                    </div>
                </div>
                :
                null
            }
            <button className="btn btn-primary col-12 my-3" onClick={() => displayModal()}>Afficher</button>
            <button className="btn btn-primary col-12 my-3" onClick={() => addItem()}>Ajouter</button>

        </div>
    )
}
