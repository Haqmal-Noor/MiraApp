const starsContainer = document.querySelector(".stars");

// Function to create stars in the background
function createStar() {
	const star = document.createElement("div");
	star.classList.add("star");
	star.style.left = `${Math.random() * 95}%`; // Limit to 95% to prevent overflow
	star.style.animationDuration = `${2 + Math.random() * 3}s`;
	starsContainer.appendChild(star);

	setTimeout(() => star.remove(), 5000);
}

// Increase star frequency
setInterval(createStar, 300);

// Function to fetch a quote from the RapidAPI endpoint
async function fetchQuote() {
	const url = "https://love-quote.p.rapidapi.com/lovequote"; // RapidAPI endpoint
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-host": "love-quote.p.rapidapi.com", // API host
			"x-rapidapi-key": "636eccc050msh49cec6352814d95p1dd554jsncc43fa768b87", // Replace with your actual RapidAPI key
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.quote; // Access the quote property from the response
	} catch (error) {
		console.error("Error fetching quote:", error);
		return "You're amazing! 🌟"; // Fallback message
	}
}

// Function to show the quote
async function showQuote() {
	const quote = await fetchQuote(); // Fetch the quote
	const messageElement = document.getElementById("message");
	messageElement.textContent = quote; // Set the quote message
	messageElement.style.opacity = 1; // Fade in the message
}

// Trigger quote display and animation after page load
window.addEventListener("load", () => {
	showQuote();
});

// Prevent horizontal scrolling
window.addEventListener("scroll", function () {
	if (window.scrollX !== 0) {
		window.scrollTo(0, window.scrollY); // Corrected method
	}
});
