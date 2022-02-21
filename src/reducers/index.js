import { combineReducers } from 'redux';
import wines from './winesReducer';
import filter from './filterReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import sidebarOpenState from './sidebarOpenStateReducer';

const rootReducer = combineReducers({
	wines,
	filter,
	ajaxCallsInProgress,
	sidebarOpenState,
});

export default rootReducer;