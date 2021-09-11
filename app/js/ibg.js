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
