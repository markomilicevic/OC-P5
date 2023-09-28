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
 * Bind the left and right arrows
 *
 * @param {Object} state - The slider state
 */
function bindArrows(state) {
	const leftArrowElement = state.rootElement.querySelector(".arrow_left");
	const rightArrowElement = state.rootElement.querySelector(".arrow_right");

	leftArrowElement.addEventListener("click", (event) => {
		// Click on the left arrow
		event.preventDefault(); // Prevent default `<a href="#">` behaviour
		console.log("Click on the left arrow");
	});

	rightArrowElement.addEventListener("click", (event) => {
		// Click on the right arrow
		event.preventDefault(); // Prevent default `<a href="#">` behaviour
		console.log("Click on the right arrow");
	});
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
 * Bind all dots
 *
 * @param {Object} state - The slider state
 */
function bindDots(state) {
	const dotElements = state.rootElement.querySelectorAll(".dot");

	for (let index = 0; index < dotElements.length; index++) {
		const dotElement = dotElements[index];

		dotElement.addEventListener("click", (event) => {
			event.preventDefault(); // Prevent default `<a href="#">` behaviour
			console.log(`Need to switch to the #${index} slide`);
		});
	}
}

/**
 * Run the slider
 *
 * @param {Object} config - The slider configuration
 * @param {HTMLElement} config.rootElement - The root element of the slider (in case when several sliders required on the same page)
 * @param {Array} config.slides - The list of all available slides
 * @throws {Error} Something goes wrong in the slider
 */
function runSlider({ rootElement, slides }) {
	if (!rootElement || !slides || !slides.length) {
		throw new Error("Missing arguments for running the slider");
	}

	// This object represents the state of the slider component
	const state = {
		rootElement,
		slides: [...slides], // Duplicate the reference in order to not update slides after slider started
	};

	// Arrows HTML are already present in the page, not needed to generate dynamically
	bindArrows(state);

	generateDots(state);
	bindDots(state);
};

// End slider component

// Run the slider
try {
	runSlider({
		rootElement: document.getElementById("banner"),
		slides,
	});
} catch (err) {
	console.error(`An error occurred with the slider: ${err.message}`);
}
