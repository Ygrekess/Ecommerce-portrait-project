import React, { useEffect, useState } from 'react'
import { ImSpinner8 } from "react-icons/im"
import "../App.css"
import { FiCheckSquare } from "react-icons/fi"
import Axios from "axios";
import { resetListProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';

export default function Home_Page() {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false)
    const [add, setAdd] = useState(false)
    
    const displayModal = () => {
        setModal(!modal);
    }

    const addItem = () => {
        setAdd(true);
        setTimeout(() => setAdd(false), 2500)
    }

    const addProduct = async () => {
        const product = {
            name: "Test3",
            slug: "test-3",
            price: 69.99,
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F1xjsW3tgByU%2Fmaxresdefault.jpg&f=1&nofb=1",
            category: [
                "Pop art"
            ],
            faceNumber:3,
            description: "Parfait pour offrir. 70/100cm. Idéal pour afficher dans votre salon. Vous rendrez jaloux vos amis.",
        };
        const response = await Axios.post("http://localhost:5000/api/products/", { product })
        console.log(response)
    }

    useEffect(() => {
        dispatch(resetListProducts());
        return () => {
        }
    }, [add])
    return (
        <div className="min-vh-100">
            <h1>HOMEPAGE</h1>
            { modal ? 
                <div className="modal-background">
                    <div className="modal-test m-auto rounded d-flex flex-column justify-content-center align-items-center p-3">
                        <h3>Votre commande a bien été validée !</h3>
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center w-100"><FiCheckSquare size={60}/></div>
                        <p>Veuillez patienter, vous allez être redirigé ...</p>
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
