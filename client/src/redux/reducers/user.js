import { arrowFunctionExpression } from '@babel/types';
import { FETCH_USER } from './../actionTypes';

const initialState = {
	isLoggedIn: false,
	name: 'Anonymous'
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return { ...state, ...action.payload };

		default:
			return state;
	}
};

export default user;
