'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//scrolling to sections using event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target;

  //prevent clicks on not wanted elements
  if (clicked.classList.contains('nav__link')) {
    const id = clicked.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  const contentNumber = clicked.dataset.tab;

  //prevent clicks on not wanted elements
  if (!clicked) return;
  // Remove for all tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Add for the clicked one
  clicked.classList.add('operations__tab--active');

  // Remove the content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Add the content with the same number
  document
    .querySelector(`.operations__content--${contentNumber}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handelHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    sibilings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handelHover.bind(0.5));

nav.addEventListener('mouseout', handelHover.bind(1));

//sticky navigatin on section
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
};

const headerObs = new IntersectionObserver(stickyNav, obsOptions);
headerObs.observe(header);

// reavilg element on scroll
const sections = document.querySelectorAll('.section');

const showSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  sectionObs.observe(section);
  section.classList.add('section--hidden');
});
