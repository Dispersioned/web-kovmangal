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
