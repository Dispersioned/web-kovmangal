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
