import * as types from './actionTypes';
import winesApi from '../api/winesApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadWinesSuccess(wines) {
	return { type: types.LOAD_WINES_SUCCESS, wines};
}

export function loadWines(token) {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return winesApi.getAll(token).then(items => {
			dispatch(loadWinesSuccess(items));
		}).catch(error => {
			throw(error);
		});
	};
}

export function openWine() {
	return { type: types.OPEN_WINE };
}

export function openSidebar() {
	return { type: types.OPEN_SIDEBAR };
}

export function closeSidebar() {
	return { type: types.CLOSE_SIDEBAR };
}