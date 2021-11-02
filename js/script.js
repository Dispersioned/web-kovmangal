const ibgInit = function () {
	function imgToWebp(src) {
		const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

		for (const imgType of imgTypes) {
			if (src.includes(imgType)) {
				return src.replace(imgType, 'webp');
			}
		}
	}

	function ibg() {
		const ibg = document.querySelectorAll('.ibg');

		for (let i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				const src = imgToWebp(ibg[i].querySelector('img').getAttribute('src'));
				ibg[i].style.backgroundImage = 'url(' + src + ')';
			}
		}
	}

	ibg();
};

ibgInit();
;
const modifiersInit = function () {
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	testWebP(function (support) {
		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	let isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		},
	};

	let body = document.querySelector('body');
	if (isMobile.any()) {
		body.classList.add('touch');
	} else {
		body.classList.add('mouse');
	}

	if (body.classList.contains('mouse')) {
		// Let the document know when the mouse is being used
		document.body.addEventListener('mousedown', function (e) {
			document.body.classList.add('using-mouse');
		});

		// Re-enable focus styling when Tab is pressed
		document.body.addEventListener('keydown', function (e) {
			if (event.keyCode === 9) {
				document.body.classList.remove('using-mouse');
			}
		});
	}
};

modifiersInit();
;
const burgerInit = function () {
	const burgerTrigger = document.querySelector('.header__burger');
	const burgerIcon = document.querySelector('.header__burger-icon');
	const headerBurgerTitle = document.querySelector('.header__burger-title');
	const burgerBody = document.querySelector('.header__nav');
	const headerContacts = document.querySelector('.header__contacts');
	const navContacts = document.querySelector('.nav__contacts');

	// Open onload
	headerContacts.classList.add('_active');
	function copyContacts() {
		for (const node of headerContacts.children) {
			const nodeCopy = node.cloneNode(true);
			navContacts.append(nodeCopy);
		}
	}
	copyContacts();

	if (burgerTrigger) {
		burgerTrigger.addEventListener('click', function (e) {
			document.querySelector('body').classList.toggle('_lock');

			burgerIcon.classList.toggle('_active');
			burgerBody.classList.toggle('_active');
			headerBurgerTitle.classList.toggle('_active');
			headerContacts.classList.toggle('_active');
			navContacts.classList.toggle('_active');
			document.querySelector('.header').classList.toggle('_active');
		});
	}
};

burgerInit();
;
const spoilersInit = function () {
	const spoilersArray = document.querySelectorAll('[data-spoilers]');

	if (spoilersArray.length > 0) {
		// Get regular spoilers
		const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
			return !item.dataset.spoilers.split(',')[0];
		});

		if (spoilersRegular.length > 0) {
			initSpoilers(spoilersRegular);
		}

		// Get spoilers with media query
		const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
			return item.dataset.spoilers.split(',')[0];
		});

		if (spoilersMedia.length > 0) {
			const breakpointsArray = [];
			spoilersMedia.forEach((item) => {
				const params = item.dataset.spoilers;
				const breakpoint = {};
				const paramsArray = params.split(',');

				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Get unique breakpoints
			let mediaQueries = breakpointsArray.map(function (item) {
				return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Work with every breakpoint
			mediaQueries.forEach((breakpoint) => {
				const paramsArray = breakpoint.split(',');
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				// Get objects with required conditions
				const spoilersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});

				// Create events
				matchMedia.addEventListener('change', function () {
					initSpoilers(spoilersArray, matchMedia);
				});
				initSpoilers(spoilersArray, matchMedia);
			});
		}

		// Initialize
		function initSpoilers(spoilersArray, matchMedia = false) {
			spoilersArray.forEach((spoilersBlock) => {
				spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
				if (matchMedia.matches || !matchMedia) {
					spoilersBlock.classList.add('_init');
					initSpoilerBody(spoilersBlock);
					spoilersBlock.addEventListener('click', setSpoilerAction);
				} else {
					spoilersBlock.classList.remove('_init');
					initSpoilerBody(spoilersBlock, false);
					spoilersBlock.removeEventListener('click', setSpoilerAction);
				}
			});
		}

		// Spoiler onclick
		function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
			const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
			if (spoilerTitles.length > 0) {
				spoilerTitles.forEach((spoilerTitle) => {
					if (hideSpoilerBody) {
						spoilerTitle.removeAttribute('tabindex');
						if (!spoilerTitle.classList.contains('_active')) {
							spoilerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spoilerTitle.setAttribute('tabindex', '-1');
						spoilerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}

		function setSpoilerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
				const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
				const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
				const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
				if (!spoilersBlock.querySelectorAll('._slide').length) {
					if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
						hideSpoilerBody(spoilersBlock);
					}
					spoilerTitle.classList.toggle('_active');
					_slideToggle(spoilerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}

		function hideSpoilerBody(spoilersBlock) {
			const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
			if (spoilerActiveTitle) {
				spoilerActiveTitle.classList.remove('_active');
				_slideUp(spoilerActiveTitle.nextElementSibling, 500);
			}
		}
	}

	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition_property');
				target.classList.remove('_slide');
			}, duration);
		}
	};

	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition_property');
				target.classList.remove('_slide');
			}, duration);
		}
	};

	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	};
};

