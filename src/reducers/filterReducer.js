import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filterReducer(state = initialState.filter, action) {
	switch(action.type) {
		case types.LOAD_WINES_SUCCESS: {
			let age = {
				min: Infinity,
				max: 0,
				from: Infinity,
				to: 0,
			};

			let price = {
				min: Infinity,
				max: 0,
				from: Infinity,
				to: 0,
			};

			let country = [];
			let kind = [];
			let color = [];
			let flags = [
				{
					name: 'New only',
					active: false,
				},
				{
					name: 'Available',
					active: false,
				}
			];

			action.wines.forEach(item => {
				// Age
				if (item.age < age.min) {
					age.min = item.age;
					age.from = age.min;
				}
				if (item.age > age.max) {
					age.max = item.age;
					age.to = age.max;
				}

				// Price
				if (item.price < price.min) {
					price.min = item.price;
					price.from = price.min;
				}
				if (item.price > price.max) {
					price.max = item.price;
					price.to = price.max;
				}

				// Kind
				if (!kind.find(el => el.name === item.kind)) {
					if (item.kind !== '') {
						kind.push({
							name: item.kind,
							filterName: 'kind',
							active: false,
						});
					}
				}

				// Country
				if (!country.find(el => el.name === item.country)) {
					if (item.country !== '') {
						country.push({
							name: item.country,
							filterName: 'country',
							active: false,
						});
					}
				}

				// Color
				if (!color.find(el => el.name === item.color)) {
					if (item.color !== '') {
						color.push({
							name: item.color,
							filterName: 'color',
							active: false,
						});
					}
				}
			});

			return {
				price,
				age,
				kind,
				country,
				color,
				flags,
				name: '',
			};
		}

		case types.CHANGE_FILTER: {
			let newFilter = JSON.parse(JSON.stringify(state));
			let index = newFilter[action.payload.filter].findIndex(el => el.name === action.payload.name);

			if (index > -1) {
				let active = newFilter[action.payload.filter][index].active;
				newFilter[action.payload.filter][index].active = !active;
			}

			return newFilter;
		}

		case types.CHANGE_RANGE_FILTER: {
			let newFilter = JSON.parse(JSON.stringify(state));

			newFilter[action.payload.filter].from = action.payload.value.min;
			newFilter[action.payload.filter].to = action.payload.value.max;

			return newFilter;
		}

		case types.CHANGE_NAME_FILTER: {
			let newFilter = JSON.parse(JSON.stringify(state));

			newFilter.name = action.payload.value;

			return newFilter;
		}

		case types.RESET_FILTER: {
			let newFilter = JSON.parse(JSON.stringify(state));

			// Reset age
			newFilter.age.from = newFilter.age.min;
			newFilter.age.to = newFilter.age.max;

			// Reset price
			newFilter.price.from = newFilter.price.min;
			newFilter.price.to = newFilter.price.max;

			// Reset name
			newFilter.name = '';

			// Reset kind
			newFilter.kind.forEach((item) => {
				item.active = false;
			});

			// Reset country
			newFilter.country.forEach((item) => {
				item.active = false;
			});

			// Reset color
			newFilter.color.forEach((item) => {
				item.active = false;
			});

			// Reset flags
			newFilter.flags.forEach((item) => {
				item.active = false;
			});

			return newFilter;
		}


		default:
			return state;
	}
}
