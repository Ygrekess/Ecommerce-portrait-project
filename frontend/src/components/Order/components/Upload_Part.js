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
import { importImage } from '../../../actions/orderActions';
import { useDispatch } from 'react-redux';
import '../../css/Upload_Part.css'


export default function Upload_Part({order, item, orderId, userId}) {

	const dispatch = useDispatch();
/* FILES */
	const [files, setFiles] = useState([]);
	const [compteur, setCompteur] = useState(item.photoUpload === true ? 0 : item.face);
	const [progress, setProgress] = useState(item.photoUpload === true ? 100 : 0);

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
			<img src={file.preview} className="col-md-4"/>
			<div className="img-detail text-left col-md-6">
				<h6 className="img-name">Nom : {file.name}</h6>
				<h6 className="">Format : {file.type.split('/')[1]}</h6>
				<h6>Taille : {formatBytes(file.size)}</h6>
			</div>
			<GoTrashcan size={24} className="icon-close col-2" onClick={() => removeFile(file._id)} />
		</div>
	))

	const sendFiles = async () => {
		const folderName = `${item.name}-${item.cartItemId}`
		const bodyFormData = new FormData();
		const filesName = [];
		files.map(file => {
			filesName.push(file.name)
			bodyFormData.append('image', file)
		})
	
		try {
			const { data } = await Axios.post(`/api/upload/${orderId}&${folderName}`, bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
				}
			});
			console.log(filesName)
			dispatch(importImage(userId, orderId, folderName, filesName))
			
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
			setCompteur(item.face - files.length)
		}
	}, [files])

	return (
		<Fragment>
		<div className="upload-part w-100 d-flex flex-column align-items-center justify-content-center p-0 mb-5 border-bottom">
			<Fragment>
				<div className="upload-part-order-resume d-flex p-3 mb-5">
					<div className="upload-part-order-resume-img m-auto">
						<img src={item.image} />
					</div>
					<div className="col-md-7 col-12 p-3 order-infos d-flex flex-column justify-content-center text-left ml-3">
						<h4>{item.name.split('-')[0]}<span className='font-weight-lighter text-capitalize'> - {item.name.split('-')[1]}</span></h4>
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
				<div className="upload-part-content d-flex align-items-center justify-content-between col-12 mx-0 my-5">
					<div {...getRootProps()} onSubmit={() => console.log("submit")} className="upload-zone col-md-5 col-12 d-flex flex-column align-items-center justify-content-center">
								
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
						<input {...getInputProps()} className="col-12"/>
						{
							isDragActive ?
							<p>Déposez {item.face > 1 ? "vos photos" : "votre photo"} ici.</p> :
							<Fragment>
								<IoMdAdd size={80} className=""/>
								<p>Cliquez ou déposez {item.face > 1 ? "vos photos" : "votre photo"} ici.</p>
								<p>Photo{files.length > 1 && "s"} : {files.length}/{item.face}</p>
							</Fragment>
						}
						</Fragment>
					}
					</div>
					
					<div className="upload-details d-flex flex-column col-md-6 col-12 p-0">
						<div className="upload-title text-white p-2  bg-dark d-flex justify-content-between align-items-center">
							<h2 className="text-uppercase font-weight-lighter text-justify">{item.name.split('-')[0]}<span className='font-weight-lighter text-capitalize'> - {item.name.split('-')[1]}</span><br/><span className="span-number-file text-lowercase">{item.face > 1 ? `(${item.face} photos)` : `(${item.face} photo)` }</span></h2>
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
