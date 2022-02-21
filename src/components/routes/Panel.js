// Core
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Actions
import { openSidebar, loadWines, closeSidebar } from '../../actions/wineActions';
import { changeRangeFilter, changeFilter, changeNameFilter, resetFilter } from '../../actions/filterActions';

// Components
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteTransition } from 'react-router-transition';

// Misc
import classNames from 'classnames';
import InputRange from 'react-input-range';

// CSS
import '../../css/main.less';

class Panel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSidebarOpen: false,
			age: {},
			price: {},
			initialPropsReceiving: false,
			searchValue: '',
		};

		this.props.loadWines();

		this.openSidebar = this.openSidebar.bind(this);
		this.closeSidebar = this.closeSidebar.bind(this);

		this.changeSearchValue = this.changeSearchValue.bind(this);
		this.eraseSearch = this.eraseSearch.bind(this);
		this.resetFilters = this.resetFilters.bind(this);
	}

	openSidebar() {
		this.props.openSidebar();
		this.setState({
			sidebarOpen: true,
		});
	}

	closeSidebar() {
		this.props.closeSidebar();
		this.setState({
			sidebarOpen: false,
		});
	}

	changeFilter(filterName, value) {
		this.props.changeFilter(filterName, value);
	}

	changeRangeFilter(filterName, value, updateFilter = false) {
		this.setState({
			[filterName]: value,
		});

		if (updateFilter) {
			this.props.changeRangeFilter(filterName, value);
		}
	}

	resetFilters() {
		this.setState({
			age: Object.assign({}, this.props.filter.age),
			price: Object.assign({}, this.props.filter.price),
			searchValue: '',
		});

		this.props.resetFilter();
	}

	changeSearchValue(e) {
		this.setState({
			searchValue: e.target.value,
		});

		this.props.changeNameFilter(e.target.value);
	}

	eraseSearch() {
		if (this.state.searchValue !== '') {
			this.setState({
				searchValue: '',
			});

			this.props.changeNameFilter('');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.filter !== this.props.filter && !this.state.initialPropsReceiving) {
			const { filter } = nextProps;
			this.setState({
				age: Object.assign({}, filter.age),
				price: Object.assign({}, filter.price),
				initialPropsReceiving: true,
			});
		}
		if (nextProps.isSidebarOpen !== this.state.isSidebarOpen) {
			this.setState({
				isSidebarOpen: nextProps.isSidebarOpen,
			});
		}
	}

	render() {
		let sidebarClass = classNames({
			"main-sidebar": true,
			"open": this.state.isSidebarOpen,
		});

		const filter = this.props.filter;

		let popStateStyles = {
			atEnter: {
				translateX: -100,
				opacity: 0,
			},
			atLeave: {
				translateX: 100,
				opacity: 0,
			},
			atActive: {
				translateX: 0,
				opacity: 1,
			},
			mapStyles: styles => ({
				transform: `translateX(${styles.translateX}%)`,
				opacity: styles.opacity,
			}),
			className: classNames({
				"main-content-wrapper": true,
				"main-content-wrapper_shifted": this.state.isSidebarOpen,
			}),
		};

		let pushStateStyles = {
			atEnter: {
				translateX: 100,
				opacity: 0,
			},
			atLeave: {
				translateX: -100,
				opacity: 0,
			},
			atActive: {
				translateX: 0,
				opacity: 1,
			},
			mapStyles: styles => ({
				transform: `translateX(${styles.translateX}%)`,
				opacity: styles.opacity,
			}),
			className: classNames({
				"main-content-wrapper": true,
				"main-content-wrapper_shifted": this.state.isSidebarOpen,
			}),
		};

		let transitionStyles = this.props.location.action === 'POP'
			? popStateStyles
			: pushStateStyles;

		return (
			<div className="all-wrap">
				<aside
					className={sidebarClass}
				>
					<div className="main-sidebar__inactive">
						{this.props.location.pathname === '/' &&
						<button
							className="main-sidebar__open-filters"
							onClick={this.openSidebar}
						/>
						}

						{this.props.location.pathname !== '/' &&
						<button
							className="main-sidebar__back"
							onClick={browserHistory.goBack}
						>

						</button>
						}
					</div>

					{/*FILTERS*/}
					<div className="filters">

						{/*SEARCH*/}
						<div
							className={classNames({
								"filters__search": true,
								"filled": this.state.searchValue !== '',
							})}
						>
							<div className="filters__search-input-holder">
								<input
									type="text"
									className="filters__search-input"
									placeholder="Search wine by Name"
								    value={this.state.searchValue}
								    onChange={this.changeSearchValue}
								/>
							</div>
							<button
								className="filters__search-button"
							    onClick={this.eraseSearch}
							/>
						</div>
						{/*/SEARCH*/}

						{/*AGE*/}
						<div className="filters__section js-filters-section">
							<h3 className="filters__section-title">Age</h3>

							{filter.age &&
							<div className="filters__range-container" data-min={filter.age.min} data-max={filter.age.max}>
								<InputRange
									minValue={filter.age.min}
									maxValue={filter.age.max}
									value={this.state.age}
									onChange={value => this.changeRangeFilter('age', value)}
									onChangeComplete={value => this.changeRangeFilter('age', value, true)}
								/>
							</div>
							}
						</div>
						{/*/AGE*/}

						{/*PRICE*/}
						<div className="filters__section js-filters-section">
							<h3 className="filters__section-title">Price</h3>

							{filter.price &&
								<div className="filters__range-container" data-min={filter.price.min} data-max={filter.price.max}>
									<InputRange
										minValue={filter.price.min}
										maxValue={filter.price.max}
										value={this.state.price}
										onChange={value => this.changeRangeFilter('price', value)}
										onChangeComplete={value => this.changeRangeFilter('price', value, true)}
									/>
								</div>
							}
						</div>
						{/*/PRICE*/}

						{/*KIND*/}
						<div className="filters__section js-filters-section">
							<h3 className="filters__section-title">Kind</h3>

							<div className="filters__options-container">
								{filter.kind && filter.kind.map((item, index) => (
									<div
										className={classNames({
											"filters__option": true,
											"active": item.active,
										})}
										key={index}
									    onClick={this.changeFilter.bind(this, "kind", item.name)}
									>
										{item.name}
									</div>
								))}
							</div>
						</div>
						{/*/KIND*/}

						{/*COUNTRY*/}
						<div className="filters__section js-filters-section">
							<h3 className="filters__section-title">Country</h3>

							<div className="filters__options-container">
								{filter.country && filter.country.map((item, index) => (
									<div
										className={classNames({
											"filters__option": true,
											"active": item.active,
										})}
										key={index}
										onClick={this.changeFilter.bind(this, "country", item.name)}
									>
										{item.name}
									</div>
								))}
							</div>
						</div>
						{/*/COUNTRY*/}

						{/*COLOR*/}
						<div className="filters__section js-filters-section">
							<h3 className="filters__section-title">Color</h3>

							<div className="filters__options-container">
								{filter.color && filter.color.map((item, index) => (
									<div
										className={classNames({
											"filters__option": true,
											"active": item.active,
										})}
										key={index}
										onClick={this.changeFilter.bind(this, "color", item.name)}
									>
										{item.name}
									</div>
								))}
							</div>
						</div>
						{/*/COLOR*/}

						{/*RESET*/}
						<div className="filters__reset">
							<button
								className="filters__reset-button"
								onClick={this.resetFilters}
							>
								<div className="filters__reset-container">
									Reset all filters
								</div>
							</button>
						</div>
						{/*/RESET*/}

					</div>
					{/*/FILTERS*/}
				</aside>

				<button
					className={classNames({
						"main-sidebar__close": true,
						"visible": this.state.isSidebarOpen,
					})}
					onClick={this.closeSidebar}
				/>

				<RouteTransition
					pathname={this.props.location.pathname}
					{...transitionStyles}

				>
					{this.props.children}
				</RouteTransition>

				{this.props.loading > 0 && <LoadingSpinner/>}

				<div className="rotate-device"/>
			</div>
		);
	}
}

Panel.propTypes = {
	loading: PropTypes.number.isRequired,
	filter: PropTypes.object.isRequired,
	loadWines: PropTypes.func.isRequired,
	openSidebar: PropTypes.func.isRequired,
	closeSidebar: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
	changeNameFilter: PropTypes.func.isRequired,
	changeRangeFilter: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		loading: state.ajaxCallsInProgress,
		filter : state.filter,
		isSidebarOpen: state.sidebarOpenState,
	};
}

const mapDispatchToProps = {
	loadWines: loadWines,
	openSidebar: openSidebar,
	closeSidebar: closeSidebar,
	changeFilter: changeFilter,
	resetFilter: resetFilter,
	changeNameFilter: changeNameFilter,
	changeRangeFilter: changeRangeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
