const initialState = {
	truc: false
};
export default (state = initialState, action) => {
	return { ...state, ...action.payload };
};
