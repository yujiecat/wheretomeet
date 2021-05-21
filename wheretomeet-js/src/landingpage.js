import React from 'react';
import UseEffectTest from './useEffectTest';

const LandingPage = () => {

	const[title, setTitle] = React.useState('Where to Meet');
	const[text, setText] = React.useState('A simple way to organize meetups.')

	const login = (props) => {
		setTitle(props);
		setText();
		document.title = 'Login';
	}

	return (<>
	
	<section style = {{margin: '10%'}}>
		<h2>{title}</h2>
		<p>{text}</p>
		<button type="button" class="btn btn-primary btn-lg" onClick = {() => login('Login')} >Sign Up/Sign In</button>
		<button type="button" class="btn btn-secondary btn-lg" disabled>Create Group</button>
		<UseEffectTest />
	</section>

	</>)

}

export default LandingPage;