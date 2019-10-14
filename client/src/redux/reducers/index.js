import { combineReducers } from 'redux';
import drawer from './drawer';
import user from './user';

const reducers = combineReducers({
	drawer,
	user
});

export default reducers;
