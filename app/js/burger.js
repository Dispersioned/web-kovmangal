const burgerInit = function () {
	let burgerTrigger = document.querySelector('.header__burger');
	let burgerIcon = document.querySelector('.header__burger-icon');
	let headerBurgerTitle = document.querySelector('.header__burger-title');
	let burgerBody = document.querySelector('.header__nav');

	if (burgerTrigger) {
		burgerTrigger.addEventListener('click', function (e) {
			document.querySelector('body').classList.toggle('_lock');

			burgerIcon.classList.toggle('_active');
			burgerBody.classList.toggle('_active');
			headerBurgerTitle.classList.toggle('_active');
		});
	}
}

burgerInit();