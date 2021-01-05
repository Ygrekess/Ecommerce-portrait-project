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


export default function Upload_Part({item, orderId}) {

/* FILES */
	const [files, setFiles] = useState([]);
	const [compteur, setCompteur] = useState(item.faceNumber);
	const [progress, setProgress] = useState(0);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: "image/*",
		onDrop: (acceptedFiles) => {
			console.log(acceptedFiles)
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

		const itemName = `${item.name}-${uniqid()}`
		const bodyFormData = new FormData();
		files.map(file => {
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
		setCompteur(item.faceNumber - files.length)
	}, [files, progress])

	return (
		<Fragment>
		<div className="upload-part w-100 d-flex flex-column align-items-center justify-content-center my-2">
			{ progress === 100 &&
				<div className="validate-mask d-flex align-items-center justify-content-around w-100">
					<div className="validate-modal m-auto rounded d-flex flex-column justify-content-center align-items-center p-3">
                        <h3>{item.faceNumber > 1 ? "Vos photos ont bien été envoyées !" : "Votre photo a bien été envoyée !"}</h3>
                        <div className="order-check-icon text-success my-3 d-flex justify-content-center w-100">
							<FiCheckSquare size={60}/>
						</div>
                    </div>
				</div>
			}
			<Fragment>
				<div className="d-flex align-items-center justify-content-around w-100">
					<div {...getRootProps()} className="upload-zone col-md-4 m-0 d-flex flex-column align-items-center justify-content-center">
								
					{ compteur === 0 ?
						progress < 100 ?
						<Fragment>
							<GoCloudUpload size={80} className=""/>
							<button className="btn btn-dark p-2 text-uppercase rounded-0 mt-3" onClick={() => sendFiles()}>Envoyer</button>
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
							</Fragment>
						}
						</Fragment>
					}
					</div>
					
					<div className="upload-detail d-flex flex-column col-md-6">
						<h2 className="upload-title bg-dark text-white p-2 text-left text-uppercase font-weight-lighter">{item.name} <span className="span-number-file text-lowercase">{item.faceNumber > 1 ? `- (${item.faceNumber} photos)` : `- (${item.faceNumber} photo)` }</span></h2>
						<div className="upload-img-container d-flex flex-column align-self-stretch">
							{images}
							{example()}
						</div>
						
					</div>
				</div>
			</Fragment>
			
		</div>
		<div className="d-flex">
			<AiOutlineDash size={80} className="outlinedash-icon"/>
			<AiOutlineDash size={80} className="outlinedash-icon"/>
		</div>
		
		</Fragment>
	)
}
