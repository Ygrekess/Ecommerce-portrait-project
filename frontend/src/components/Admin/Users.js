import React from 'react'

export default function Users() {
	return (
		<div className="col-8">
			<h4 className="text-left mb-5">Liste utilisateurs</h4>
			<table className="table table-striped">
			<thead>
				<tr>
				<th scope="col">#</th>
				<th scope="col">Prénom</th>
				<th scope="col">Nom</th>
				<th scope="col">Statut</th>
				<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<th scope="row">1</th>
				<td>Mark</td>
				<td>Otto</td>
				<td>Client</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
				<tr>
				<th scope="row">2</th>
				<td>Jacob</td>
				<td>Thornton</td>
				<td>Admin</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
				<tr>
				<th scope="row">3</th>
				<td>Larry</td>
				<td>the Bird</td>
				<td>Client</td>
				<td>
					<button className="btn btn-outline-dark">Détails</button>
				</td>
				</tr>
			</tbody>
			</table>			
		</div>
	)
}
