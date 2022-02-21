// Core
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Actions
import { openWine } from '../../actions/wineActions';

// Misc
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class Wines extends Component {
	constructor(props) {
		super(props);

		this.onLinkClick = this.onLinkClick.bind(this);
	}

	onLinkClick() {
		this.props.openWine();
	}

	render() {
		const wines = this.props.wines;

		return (
			<div className="main-content">
				<div className="main-content__container">
					<div className="wines">
						<div className="wines__list">

							{wines && wines.length > 0 && wines.map(item =>
								!item.hidden &&
								<Link
									to={"/wines/" + item.id}
									className="wines__item"
									key={item.id}
									onClick={this.onLinkClick}
								>
									<div className="wines__item-image" style={{backgroundImage: 'url(' + item.thumbnail[0] + ')'}}>
										<div className="wines__item-flags">
											{item.new &&
											<div className="wines__item-new">new</div>
											}
											{item.available &&
											<div className="wines__item-wt">available</div>
											}
										</div>
									</div>
									<p className="wines__item-name">{entities.decode(item.title.rendered)}</p>
									<div className="wines__item-features">
										<div className="wines__item-feature">
											<span className="wines__item-feature-title">From</span>
											<span className="wines__item-feature-value">{item.country}</span>
										</div>
										<div className="wines__item-feature">
											<span className="wines__item-feature-title">Age</span>
											<span className="wines__item-feature-value">{item.age}</span>
										</div>
										<div className="wines__item-feature">
											<span className="wines__item-feature-title">Price</span>
											<span className="wines__item-feature-value">${item.price}</span>
										</div>
										<div className="wines__item-feature">
											<span className="wines__item-feature-title">Kind</span>
											<span className="wines__item-feature-value">{item.kind}</span>
										</div>
										<div className="wines__item-feature">
											<span className="wines__item-feature-title">Color</span>
											<span className="wines__item-feature-value">{item.color}</span>
										</div>
									</div>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Wines.propTypes = {
	wines: PropTypes.array.isRequired,
	openWine: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		wines: state.wines,
	};
}

const mapDispatchToProps = {
	openWine: openWine,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wines);