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
