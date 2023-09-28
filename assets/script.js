const slides = [
	{
		image: "slide1.jpg",
		tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
	},
	{
		image: "slide2.jpg",
		tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
	},
	{
		image: "slide3.jpg",
		tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
	},
	{
		image: "slide4.png",
		tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
	},
];

// Begin slider component

/**
 * @private
 *
 * Bind the left and right arrows to navigate trough slides
 *
 * @param {Object} state - The slider state
 */
function bindArrows(state) {
	const leftArrowElement = state.rootElement.querySelector(".arrow_left");
	const rightArrowElement = state.rootElement.querySelector(".arrow_right");

	leftArrowElement.addEventListener("click", (event) => {
		// Click on the left arrow
		event.preventDefault(); // Prevent default `<a href="#">` behaviour
		goToPreviousSlide(state);
	});

	rightArrowElement.addEventListener("click", (event) => {
		// Click on the right arrow
		event.preventDefault(); // Prevent default `<a href="#">` behaviour
		goToNextSlide(state);
	});
}

/**
 * @private
 *
 * Go to the previous slide or forward to the last one if the right slide has been reached
 *
 * @param {Object} state - The slider state
 */
function goToPreviousSlide(state) {
	const lastSlideIndex = state.slides.length - 1;

	if (state.currentIndex === 0) {
		// Forward
		switchSlide(state, lastSlideIndex);
	} else {
		// Rewind
		switchSlide(state, state.currentIndex - 1);
	}
}

/**
 * @private
 *
 * Go to the next slide or rewind to the first one if the last slide has been reached
 *
 * @param {Object} state - The slider state
 */
function goToNextSlide(state) {
	const lastSlideIndex = state.slides.length - 1;

	if (state.currentIndex === lastSlideIndex) {
		// Rewind
		switchSlide(state, 0);
	} else {
		// Forward
		switchSlide(state, state.currentIndex + 1);
	}
}

/**
 * @private
 *
 * Generate all dots with default behaviours: all are unselected
 *
 * @param {Object} state - The slider state
 */
function generateDots(state) {
	const dotsElement = state.rootElement.querySelector(".dots");

	// Generate one dot per slide
	for (let index = 0; index < state.slides.length; index++) {
		const dotElement = document.createElement("a");
		// By default all dots doesn't have the right cursor (no `href` attributes)
		dotElement.className = "dot";
		dotsElement.appendChild(dotElement);
	}
}

/**
 * @private
 *
 * Bind all dots to navigate trough slides
 *
 * @param {Object} state - The slider state
 */
function bindDots(state) {
	const dotElements = state.rootElement.querySelectorAll(".dot");

	for (let index = 0; index < dotElements.length; index++) {
		const dotElement = dotElements[index];

		dotElement.addEventListener("click", (event) => {
			event.preventDefault(); // Prevent default `<a href="#">` behaviour
			switchSlide(state, index);
		});
	}
}

/**
 * @private
 *
 * Switch to the new slide (also update dots to reflect the new current slide)
 *
 * @param {Object} state - The slider state
 * @param {Number} newIndex - The slider new index (0 = first slide)
 * @throws {Error} The new index is out of slides index
 */
function switchSlide(state, newIndex) {
	if (newIndex < 0 || newIndex >= state.slides.length) {
		throw new Error("Out of slides index");
	}

	// Update the state
	state.currentIndex = newIndex;
	state.currentSlide = state.slides[newIndex];

	// Replace the image
	const bannerImgElement = state.rootElement.querySelector(".banner-img");
	bannerImgElement.src = `${state.imagesBaseUrl}${state.currentSlide.image}`;

	// Replace the paragraph
	const paragraphElement = state.rootElement.querySelector("p");
	paragraphElement.innerHTML = state.currentSlide.tagLine;

	// Update dots
	updateDots(state);
}

/**
 * @private
 *
 * Update all dots by selecting the current slide's dot and unselecting all other dots
 *
 * @param {Object} state - The slider state
 */
function updateDots(state) {
	const dotElements = state.rootElement.querySelectorAll(".dot");

	for (let index = 0; index < dotElements.length; index++) {
		const dotElement = dotElements[index];

		if (index === state.currentIndex) {
			// This slide is currently displayed
			dotElement.removeAttribute("href"); // Restore the default cursor over the link
			dotElement.classList.add("dot_selected"); // It's omit if the class is already present
		} else {
			// This slide is the previous / next
			dotElement.href = "#"; // Apply the right cursor over the link
			dotElement.classList.remove("dot_selected"); // It's omit if the class is not yet present
		}
	}
}

/**
 * Run the slider
 *
 * @param {Object} config - The slider configuration
 * @param {HTMLElement} config.rootElement - The root element of the slider (in case when several sliders required on the same page)
 * @param {Array} config.slides - The list of all available slides
 * @param {Number} config.startAtIndex - The slider starting index (0 = first slide)
 * @param {String} config.imagesBaseUrl - The base URL for loading slides images (ex: CDN base URL, relative path, ...)
 * @throws {Error} Something goes wrong in the slider
 */
function runSlider({ rootElement, slides, startAtIndex, imagesBaseUrl }) {
	if (!rootElement || !slides || !slides.length || !imagesBaseUrl) {
		throw new Error("Missing arguments for running the slider");
	}
	if (startAtIndex < 0 || startAtIndex > slides.length - 1) {
		throw new Error("Start index is out of slides");
	}

	// Duplicate the references in order to have a clone of slides
	// Preventing slides modifications after that component was started
	const clonedSlides = slides.map((slide) => ({ ...slide }));

	// This object represents the state of the slider component
	const state = {
		rootElement,
		slides: clonedSlides,
		imagesBaseUrl,
		currentIndex: startAtIndex,
		currentSlide: clonedSlides[startAtIndex],
	};

	// Arrows HTML are already present in the page, not needed to generate dynamically
	bindArrows(state);

	generateDots(state);
	bindDots(state);

	// Current slide HTML already present in the page, not needed to generate dynamically
	switchSlide(state, startAtIndex);
}

// Run the slider
try {
	runSlider({
		rootElement: document.getElementById("banner"),
		slides,
		startAtIndex: 0,
		imagesBaseUrl: "./assets/images/slideshow/",
	});
} catch (err) {
	console.error(`An error occurred with the slider: ${err.message}`);
}
