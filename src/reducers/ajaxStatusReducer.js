import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsWithSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}

function actionTypeEndsWithFail(type) {
	return type.substring(type.length - 5) === '_FAIL';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
	if (action.type === types.BEGIN_AJAX_CALL) {
		return state + 1;
	}
	else if (actionTypeEndsWithSuccess(action.type) || actionTypeEndsWithFail(action.type)) {
		return state - 1;
	}

	return state;
}