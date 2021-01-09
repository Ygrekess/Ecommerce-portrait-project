import React from 'react'

export default function Orders() {
	return (
		<div className="col-8">
			<h4 className="text-left mb-5">Liste commandes</h4>
			<table className="table table-striped">
			<thead>
				<tr>
				<th scope="col">#</th>
				<th scope="col">_id</th>
				<th scope="col">Montant</th>
				<th scope="col">Date</th>
				<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<th scope="row">1</th>
				<td>1234533</td>
				<td>49.99€</td>
				<td>12/05/2021</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
				<tr>
				<th scope="row">2</th>
				<td>1234533</td>
				<td>49.99€</td>
				<td>12/05/2021</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
				<tr>
				<th scope="row">3</th>
				<td>1234533</td>
				<td>49.99€</td>
				<td>12/05/2021</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
			</tbody>
			</table>			
		</div>
	)
}
