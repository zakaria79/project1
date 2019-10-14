import { DRAWER_TOGGLE } from './../actionTypes';

export const drawerToggle = (side, open) => {
	return (dispatch) => {
		dispatch({ type: DRAWER_TOGGLE, payload: { [side]: open } });
	};
};
