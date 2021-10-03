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
