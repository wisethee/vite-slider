document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yp-slider");

  // is called when the DOM is loaded, builds the slider and adds the event listeners
  const buildSlider = (slider, visibleSlides) => {
    // check if slider exists
    if (!slider) return;

    // get the slider elements
    const sliderTrack = slider.querySelector(".yp-slider__track");
    const slides = Array.from(slider.querySelectorAll(".yp-slider__slide"));

    // get the slider buttons
    const [leftButton, rightButton] = [
      ".yp-slider__button-left",
      ".yp-slider__button-right",
    ].map((selector) => slider.querySelector(selector));

    // check if slider elements exist
    if (!sliderTrack || !slides || !leftButton || !rightButton) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > slides.length) visibleSlides = slides.length;

    // default variables
    let currentIndex = 0;

    // initialize the slider
    initSlider(slides, sliderTrack, visibleSlides);

    // add event listeners the left button
    leftButton.addEventListener("click", () => {
      // check the current index
      currentIndex === 0 ? (currentIndex = slides.length - 1) : currentIndex--;

      // remove the remove the last slide from the DOM and add a new one at the beginning based on the currentIndex
      shiftSlider(currentIndex, "right");
    });

    // add event listeners the right button
    rightButton.addEventListener("click", () => {
      // check the current index
      currentIndex === slides.length - 1 ? (currentIndex = 0) : currentIndex++;

      // remove the remove the first slide and add a new one at the end based on the currentIndex
      shiftSlider(currentIndex, "left");
    });
  };

  const shiftSlider = (currentIndex, direction) => {
    console.log("shiftSlider", currentIndex, direction);
  };

  // get the slide width
  const getSlideWidth = (slider, visibleSlides) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visibleSlides;

    return slideWidth;
  };

  // clone the first and last slide and add them to the slider,
  // set the width of the slides and set the initial position
  // of the slider track
  const initSlider = (slides, sliderTrack, visibleSlides) => {
    const slideWidth = getSlideWidth(slider, visibleSlides);

    const firstSlide = slides[slides.length - 1].cloneNode(true);
    sliderTrack.prepend(firstSlide);

    const lastSlide = !(visibleSlides < slides.length)
      ? slides[0].cloneNode(true)
      : null;

    lastSlide && sliderTrack.append(lastSlide);

    const totalSlides = [firstSlide, ...slides, lastSlide];

    totalSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  };

  buildSlider(slider, 4);
});