/*
Parent - data-spoilers
Button - data-spoiler
Single slide active - data-one-spoiler (For parent)
Breakpoints:
data-spoiler="992,max" @media (max-width: 992px) ...
data-spoiler="768.min" @media (min-width: 768px) ...
*/

spoilersInit();;
// @@ 
// include('popup.js');
function lockPaddingInit() {
	const body = document.querySelector('body');
	// Options for the observer (which mutations to observe)
	// const config = { attributes: true, childList: true, subtree: true };
	const config = { attributes: true };

	// Callback function to execute when mutations are observed
	const bodyScrollCallback = function (mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.attributeName === 'class') {
				if (body.classList.contains('_lock')) {
					body.style.marginRight = scrollbarWidth + 'px';
					document.querySelector('.nav').style.paddingRight = scrollbarWidth + 'px';
					document.querySelector('.header').style.paddingRight = scrollbarWidth + 'px';
				} else {
					body.style.removeProperty('margin-right');
					document.querySelector('.nav').style.paddingRight = '0px';
					document.querySelector('.header').style.paddingRight = '0px';
				}
			}
		}
	};

	// Create an observer instance linked to the bodyScrollCallback function
	const observer = new MutationObserver(bodyScrollCallback);

	// Start observing the target node for configured mutations
	observer.observe(body, config);

	function getScrollbarWidth() {
		// Creating invisible container
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll'; // forcing scrollbar to appear
		outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
		document.body.appendChild(outer);

		// Creating inner element and placing it in the container
		const inner = document.createElement('div');
		outer.appendChild(inner);

		// Calculating difference between container's full width and the child width
		const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

		// Removing temporary elements from the DOM
		outer.parentNode.removeChild(outer);

		return scrollbarWidth;
	}

	const scrollbarWidth = getScrollbarWidth();

	// Prevent nav content twitch on scrollbar appearing
	// document.querySelector('.nav').style.paddingRight = scrollbarWidth + 'px';
}

if (document.querySelector('body').classList.contains('mouse')) {
	lockPaddingInit();
}

// factory video onclick controls appear
function factoryVideoInit() {
	const factoryVideo = document.getElementById('factory-video');
	const videoStartBtn = document.querySelector('.factory__video-play-btn');

	videoStartBtn.addEventListener('click', function (e) {
		videoStartBtn.setAttribute('hidden', 'true');
		factoryVideo.setAttribute('controls', 'true')
		factoryVideo.play();
	});
}

factoryVideoInit();
;
function contactUsFormInit() {
	const messangersColor = {
		Whatsapp: '#4CAF50',
		Telegram: '#039BE5',
		Viber: '#7F40BD',
	};
	const list = document.querySelector('.form-contact-us__messangers');
	const messangerInputHeading = document.querySelector('.form-contact-us__input--messanger .form-contact-us__input-heading');

	if (list && messangerInputHeading) {
		list.addEventListener('click', function (e) {
			const elem = e.target.closest('.form-contact-us__messangers-list-item');
			if (!elem) return;

			const elemMessanger = elem.dataset.itemMessanger;
			messangerInputHeading.textContent = elemMessanger;
			messangerInputHeading.style.color = messangersColor[elemMessanger];

			if (elem.classList.contains('_active')) return;

			const activeElem = list.querySelector('.form-contact-us__messangers-list-item._active');
			activeElem.classList.remove('_active');
			elem.classList.add('_active');

			const activeElemRadio = activeElem.querySelector('input[type=radio]');
			const elemRadio = elem.querySelector('input[type=radio]');
			activeElemRadio.removeAttribute('checked');
			elemRadio.setAttribute('checked', true);
		});
	}

	const inputMask = document.querySelector('.form-contact-us__input--messanger input');
	const maskOptions = {
		mask: '+7 000 000-00-00',
	};
	const mask = IMask(inputMask, maskOptions);
}

contactUsFormInit();
;
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
;
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
;