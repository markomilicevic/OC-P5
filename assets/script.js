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
 * Run the slider
 */
function runSlider() {
	const leftArrowElement = document.querySelector(".arrow_left");
	const rightArrowElement = document.querySelector(".arrow_right");

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

// End slider component

// Run the slider
try {
	runSlider();
} catch (err) {
	console.error(`An error occurred with the slider: ${err.message}`);
}
