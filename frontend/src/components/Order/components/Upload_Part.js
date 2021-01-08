import React, { Fragment, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uniqid from 'uniqid';
import { GoTrashcan } from 'react-icons/go'
import { IoMdAdd } from "react-icons/io"
import {GoCloudUpload} from 'react-icons/go'
import Axios from 'axios';
import UploadBar from './UploadBar';
import { formatBytes } from '../../../helpers/formatBytes';
import { MdPhotoSizeSelectActual } from 'react-icons/md'
import { GrTextAlignLeft } from 'react-icons/gr';
import { FiCheckSquare } from 'react-icons/fi';
import { AiOutlineDash } from 'react-icons/ai';
import { detailsOrder, importImage } from '../../../actions/orderActions';
import { useDispatch } from 'react-redux';
import { getInfos, resetInfos } from '../../../actions/userActions';
import '../../css/Upload_Part.css'


export default function Upload_Part({order, item, orderId, userId}) {

	const dispatch = useDispatch();
/* FILES */
	const [files, setFiles] = useState([]);
	const [compteur, setCompteur] = useState(item.photoUpload === true ? 0 : item.faceNumber);
	const [progress, setProgress] = useState(item.photoUpload === true ? 100 : 0);
	const [test, setTest] = useState(false)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: "image/*",
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.concat(files).map((file, i) => Object.assign(file, {
					preview: URL.createObjectURL(file),
					_id: uniqid()
				}))	
			)
		}
	})
    const removeFile = (fileId) => {
		setFiles(files.filter(file => file._id !== fileId));
    }

	const images = files.map((file, i) => (
		<div className="upload-zone-img d-flex justify-content-around align-items-center border-bottom" key={i}>
			<img src={file.preview} className="col-4"/>
			<div className="img-detail text-left col-6">
				<h6 className="img-name">Nom : {file.name}</h6>
				<h6 className="">Format : {file.type.split('/')[1]}</h6>
				<h6>Taille : {formatBytes(file.size)}</h6>
			</div>
			<GoTrashcan size={24} className="icon-close col-2" onClick={() => removeFile(file._id)} />
		</div>
	))

	const sendFiles = async () => {
		const itemName = `${item.name}-${item.cartItemId}`
		const bodyFormData = new FormData();
		const filesName = [];
		files.map(file => {
			filesName.push(file.name)
			bodyFormData.append('image', file)
		})
	
		try {
			const { data } = await Axios.post(`http://localhost:5000/api/upload/${orderId}&${itemName}`, bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
				}
			});
			dispatch(importImage(userId, orderId, itemName, filesName))
			
		} catch (error) {
			console.log(error)
		}
	}

	const example = () => {
		const myDiv = []
		for (let i = 0; i < compteur; i++) {
			myDiv.push(
				<div key={i} className="upload-zone-exemple d-flex align-items-center justify-content-around border-bottom">
					<MdPhotoSizeSelectActual size={80} />
					<GrTextAlignLeft size={80} />
					<GoTrashcan size={24} />
				</div>
			)
		}
		return myDiv
	}
	useEffect(() => {
		if (!item.photoUpload) {
			setCompteur(item.faceNumber - files.length)
		}
	}, [files/*,  progress, test */])

	return (
		<Fragment>
		<div className="upload-part w-100 d-flex flex-column align-items-center justify-content-center p-0 mb-5 border-bottom">
{/* 			{ (progress === 100 || item.photoUpload === true) &&
				<div className="validate-mask d-flex align-items-center justify-content-around w-100">
					<div className="validate-modal m-auto rounded d-flex flex-column justify-content-center align-items-center p-3">
                        <h3>{item.faceNumber > 1 ? "Vos photos ont été envoyées !" : "Votre photo a été envoyée !"}</h3>
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center w-100">
							<FiCheckSquare size={60}/>
						</div>
                    </div>
				</div>
			} */}
			<Fragment>
				<div className="upload-part-order-resume d-flex w-100 p-3">
					<div className="upload-part-order-resume-img ">
						<img src={item.image} />
					</div>
					<div className="col-7 p-3 order-infos d-flex flex-column justify-content-center text-left ml-3">
						<h4>{item.name}</h4>
						<p className="order-number m-1">Quantité : {item.qty}</p>
						<p className="order-number m-1">Commande : {order._id}</p>
						<p className="order-statut m-1">Statut : {!item.photoUpload ? <span className="text-danger">En attente</span> : <span className="text-success">Complet</span>}</p>
						<p className="order-date font-italic m-1">{"Le " + order.created_at.split('T')[0] + " à " + order.created_at.split('T')[1].split('.')[0]}</p>
					</div>
					{
						item.photoUpload &&
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center align-items-center">
							<FiCheckSquare size={60}/>
						</div>
					}
				</div>
				{
				!item.photoUpload &&
				<div className="upload-part-content d-flex align-items-center justify-content-between w-100 mx-0 my-5">
					<div {...getRootProps()} onSubmit={() => console.log("submit")} className="upload-zone col-md-5 m-0 d-flex flex-column align-items-center justify-content-center">
								
					{ compteur === 0 ?
						progress === 0 ?
						<Fragment>
							<GoCloudUpload size={80} className=""/>
							<button className="btn btn-dark p-2 text-uppercase rounded-0 mt-3" onClick={(e) => {e.preventDefault(); sendFiles()}}>Envoyer</button>
						</Fragment>
						:
						<UploadBar progress={progress}/>
						:
						<Fragment>
						<input {...getInputProps()} className=""/>
						{
							isDragActive ?
							<p>Déposez {item.faceNumber > 1 ? "vos photos" : "votre photo"} ici.</p> :
							<Fragment>
								<IoMdAdd size={80} className=""/>
								<p>Cliquez ou déposez {item.faceNumber > 1 ? "vos photos" : "votre photo"} ici.</p>
								<p>Photo{files.length > 1 && "s"} : {files.length}/{item.faceNumber}</p>
							</Fragment>
						}
						</Fragment>
					}
					</div>
					
					<div className="upload-details d-flex flex-column col-md-6 p-0">
						<div className="upload-title text-white p-2  bg-dark d-flex justify-content-between align-items-center">
							<h2 className="text-uppercase font-weight-lighter">{item.name} <span className="span-number-file text-lowercase">{item.faceNumber > 1 ? `- (${item.faceNumber} photos)` : `- (${item.faceNumber} photo)` }</span></h2>
							<h6 className={"m-0 " + (item.photoUpload ? "text-success" : "text-danger")}>{ item.photoUpload ? "Complet" : "En attente"}</h6>
						</div>
						<div className="upload-img-container d-flex flex-column align-self-stretch">
							{images}
							{example()}
						</div>
						
					</div>
				</div>
				}
			</Fragment>		
		</div>
		
		</Fragment>
	)
}
