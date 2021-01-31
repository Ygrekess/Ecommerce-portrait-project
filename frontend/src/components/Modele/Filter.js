import React, { Fragment, useState } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import Select from 'react-select'
import '../css/Filter.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

export default function Filter({ props, productStyle, productSize }) {

	const [display, setDisplay] = useState(false);
	const [price, setPrice] = useState({ min: 0, max: 100 });
	const [style, setStyle] = useState(productStyle !== 'all' ? productStyle : '');
	const [size, setSize] = useState(productSize !== 'all' ? productSize : '');

	const optionsStyle = [
		{ value: 'pop art', label: 'Pop art' },
		{ value: 'cartoon', label: 'Cartoon' },
		{ value: '', label: 'Tous' }
	]

	const optionsSize = [
		{ value: '50x50', label: '50x50' },
		{ value: '50x30', label: '50x30' },
		{ value: '30x50', label: '30x50' },
		{ value: '', label: 'Toutes' }
	]

	const submitHandler = () => {
		props.history.push(`/modeles/page=1/style=${style ? style : 'all'}/size=${size ? size : 'all'}/max=${price.max}/min=${price.min}`)
	}

	return (
		<div className={'filter-component ' + (display ? 'filter-display-true' : 'filter-display-false')}>
			<div className='button-display-filter' onClick={() => setDisplay(!display)}>
				Filtrer
			</div>
			{ display ? <IoIosArrowUp onClick={() => setDisplay(!display)}/> : <IoIosArrowDown onClick={() => setDisplay(!display)}/>}
			<div className={'filter-input-container ' + (display ? 'filter-display-true' : 'filter-display-false') }>
				<div className='filter-input-row row justify-content-center align-items-start'>
					<div className='col-md-3 col-10 '>
						<label className='text-left w-100 mb-2'>Style</label>
						<Select
							name="colors"
							options={optionsStyle}
							className="basic-single"
							onChange={(e) => setStyle(e.value)}
						/>
					</div>
					<div className='col-md-3 col-10 '>
						<label className='text-left w-100 mb-2'>Taille</label>
						<Select
							name="colors"
							defaultValue={size}
							options={optionsSize}
							className="basic-single"
							classNamePrefix="select"
							onChange={(e) => setSize(e.value)}
						/>
					</div>
					<div className='col-md-3 col-10 '>
						<label className='text-left w-100 mb-3'>Prix</label>
						<InputRange
							maxValue={100}
							minValue={0}
							value={price}
							onChange={value => setPrice(value)}
						/>
					</div>
					<div className='col-12'>
						<button type='submit' onClick={() => submitHandler()} className='col-2 btn btn-outline-dark rounded-0 mx-auto my-3'>Filtrer</button>
					</div>
					<a href='/modeles/page=1/style=all/size=all/max=100/min=0' className='col-12'>Réinitialiser les filtres</a>
				</div>
				
			</div>		
		</div>
	)
}
