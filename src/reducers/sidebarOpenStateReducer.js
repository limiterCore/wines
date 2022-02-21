import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function sidebarOpenStateReducer(state = initialState.isSidebarOpen, action) {
	switch(action.type) {
		case types.OPEN_WINE:
			return false;

		case types.OPEN_SIDEBAR:
			return true;

		case types.CLOSE_SIDEBAR:
			return false;

		default:
			return state;
	}
}
