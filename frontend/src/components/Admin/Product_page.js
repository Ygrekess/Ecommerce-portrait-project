import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg"
import { ImSpinner8 } from "react-icons/im"
import { productDetails } from '../../actions/productActions';

export default function Product_page(props) {

	const [styles, setStyles] = useState([]);
	const [colors, setColors] = useState([]);

    const details = useSelector((state) => state.detailsProduct);
    const { loading, product, error } = details;

    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data)
	};

	const addStyle = (e) => {
		e.preventDefault();
		let style = document.getElementsByClassName('style-input')[0].value
		console.log(style)
		setStyles([...styles, style])
	}
	
	useEffect(() => {
		console.log(props)
        dispatch(productDetails(props.match.params.id, null, null))

		return () => {
		}
	}, [])
    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
		<div className="col-8">
			<form id="user-form" className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
				<h4 className="text-left font-weight-light">Produit - {product._id}</h4>
				<div className="input-group row my-4">
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="name" className="text-left">Nom <span className="text-danger">*</span></label>
						<input
							className={"p-2 " + ( errors.name ? "border-danger" : "")}
							name="name"
							defaultValue={product.name}
							placeholder=""
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.name && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner le nom.</p></div>}
					</div>
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="slug" className="text-left">Slug <span className="text-danger">*</span></label>
						<input
							className={"p-2 " + ( errors.slug ? "border-danger" : "")}
							name="slug"
							defaultValue={product.slug}
							placeholder=""
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.slug && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner le slug.</p></div>}
					</div>
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="price" className="text-left">Prix <span className="text-danger">*</span></label>
						<input
							className={"p-2 " + ( errors.price ? "border-danger" : "")}
							name="price"
							type="number"
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.price && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner le prix.</p></div>}
					</div>
				</div>
				<div className="input-group row my-4">
					<div className="col-12 d-flex flex-column my-2">
						<label htmlFor="description" className="text-left">Description :<span className="text-danger">*</span></label>
						<textarea
							className={"p-2 " + ( errors.description ? "border-danger" : "")}
							name="description"
							defaultValue={product.description}
							rows={6}
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.description && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci d'ajouter une description.</p></div>}
					</div>
				</div>
				<div className="input-group row align-items-center my-4">
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="size" className="text-left">Taille :<span className="text-danger">*</span></label>
						<input
							className={"p-2 " + (errors.size ? "border-danger" : "")}
							name="size"
							placeholder=""
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.size && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">Merci de préciser la taille.</p></div>}
					</div>	
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="style" className="text-left">Style(s) :<span className="text-danger">*</span></label>
						<input
							className={"p-2 style-input " + (errors.style ? "border-danger" : "")}
							name="style"
							placeholder=""
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.style && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">Merci d'indiquer le style.</p></div>}
						<button className="btn btn-dark rounded-0" onClick={(e) => addStyle(e)}>Ajouter</button>
						<div className="my-2 d-flex">
						{
							styles.map((style, i) => (
								<span key={i} className="badge badge-warning px-2 py-1 mr-1">{style}</span>
							))
						}
						</div>
					</div>
					<div className="col-4 d-flex flex-column align-items-center my-2">
						<label htmlFor="color" className="text-left">Couleur(s) :<span className="text-danger">*</span></label>
						<input
							className={"p-2 color-input btn btn-outline-white border my-1 rounded-0 " + (errors.style ? "border-danger" : "")}
							type="color"
							placeholder=""
							ref={register({})}
						/>
						{errors.style && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">Merci d'indiquer le style.</p></div>}
						<button className="btn btn-dark rounded-0" onClick={(e) => addStyle(e)}>Ajouter</button>
						<div className="my-2 d-flex">
						{
							styles.map((style, i) => (
								<span key={i} className="badge badge-warning px-2 py-1 mr-1">{style}</span>
							))
						}
						</div>
					</div>
				</div>
				<div className="input-group row align-items-center my-4">
					<div className="col-4 my-2">
						<div className="product-img m-auto">
							<img src={product.image} />
						</div>
					</div>
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="image" className="text-left">Importer une image :<span className="text-danger">*</span></label>
						<input
							className={( errors.image ? "border-danger" : "")}
							name="image"
							type="file"
							placeholder=""
							ref={register({})}
						/>
					</div>

					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="price" className="text-left">Visage(s) : <span className="text-danger">*</span></label>
						<input
							className={"p-2 " + ( errors.faceNumber ? "border-danger" : "")}
							type="number"
							defaultValue={product.faceNumber}
							name="faceNumber"
							placeholder=""
							ref={register}
						/>
						{errors.faceNumber && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger  size={20}/><p className="m-0 ml-1">Merci de renseigner le nombre de visage(s).</p></div>}
					</div>
				</div>
				<div className="col-12 my-2">
					<button className={"btn btn-outline-dark rounded-0 col-12"} /* onClick={() => handleUpdateInfos()} */>Enregistrer les modifications</button>
				</div>
			</form>
		</div>
	)
}
