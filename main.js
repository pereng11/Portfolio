"use strict";

// const & let

const HIDDEN_SMALL_CLASSNAME = "hidden__small";
const HIDDEN_REGULAR_CLASSNAME = "hidden__regular";
const INVISABLE_REGULAR_CLASSNAME = "invisable__regular";
const ACTIVE_CLASSNAME = "active";
const NAVSCROLL_CLASSNAME = "navBar__scroll";
const ARROWUPSCROLL_CLASSNAME = "arrow-up__scroll";

const nav = document.querySelector(".navBar");
const navHeight = nav.getBoundingClientRect().height;
const navBtn = document.querySelector(".nav__toggle__btn");
const navMenu = document.querySelector(".navBar__menu");
const navItems = document.querySelectorAll(".navBar__menu__item");
const homeBtn = document.querySelector(".home__button");
const homeHeight = document
	.querySelector(".home")
	.getBoundingClientRect().height;

const homeContainer = document.querySelector(".home__container");
const aboutContainer = document.querySelector(".about .section__container");
const skillsContainer = document.querySelector(".skills .section__container");

const arrowUpBtn = document.querySelector(".arrow-up");
const arrowUpArrow = document.querySelector(".arrow-up i");

const workSortBox = document.querySelector(".myWork__categories");
const workBtns = document.querySelectorAll(".myWork__category__btn");
const workItemBox = document.querySelector(".myWork__category__box");
const workItems = document.querySelectorAll(".myWork__category__item");

// NavBar Toggle Button

function navMenuToggle() {
	if (navMenu.classList.contains(HIDDEN_SMALL_CLASSNAME)) {
		if (nav.classList.contains(NAVSCROLL_CLASSNAME)) {
			navMenu.classList.remove(HIDDEN_SMALL_CLASSNAME);
			navMenu.classList.add(NAVSCROLL_CLASSNAME);
		} else {
			navMenu.classList.remove(HIDDEN_SMALL_CLASSNAME);
			nav.classList.add(NAVSCROLL_CLASSNAME);
		}
	} else if (window.scrollY < navHeight) {
		navMenu.classList.add(HIDDEN_SMALL_CLASSNAME);
		nav.classList.remove(NAVSCROLL_CLASSNAME);
		navMenu.classList.remove(NAVSCROLL_CLASSNAME);
	} else {
		navMenu.classList.add(HIDDEN_SMALL_CLASSNAME);
		navMenu.classList.remove(NAVSCROLL_CLASSNAME);
	}
	console.log("toggled");
}

navBtn.addEventListener("click", navMenuToggle);

// NavBar Visibility Scroll Handle

document.addEventListener("scroll", () => {
	if (navMenu.classList.contains(HIDDEN_SMALL_CLASSNAME) === false) {
		nav.classList.add(NAVSCROLL_CLASSNAME);
	} else if (window.scrollY < navHeight) {
		nav.classList.remove(NAVSCROLL_CLASSNAME);
	} else {
		nav.classList.add(NAVSCROLL_CLASSNAME);
	}
});

//NavBar Item Scrolling to Section

function scrollIntoView(item) {
	const target = item.target;
	const link = target.dataset.link;

	if (link === undefined) {
		return;
	}

	const scrollTo = document.querySelector(link);
	scrollTo.scrollIntoView({ behavior: "smooth" });
}

function scrollBtn(item) {
	return item.addEventListener("click", scrollIntoView);
}

scrollBtn(navMenu);
scrollBtn(homeBtn);

// Scroll Section Contents Fade-in-out

function fadeContents(item) {
	const top = item.getBoundingClientRect().top;
	const height = item.getBoundingClientRect().height;
	document.addEventListener("scroll", () => {
		item.style.opacity = 1 - (window.scrollY - top) / height;
	});
}

fadeContents(homeContainer);
fadeContents(aboutContainer);
fadeContents(skillsContainer);

// Move to Home Arrow Button in bottom-right of Browser

document.addEventListener("scroll", () => {
	if (window.scrollY < homeHeight) {
		arrowUpBtn.classList.remove(ARROWUPSCROLL_CLASSNAME);
	} else {
		arrowUpBtn.classList.add(ARROWUPSCROLL_CLASSNAME);
	}
});

scrollBtn(arrowUpBtn);

// Sort Items in My Work Categories

workSortBox.addEventListener("click", (item) => {
	const sort = item.target.dataset.sort || item.target.parentNode.dataset.sort;

	if (sort == null) {
		return;
	}

	workItemBox.classList.add(INVISABLE_REGULAR_CLASSNAME);
	setTimeout(() => {
		workItems.forEach((element) => {
			if (sort === "*" || sort === element.dataset.type) {
				element.classList.remove(HIDDEN_REGULAR_CLASSNAME);
			} else {
				element.classList.add(HIDDEN_REGULAR_CLASSNAME);
			}
			workItemBox.classList.remove(INVISABLE_REGULAR_CLASSNAME);
		});
	}, 300);
});

// button activation

function activeItem(element) {
	element.addEventListener("click", (item) => {
		const list = element.children;
		let target =
			item.target.dataset.type === "button"
				? item.target
				: item.target.parentNode;

		if (target.dataset.type !== "button") {
			return;
		}

		for (const i of list) {
			i.classList.remove(ACTIVE_CLASSNAME);
		}

		target.classList.add(ACTIVE_CLASSNAME);
	});
}

activeItem(navMenu);
activeItem(workSortBox);
