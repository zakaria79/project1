import React, { useEffect } from 'react';
import PrimarySearchAppBar from './components/app-bar/AppBar';
import Drawer from './components/drawer/Drawer';
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
	const { user } = props;
	console.log(user);
	useEffect(
		() => {
			const fetchUser = () => {
				window.onSignIn = (googleUser) => {
					var profile = googleUser.getBasicProfile();
					var id_token = googleUser.getAuthResponse().id_token;
					console.log('token: ' + id_token);
					console.log(profile);
					console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
					console.log('Name: ' + profile.getName());
					console.log('Image URL: ' + profile.getImageUrl());
					console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
				};
			};
			fetchUser();
		},
		[ user ]
	);
	return (
		<div className="App">
			<PrimarySearchAppBar />
			<Drawer />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(App);
