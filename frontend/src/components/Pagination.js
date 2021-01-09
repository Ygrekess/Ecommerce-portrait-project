import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination({pageName, page, totalProductsInDb, per_page}) {
	return (
		<div className="row justify-content-between my-5 mt-auto">
			{Number(page) > 1 ?
				<Link to={`/${pageName}/page=` + (Number(page) - 1)} className="btn btn-primary">Précedent</Link>
				: null
			}
			{ Number(page) < Math.floor((totalProductsInDb/per_page) + 1) ? 
				<Link to={`/${pageName}/page=` + (Number(page) + 1)} className="btn btn-outline-primary ml-auto">Suivant</Link>
				: null
			}
		</div>
	)
}
