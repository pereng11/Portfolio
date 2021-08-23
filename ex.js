const boxes = document.querySelectorAll(".box");

const options = {
	root: null,
	rootMargin: "200px",
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		} else {
			entry.target.classList.remove("active");
		}
	});
});

boxes.forEach((box) => observer.observe(box));
