import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg"
import { ImSpinner8 } from "react-icons/im"
import { addProduct, importProductImage, productDetails } from '../../actions/productActions';
import { IoMdAdd } from "react-icons/io"
import uniqid from 'uniqid'

export default function AddProduct_page(props) {
	
	const [styles, setStyles] = useState([]);
	const [colors, setColors] = useState([]);
	const [file, setFile] = useState({})

    const dispatch = useDispatch();

    const { register, handleSubmit, errors, reset } = useForm();

	const onSubmit = data => {
		const id = uniqid();
		Object.assign(file, {
			_id: id
		})
		const product = {
			name: data.name,
			slug: data.slug,
			price: data.price,
			image: "/product-images/" + id + ".jpg",
			category: {
				style: styles,
				size: data.size,
				colors: colors
			},
			faceNumber: data.faceNumber,
			description: data.description
		}
		dispatch(addProduct(product))
		if (file) {
			dispatch(importProductImage(file))
		}
		reset({})
		setFile({})
		setColors([])
		setStyles([])
	};

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
		console.log(e.target.files[0])
		const myFile = Object.assign(e.target.files[0], {
			preview: URL.createObjectURL(e.target.files[0]),
		})
		setFile(myFile)
	}

	useEffect(() => {
		return () => {
		}
	}, [])

    return (
		<div className="col-8">
			<form id="user-form" className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
				<h4 className="text-left font-weight-light">Ajouter un produit</h4>
				<div className="input-group row my-4">
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="name" className="text-left">Nom <span className="text-danger">*</span></label>
						<input
							className={"p-2 " + ( errors.name ? "border-danger" : "")}
							name="name"
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
							ref={register({
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
							<button className="btn btn-dark rounded-0 col-2 p-0" onClick={(e) => addStyle(e)}><IoMdAdd className="m-auto" size={20}/></button>
						</div>
						<div className="d-flex">
						{
							styles.map((style, i) => (
								<span key={i} className="style-badge badge rounded-0 badge-warning px-2 py-2 mr-1" onClick={() => deleteStyle(style)}>{style}</span>
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
							<img src={Object.keys(file).length > 0 ? file.preview : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnews.aut.ac.nz%2F__data%2Fassets%2Fimage%2F0006%2F92328%2Fplaceholder-image10.jpg&f=1&nofb=1"}/>
						</div>
					</div>
					<div className="col-4 d-flex flex-column my-2">
						<label htmlFor="image" className="text-left">Importer une image :<span className="text-danger">*</span></label>
						<input
							className={( errors.image ? "border-danger" : "")}
							name="image"
							onChange={(e) => addFile(e)}
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
							name="faceNumber"
							placeholder=""
							ref={register({
								validate: value => value > 0
							})}
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
