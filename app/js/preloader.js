// preloader
(function () {
	// hide preloader on all imgs loaded
	function disablePreloader() {
		const preloader = document.querySelector('.preloader');
		preloader.classList.add('._loaded');
	}

	document.addEventListener('DOMContentLoaded', function (e) {
		const preloaderPercentage = document.querySelector('.preloader__percentage');
		const images = document.querySelectorAll('img');
		const totalImagesCounter = images.length;
		let loadedImagesCounter = 0;

		for (img of images) {
			imgClone = new Image();
			imgClone.onload = imgLoaded();
			imgClone.onerror = imgLoaded();
			imgClone.src = imgLoaded();
		}

		function imgLoaded() {
			loadedImagesCounter++;
			preloaderPercentage.textContent = Math.round((100 * loadedImagesCounter) / totalImagesCounter);

			if (loadedImagesCounter >= totalImagesCounter) {
				disablePreloader();
			}
		}
	});
})();
