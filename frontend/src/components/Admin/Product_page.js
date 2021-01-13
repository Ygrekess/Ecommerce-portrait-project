import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg"
import { ImSpinner8 } from "react-icons/im"
import { addProduct, importProductImage, productDetails, updateProduct } from '../../actions/productActions';
import { IoMdAdd } from "react-icons/io"
import uniqid from 'uniqid'

export default function Product_page(props) {

    const details = useSelector((state) => state.detailsProduct);
	const { loading, product, error, updateSuccess } = details;
	
	const [styles, setStyles] = useState([]);
	const [colors, setColors] = useState([]);
	const [file, setFile] = useState({})

    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();

	const onSubmit = data => {
		console.log(data)
		const id = uniqid();

		const productItem = {
			_id: product._id,
			name: data.name,
			slug: data.slug,
			price: data.price,
			image: data.image[0] ? "/product-images/" + id + ".jpg" : null,
			category: {
				style: styles,
				size: data.size,
				colors: colors
			},
			faceNumber: data.faceNumber,
			description: data.description
		}
		console.log(productItem)
		dispatch(updateProduct(productItem))
		if (Object.keys(file).length > 0) {
			Object.assign(file, {
				_id: id
			})
			dispatch(importProductImage(file))
		}
	};

	const onLoadState = () => {
		setStyles(product.category.style)
		setColors(product.category.colors)
	}
	const addStyle = (e) => {
		e.preventDefault();
		let style = document.getElementsByClassName('style-input')[0]
		if (style.value !== "") {
			setStyles([...styles, style.value])			
		}
		style.value = "";
	}
	const addColor = (e) => {
		e.preventDefault();
		let color = document.getElementsByClassName('color-input')[0]
		setColors([...colors, color.value])
	}
	const deleteStyle = (style) => {
		let newStyles = styles.filter(x => x !== style)
		setStyles(newStyles)
	}
	const deleteColor = (color) => {
		let newColors = colors.filter(x => x !== color)
		setColors(newColors)
	}
	const addFile = (e) => {
		const myFile = Object.assign(e.target.files[0], {
			preview: URL.createObjectURL(e.target.files[0]),
		})
		setFile(myFile)
	}

	useEffect(() => {
		console.log("recharge")
		dispatch(productDetails(props.match.params.id, null, null))
		return () => {
		}
	}, [updateSuccess])

    return ( loading ? <div className="col-8 loading-spinner-div d-flex justify-content-center align-items-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60}/></div> :
		<div className="col-8">
			<form id="user-form" className="d-flex flex-column" onLoad={() => onLoadState()} onSubmit={handleSubmit(onSubmit)}>
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
							defaultValue={product.price}
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
				<div className="input-group row align-items-center my-4 row-category">
					<div className="col-4 d-flex flex-column my-2 h-100">
						<label htmlFor="size" className="text-left">Taille :<span className="text-danger">*</span></label>
						<input
							className={"p-2 " + (errors.size ? "border-danger" : "")}
							name="size"
							placeholder=""
							defaultValue={product.category.size}
							ref={register({
							validate: value => value !== ""
							})}
						/>
						{errors.size && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">Merci de préciser la taille.</p></div>}
					</div>	
					<div className="col-4 d-flex flex-column my-2 h-100">
						<label htmlFor="style" className="text-left">Style(s) :<span className="text-danger">*</span></label>
						<div className="d-flex mb-2">
							<input
								className={"p-2 col-10 style-input " + (errors.style ? "border-danger" : "")}
								name="style"
								placeholder=""
								ref={register({
									require: false
								})}
							/>
							{errors.style && <div className="d-flex align-items-center pt-1 text-danger"><CgDanger size={20} /><p className="m-0 ml-1">Merci d'indiquer le style.</p></div>}
							<button className="btn btn-dark rounded-0 col-2 p-0" onClick={(e) => addStyle(e)}><IoMdAdd className="m-auto" size={20}/></button>
						</div>
						<div className="d-flex">
						{
							styles.map((style, i) => (
								<span key={i} className="style-badge badge badge-warning rounded-0 px-2 py-2 mr-1" onClick={() => deleteStyle(style)}>{style}</span>
							))
						}
						</div>
					</div>
					<div className="col-4 d-flex flex-column align-items-center my-2 h-100">
						<label htmlFor="color" className="text-left">Couleur(s) :<span className="text-danger">*</span></label>
						<div className="d-flex">
							<input
								className={"p-0 color-input rounded-0 " + (errors.style ? "border-danger" : "")}
								type="color"
								placeholder=""
								ref={register({
									require: false
								})}
							/>
							<button className="btn btn-dark rounded-0" onClick={(e) => addColor(e)}><IoMdAdd className="m-auto" size={20}/></button>
						</div>
						<div className="my-2 d-flex justify-content-center w-100" >
							{
							colors.map((color, i) => (
								<div key={i} className="color-badge mr-1" style={{backgroundColor:`${color}`, height:"1.5rem", width:"1.5rem", borderRadius:"50%"}} onClick={() => deleteColor(color)}></div>
							))
							}
						</div>
					</div>
				</div>
				<div className="input-group row align-items-center my-4">
					<div className="col-4 my-2">
						<div className="product-img m-auto">
							<img src={ Object.keys(file).length === 0 ? product.image : file.preview } />
						</div>
					</div>
					<div className=" col-4 d-flex flex-column my-2">
						<label htmlFor="image" className="text-left">Changer l'image :<span className="text-danger">*</span></label>
						<input
							className={"input-image-import " + ( errors.image ? "border-danger" : "")}
							name="image"
							onChange={(e) => addFile(e)}
							
							type="file"
							placeholder=""
							ref={register({
								require: false
							})}
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
