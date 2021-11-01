function initOurWorksSlider() {
	const ourWorksSliderContainer = document.querySelector('.our-works__container');
	const normalContainer = document.querySelector('.first-screen .container');
	const containerResizeObserver = new ResizeObserver((entries) => {
		for (let entry of entries) {
			const styles = window.getComputedStyle(normalContainer);
			const marginLeft = parseInt(styles.marginLeft);
			const paddingLeft = parseInt(styles.paddingLeft);

			ourWorksSliderContainer.style.marginLeft = marginLeft + paddingLeft + 'px';
		}
	});

	const ourWorksSlider = new Swiper('.our-works__slider', {
		loop: true,
		slidesPerView: 1.35,
		spaceBetween: 20,
		simulateTouch: false,
		centeredSlides: true,

		breakpoints: {
			479: {
				slidesPerView: 1.2,
				centeredSlides: true,
			},
			575: {
				slidesPerView: 2,
				centeredSlides: false,
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 40,
				centeredSlides: false,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// simulate navigation btns
	// ==========================================
	const next = document.querySelector('.our-works__navigation-next');
	const prev = document.querySelector('.our-works__navigation-prev');
	const btnsContainer = document.querySelector('.our-works__navigation-btns');
	const realSlides = document.querySelectorAll('.our-works__slider .our-works__item:not(.swiper-slide-duplicate)');
	const previewContainer = document.querySelector('.our-works__element-preview');

	function previewSlide() {
		const activeSlide = document.querySelector(' .our-works__slider .our-works__item.swiper-slide-active');
		const activeSlideSwiperIndex = activeSlide.dataset.swiperSlideIndex;
		// number 2 hear means slidesPerView
		const previewSlideSwiperIndex = (activeSlideSwiperIndex + 2) % realSlides.length;
		const previewSlide = document.querySelector(`.our-works__slider .our-works__item:not(.swiper-slide-duplicate)[data-swiper-slide-index="${previewSlideSwiperIndex}"]`);
		previewContainer.innerHTML = previewSlide.innerHTML;
	}

	previewSlide();

	function simulateNavigationBtns(target) {
		if (target === prev) {
			ourWorksSlider.slidePrev();
			previewSlide();
		} else if (target === next) {
			ourWorksSlider.slideNext();
			previewSlide();
		}
	}

	btnsContainer.addEventListener('click', function (e) {
		simulateNavigationBtns(e.target);
	});

	function initMobile() {
		containerResizeObserver.unobserve(document.body);
		ourWorksSliderContainer.style.marginLeft = '0px';
		ourWorksSliderContainer.style.marginRight = '0px';
	}

	function initDesktop() {
		containerResizeObserver.observe(document.body);
		ourWorksSliderContainer.style.marginRight = '25px';
	}

	const mediaQuery = '(max-width: 991px)';
	const mediaQueryList = window.matchMedia(mediaQuery);

	if (mediaQueryList.matches) {
		initMobile();
	} else {
		initDesktop();
	}

	mediaQueryList.addEventListener('change', (event) => {
		if (event.matches) {
			initMobile();
		} else {
			initDesktop();
		}
	});
}

initOurWorksSlider();
