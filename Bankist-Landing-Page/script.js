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

// Lazy loading imgs

const imgs = document.querySelectorAll('img[data-src]');

const imgLoad = function (entries, observer) {
  const [entry] = entries;
  const img = entry.target;
  if (!entry.isIntersecting) return;

  img.src = img.dataset.src;
  img.addEventListener('load', () => img.classList.remove('lazy-img'));
  observer.unobserve(img);
};

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0.25,
  rootMargin: '200px',
});

imgs.forEach(img => imgObserver.observe(img));

//slider section
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slideLeft = document.querySelector('.slider__btn--left');
  const slideRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const dot = document.querySelectorAll('.dots__dot');

  const slideCount = slides.length;
  let curSlide = 0;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (curslide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${curslide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (curSlide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === slideCount - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = slideCount - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const intit = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  intit();

  // Event handlers
  slideRight.addEventListener('click', nextSlide);
  slideLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();

    // e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    const clicked = e.target;

    if (clicked.classList.contains('dots__dot')) {
      const slide = clicked.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
