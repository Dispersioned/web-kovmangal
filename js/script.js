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
const popupInit = function () {
	const popupLinks = document.querySelectorAll('.popup-link');
	let body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');

	// Enter yours value
	const popupContentClassName = '.popup-question__content';

	let unlock = true;

	const timeout = 500;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('open');
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest(popupContentClassName)) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.right = lockPaddingValue;
				el.style.transitionProperty = 'all';
				el.style.transitionDuration = '0s';
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('_lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnlock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.right = '0px';
					setTimeout(() => {
						// IE9 polyfill
						if (el.style.removeProperty) {
							console.log(true);
							el.style.removeProperty('transition-property');
							el.style.removeProperty('transition-duration');
						} else {
							el.style.removeAttribute('transition-property');
							el.style.removeAttribute('transition-duration');
						}
					}, 100);
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('_lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});
};

popupInit();

const selectInit = function () {
	const selectHeader = document.querySelector('.select__header');
	const selectBtn = document.querySelector('.select__icon');
	const selectBody = document.querySelector('.select__body');

	if(!selectHeader) return;

	const toggleSelectOptions = function () {
		selectBtn.classList.toggle('_active');
		selectHeader.classList.toggle('_active');
		selectBody.classList.toggle('_active');
	};

	selectHeader.addEventListener('click', toggleSelectOptions);

	// disable _active class when select open if clicked outside the selectHeader
	document.addEventListener('click', function (e) {
		if (e.target !== selectHeader && !selectHeader.contains(e.target) && selectHeader.classList.contains('_active')) {
			toggleSelectOptions();
		}
	});

	const selectItems = document.querySelectorAll('.select__item');

	selectItems.forEach((item) => {
		item.addEventListener('click', selectChoose);
	});

	function selectChoose() {
		let text = this.innerText;
		let currentText = this.closest('.select').querySelector('.select__current');
		currentText.innerText = text;
	}
};

selectInit();
;
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
				} else {
					body.style.removeProperty('margin-right');
					document.querySelector('.nav').style.paddingRight = '0px';
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
				} else {
					body.style.removeProperty('margin-right');
					document.querySelector('.nav').style.paddingRight = '0px';
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