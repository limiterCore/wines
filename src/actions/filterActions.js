import * as types from './actionTypes';

export function updateFilter(filter, name) {
	return {
		type: types.CHANGE_FILTER,
		payload: {
			filter,
			name,
		},
	};
}

export function updateRangeFilter(filter, value) {
	return {
		type: types.CHANGE_RANGE_FILTER,
		payload: {
			filter,
			value,
		},
	};
}

export function updateNameFilter(value) {
	return {
		type: types.CHANGE_NAME_FILTER,
		payload: {
			value,
		},
	};
}

export function resetAllFilters() {
	return { type: types.RESET_FILTER };
}

export function updateWines(filter) {
	return {
		type: types.FILTER_WINES,
		payload: {
			filter,
		},
	};
}

export function changeFilter(filter, name) {
	return function(dispatch, getState) {
		dispatch(updateFilter(filter, name));
		let { filter: stateFilter } = getState();
		dispatch(updateWines(stateFilter));
	};
}

export function changeRangeFilter(filter, value) {
	return function(dispatch, getState) {
		dispatch(updateRangeFilter(filter, value));
		let { filter: stateFilter } = getState();
		dispatch(updateWines(stateFilter));
	};
}

export function changeNameFilter(value) {
	return function(dispatch, getState) {
		dispatch(updateNameFilter(value));
		let { filter: stateFilter } = getState();
		dispatch(updateWines(stateFilter));
	};
}

export function resetFilter() {
	return function(dispatch, getState) {
		dispatch(resetAllFilters());
		let { filter: stateFilter } = getState();
		dispatch(updateWines(stateFilter));
	};
}