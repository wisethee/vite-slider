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

    // update the slider track by cloning the slides
    const totalSlides = updateSliderTrack(slides, sliderTrack, visibleSlides);

    // update the slide width to fit the slider track
    initSlider(slider, totalSlides, sliderTrack, visibleSlides);

    // add event listeners the left button
    leftButton.addEventListener("click", () => {
      // check the current index
      currentIndex === 0 ? (currentIndex = slides.length - 1) : currentIndex--;

      console.log(currentIndex);
      // remove the remove the last slide from the DOM and add a new one at the beginning based on the currentIndex
      // ...
    });

    // add event listeners the right button
    rightButton.addEventListener("click", () => {
      // check the current index
      currentIndex === slides.length - 1 ? (currentIndex = 0) : currentIndex++;

      console.log(currentIndex);
      // remove the remove the first slide and add a new one at the end based on the currentIndex
      // ...
    });
  };

  // get the slide width
  const getSlideWidth = (slider, visibleSlides) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visibleSlides;

    return slideWidth;
  };

  // updates the slider track with the new slides
  const updateSliderTrack = (slides, sliderTrack, visibleSlides) => {
    // create the total slides array by cloning the slides
    const slidesLength = slides.length;

    const startSlides = cloneStartSlides(slides, sliderTrack, visibleSlides);
    const endSlides = cloneEndSlides(
      slides,
      sliderTrack,
      visibleSlides,
      slidesLength
    );

    const totalSlides = [...startSlides.reverse(), ...slides, ...endSlides];

    return totalSlides;
  };

  // clone the start slides
  const cloneStartSlides = (slides, sliderTrack, visibleSlides) => {
    const startSlides = slides.map((slide) => slide.cloneNode(true));
    startSlides.reverse().forEach((slide) => {
      slide.classList.add("yp-slider__slide--cloned");
      sliderTrack.insertBefore(slide, sliderTrack.firstChild);
    });

    return startSlides;
  };

  // clone the end slides
  const cloneEndSlides = (slides, sliderTrack, visibleSlides, slidesLength) => {
    const endSlides =
      visibleSlides < slides.length
        ? slides
            .slice(0, slidesLength - visibleSlides)
            .map((slide) => slide.cloneNode(true))
        : slides.map((slide) => slide.cloneNode(true));

    endSlides.forEach((slide) => {
      slide.classList.add("yp-slider__slide--cloned");
      sliderTrack.appendChild(slide);
    });

    return endSlides;
  };

  // updates the slide width to fit the slider track
  const initSlider = (slider, slides, sliderTrack, visibleSlides) => {
    const slideWidth = getSlideWidth(slider, visibleSlides);

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    sliderTrack.style.transform = `translateX(-${
      slideWidth * visibleSlides
    }px)`;
  };

  buildSlider(slider, 3);
});
