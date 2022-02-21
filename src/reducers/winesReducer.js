import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function winesReducer(state = initialState.wines, action) {
	switch(action.type) {
		case types.LOAD_WINES_SUCCESS:
			return action.wines;

		case types.FILTER_WINES:
			let wines = JSON.parse(JSON.stringify(state));
			let filter = action.payload.filter;

			let newWines;

			// Reset hidden state
			wines.forEach((el, elIndex) => {
				wines[elIndex].hidden = false;
			});

			// Kind
			let actives = [];
			filter.kind.forEach(fitem => {
				if (fitem.active) {
					actives.push(fitem.name);
				}
			});
			if (actives.length > 0) {
				wines.forEach((el, elIndex) => {
					let index = actives.indexOf(el.kind);
					wines[elIndex].hidden = index === -1;
				});

				newWines = [...wines];
			}
			else {
				wines.forEach((el, elIndex) => {
					wines[elIndex].hidden = false;
				});
				newWines = [...wines];
			}

			// Country
			actives = [];
			filter.country.forEach(fitem => {
				if (fitem.active) {
					actives.push(fitem.name);
				}
			});
			if (actives.length > 0) {
				newWines.forEach((el, elIndex) => {
					let index = actives.indexOf(el.country);
					if (index === -1) {
						newWines[elIndex].hidden = true;
					}
				});
			}

			// Color
			actives = [];
			filter.color.forEach(fitem => {
				if (fitem.active) {
					actives.push(fitem.name);
				}
			});
			if (actives.length > 0) {
				newWines.forEach((el, elIndex) => {
					let index = actives.indexOf(el.color);
					if (index === -1) {
						newWines[elIndex].hidden = true;
					}
				});
			}

			// Age
			newWines.forEach((el, elIndex) => {
				if (el.age < filter.age.from || el.age > filter.age.to) {
					newWines[elIndex].hidden = true;
				}
			});

			// Price
			newWines.forEach((el, elIndex) => {
				if (el.price < filter.price.from || el.price > filter.price.to) {
					newWines[elIndex].hidden = true;
				}
			});

			// Name
			if (filter.name !== '') {
				newWines.forEach((el, elIndex) => {
					if (el.title.rendered.toLowerCase().indexOf(filter.name.toLowerCase()) === -1) {
						newWines[elIndex].hidden = true;
					}
				});
			}

			return newWines;


		default:
			return state;
	}
}
