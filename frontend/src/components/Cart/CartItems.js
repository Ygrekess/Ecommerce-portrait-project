import React, { useEffect } from 'react'
import '../css/Cart.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoTrashcan } from 'react-icons/go'
import { removeFromCart, addToCart } from '../../actions/cartActions'
import { IoMdAdd } from "react-icons/io"
import { BiMinus } from "react-icons/bi"


export default function CartItems({ product }) {

    const dispatch = useDispatch();

    useEffect(() => {
        if (product.qty === 0) {
            dispatch(removeFromCart(product))
        }
        return () => {
        }
    }, [dispatch, product.qty])

    const removeCartItem = (product) => {
        dispatch(removeFromCart(product))
    }

    return (
        <div key={product._id} className="cart-component-content border-bottom px-2 py-3 col-12 d-flex justify-content-around align-items-center">
            <div className="cart-component-img col-4 p-0"><Link to={'/modele/' + product._id}> <img className="img" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.jimcdn.com%2Fapp%2Fcms%2Fimage%2Ftransf%2Fdimension%3D1920x10000%3Aformat%3Djpg%2Fpath%2Fs5dde8bff85c81b2f%2Fimage%2Fi925f4c08f4884c52%2Fversion%2F1552946324%2Ftigre-de-sumatra-fiche-animaux-felins-animal-fact-wildcat-sumatran-tiger.jpg&f=1&nofb=1"/> </Link></div>
            <div className="d-flex text-dark flex-column col-4 p-0 pl-1">
                <Link to={'/modele/' + product._id} className="cart-product-title text-left text-uppercase">{product.name}</Link >
                <div className="cart-product-price text-left">{product.price}€</div>
            </div>
            <div className="cart-product-qty col-2 d-flex justify-content-center align-items-center p-0 pr-1 border-left border-right">
                <div className="cart-product-input text-center p-0 col-8">{product.qty}</div>
                <div className="col-4 d-flex flex-column p-0 ">
                    <IoMdAdd className="add-icon" onClick={() => dispatch(addToCart(product._id, 1))}/>
                    <BiMinus className="minus-icon" onClick={() => dispatch(addToCart(product._id, -1))}/>
                </div>
            </div>
            
            <div className="col-2 p-0"><GoTrashcan size={22} className="icon-close" onClick={() => removeCartItem(product)}/></div>
        </div>
    )
}


/* 
export default function CartItems({ product }) {

    const [qty, setQty] = useState(product.qty);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeQty(product._id, qty))
        return () => {
        //
        }
    }, [qty])

    const removeCartItem = (product) => {
        dispatch(removeFromCart(product))
    }

    return (
        <div key={product._id} className="cart-component-content col-12 d-flex justify-content-around align-items-center my-1">
            <div className="cart-component-img col-4"><Link to={'/modele/' + product.name}> <img className="img" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.jimcdn.com%2Fapp%2Fcms%2Fimage%2Ftransf%2Fdimension%3D1920x10000%3Aformat%3Djpg%2Fpath%2Fs5dde8bff85c81b2f%2Fimage%2Fi925f4c08f4884c52%2Fversion%2F1552946324%2Ftigre-de-sumatra-fiche-animaux-felins-animal-fact-wildcat-sumatran-tiger.jpg&f=1&nofb=1"/> </Link></div>
            <div className="d-flex text-dark flex-column col-4">
                <div>{product.name}</div>
                <div>{product.price}€</div>
            </div>
            <input className="form-input col-2 text-center p-0" onChange={(e) => setQty(e.target.value)} value={product.qty}/>
            <div className="col-2"><GrClose onClick={() => removeCartItem(product)}/></div>
        </div>
    )
}
 */