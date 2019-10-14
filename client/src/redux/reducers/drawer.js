import { DRAWER_TOGGLE } from './../actionTypes';

const initialState = {
	right: false,
	left: false
};

export default function drawer(state = initialState, action) {
	switch (action.type) {
		case DRAWER_TOGGLE:
			return { ...state, ...action.payload };

		default:
			return state;
	}
}
