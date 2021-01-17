import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { countCollection } from '../../actions/dataActions';
import { listUsers, resetListUsers } from '../../actions/userActions';
import { ImSpinner8 } from "react-icons/im";
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';

export default function Users(props) {

    const userList = useSelector(state => state.listUsers);
	const { error, loading, users } = userList;
	
    /** Pagination */ 
    const countDb = useSelector(state => state.countData)
	const { count } = countDb;
	
    const totalUsersInDb = count.count;
    const page = props.match.params.page ? props.match.params.page.split("=")[1] : 1;    
    const per_page = 8;
    const skip = (page * per_page) - per_page

	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(countCollection("users"));
        dispatch(listUsers(skip, per_page));
		return () => {
			dispatch(resetListUsers())
		}
	}, [page]);
	
	return (
		<div className="col-8 d-flex flex-column users-page">
			<h4 className="text-left mb-5">Liste utilisateurs</h4>
			{
			loading ? <div className="loading-spinner-div d-flex justify-content-center w-100"><ImSpinner8 className="loading-spinner my-3" size={60} /></div> :
			<table className="table table-striped">
			<thead>
				<tr>
				<th scope="col">ID</th>
				<th scope="col">Prénom</th>
				<th scope="col">Nom</th>
				<th scope="col">Statut</th>
				<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				{
					users.map((user, i)=> (
					<tr key={i}>
						<td>{user._id}</td>
						<td>{user.lastname}</td>
						<td>{user.firstname}</td>
						<td>Client</td>
						<td>
							<Link to={`/admin/liste-utilisateurs/utilisateur/id=${user._id}`} className="btn btn-outline-dark">Détails</Link>
						</td>
					</tr>
					))
				}
			</tbody>
			</table>
			}
            <Pagination url={props.location.pathname} pageName={"admin/liste-utilisateurs"} page={page} totalInDb={totalUsersInDb} per_page={per_page}/>
		</div>
	)
}
