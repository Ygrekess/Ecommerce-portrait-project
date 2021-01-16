import React, { useState } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import ReactDOM from 'react-dom';
export default function Filter({ props, page, productStyle, productSize }) {

	const styleDiv = {
		height: '5rem',
		width: '100%'
	}
	const [test, setTest] = useState({ min: 2, max: 10 });

	const [style, setStyle] = useState(productStyle !== 'all' ? productStyle : '');
	const [size, setSize] = useState(productSize !== 'all' ? productSize : '');

	const submitHandler = (e) => {
		e.preventDefault();
		props.history.push(`/modeles/page=${page}/style=${style ? style : 'all'}/size=${size ? size : 'all'}`)
		console.log(props)
	}


	return (
		<div style={styleDiv}>

			<form onSubmit={submitHandler}>
				<div className="d-flex justify-content-around">

					
					<div className="input-group col-4">
						<label>Style</label>
						<input
							onChange={(e) => setStyle(e.target.value)}
						/>
					</div>

					<div className="input-group col-4">
						<label>Size</label>
						<input
							onChange={(e) => setSize(e.target.value)}
						/>
					</div>
					<div className="input-group col-6 row align-items-center">
					<InputRange
						maxValue={20}
						minValue={0}
						value={test}
						onChange={value => setTest(value)}
					/>
					</div>
					<button type='submit' className='btn btn-primary mt-auto'>Valider</button>
				</div>
			</form>
		</div>
	)
}
