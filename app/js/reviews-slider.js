function initReviewsSlider() {
	const slider = new Swiper('.reviews__slider', {
		slidesPerView: 1.3,
		centeredSlides: true,
		spaceBetween: 20,
		simulateTouch: false,

		breakpoints: {
			479: {
				slidesPerView: 2,
				spaceBetween: 30,
				centeredSlides: true,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 40,
				centeredSlides: true,
			},
			767: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			991: {
				slidesPerView: 4,
				spaceBetween: 70,
			},
		},

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}

initReviewsSlider();
