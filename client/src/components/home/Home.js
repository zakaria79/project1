import React from 'react';

const Home = (props) => {
	return (
		<div className="Home">
			<h1 style={{ textAlign: 'center' }}>OZ Application</h1>
			<div style={{ display: 'flex', height: '8vh', alignItems: 'center', justifyContent: 'center' }}>
				<div className="g-signin2" data-onsuccess="onSignIn" />
			</div>
		</div>
	);
};

export default Home;
