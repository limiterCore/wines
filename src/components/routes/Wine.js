import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Swiper
import Swiper from 'swiper-r';

// Misc
import { animateScroll } from 'react-scroll';
import classNames from 'classnames';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

// Image loader
let Preload = require('react-preload').Preload;

const loadingIndicator = (
	<div className="wine__photos wine__photos_hor">
		<div className="wine__photo">
			<img src="/ajax-loader.gif" alt=""/>
		</div>
		<div className="wine__photo">
			<img src="/ajax-loader.gif" alt=""/>
		</div>
		<div className="wine__photo">
			<img src="/ajax-loader.gif" alt=""/>
		</div>
	</div>
);

class Wine extends Component {
	constructor(props) {
		super(props);
		animateScroll.scrollToTop({
			duration: 2,
		});
	}

	render() {
		let wine = this.props.wines.find(el => el.id === parseInt(this.props.params.wineId, 10));
		if (!wine) {
			return null;
		}

		return (
			<div className="main-content">
				<div className="main-content__container">

					<div className="wine">
						<div className="wine__title">
							<div className="wine__name">{entities.decode(wine.title.rendered)}</div>
							{wine['new'] && <div className="wine__flag-new">new</div>}
							{wine['available'] && <div className="wine__flag-wt">available</div>}
						</div>

						{/*PHOTOS*/}
						{wine.gallery && wine.gallery.length > 0 && (
							<Preload
								loadingIndicator={loadingIndicator}
								images={wine.gallery}
								autoResolveDelay={3000}
								resolveOnError={true}
								mountChildren={true}
							>
								<div className="wine__photos">
									<Swiper
										className="wine__photos"
										swiperConfig={{
											centeredSlides: true,
											slidesPerView: 'auto',
											spaceBetween: 15,
											initialSlide: Math.ceil(wine.gallery.length / 2),
											prevButton: false,
											nextButton: false,
											freeMode: false,
											scrollbar: null,
											loop: true,
											loopAdditionalSlides: 2,
										}}
									>
										{wine.gallery.map((item, index) => (
											<div
												className="wine__photo"
												key={index}
													style={{backgroundImage: `url(${item})`}}
											/>
										))}
									</Swiper>
								</div>
							</Preload>
						)}
						{/*/PHOTOS*/}

						{/*FEATURES*/}
						<div className="wine__features">
							<div className="wine__feature">
								<span className="wine__feature-title">Age</span>
								<span className="wine__feature-value">{wine.age}</span>
							</div>
							<div className="wine__feature">
								<span className="wine__feature-title">Kind</span>
								<span className="wine__feature-value">{wine.kind}</span>
							</div>
							<div className="wine__feature">
								<span className="wine__feature-title">Price</span>
								<span className="wine__feature-value">${wine.price}</span>
							</div>
							<div className="wine__feature">
								<span className="wine__feature-title">From</span>
								<span className="wine__feature-value">{wine.country}</span>
							</div>
						</div>
						{/*/FEATURES*/}

						{/*ABOUT*/}
						{Boolean(wine.content) && Boolean(wine.content.rendered) &&
						<div className="wine__about">
							<h2 className="wine__middle-title">About wine</h2>
							<div className="wine__text">
								{wine.content.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
							</div>
						</div>
						}
						{/*/ABOUT*/}

					</div>
				</div>
			</div>
		)
	}
}

Wine.PropTypes = {
	wines: PropTypes.array.isRequired,
	filter: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		wines: state.wines,
		filter: state.filter,
	};
}

export default connect(mapStateToProps)(Wine);