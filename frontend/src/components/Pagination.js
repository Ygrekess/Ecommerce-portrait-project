import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Pagination({ url, pageName, page, totalInDb, per_page }) {
	
	const queryFilter = url.split(`page=${page}`)[1] ? url.split(`page=${page}`)[1] : '';

	useEffect(() => {
		console.log(queryFilter)
		return () => {
		}
	}, [])

	return (
		<div className="row justify-content-between my-5 mt-auto">
			{Number(page) > 1 ?
				<Link to={`/${pageName}/page=` + (Number(page) - 1) + queryFilter} className="btn btn-primary">Précedent</Link>
				: null
			}
			{ Number(page) < Math.round((totalInDb/per_page)) ? 
				<Link to={`/${pageName}/page=` + (Number(page) + 1) + queryFilter} className="btn btn-outline-primary ml-auto">Suivant</Link>
				: null
			}
		</div>
	)
}
