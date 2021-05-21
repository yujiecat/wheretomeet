import React from 'react';

const url = '/users';

const useEffectTest = () => {
	const [users, setUsers] = React.useState([]);

	const getUsers = async () => {
		const response = await fetch(url);
		const users = await response.json();
		setUsers(users);
		console.log(users);
	}

	React.useEffect(() => {
		getUsers();
	}, []);

	return(<>
	<ul>
		{users.map((acc) => {
			const {username, userId, password} = acc;
			return(<li key= {userId}>{`${username}, ${password}`}</li>);
		})}
	</ul>
	</>);

}


export default useEffectTest;