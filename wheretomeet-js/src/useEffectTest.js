import React from 'react';

const url = 'localhost:8080/users';

const useEffectTest = () => {
	const [users, setUsers] = React.useState([]);

	const getUsers = async () => {
		const response = await fetch(url);
		const users = await response.json();
		setUsers(users);
	}

	React.useEffect(() => {
		getUsers();
	}, []);

	return(<>
	<ul>
		{users.map((acc) => {
			const {id, user, password} = acc;
			return <li key = {id}>{`${user}, ${password}`}</li>
		})}
	</ul>
	</>)

}

export default useEffectTest;