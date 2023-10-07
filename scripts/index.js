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

    let isAnimating = false;

    // update the slider track by cloning the slides
    const totalSlides = updateSliderTrack(slides, sliderTrack, visibleSlides);

    // update the slide width to fit the slider track
    updateSlideWidth(slider, totalSlides, visibleSlides);

    // shift the slider track to the beginning
    shiftSliderTrack(sliderTrack, slider);

    leftButton.addEventListener("click", () => {
      if (!isAnimating) {
        //   isAnimating = true;
        //   animateSliderTrack(sliderTrack, slideWidth, () => {
        //     isAnimating = false;
        //   });
      }
    });

    rightButton.addEventListener("click", () => {
      if (!isAnimating) {
        //   isAnimating = true;
        //   animateSliderTrack(sliderTrack, -slideWidth, () => {
        //     isAnimating = false;
        //   });
      }
    });
  };

  // updates the slider track with the new slides
  const updateSliderTrack = (slides, sliderTrack, visibleSlides) => {
    // create the total slides array by cloning the slides
    const slidesLength = slides.length;
    const startSlides = slides.map((slide) => slide.cloneNode(true));

    const endSlides =
      visibleSlides < slides.length
        ? slides
            .slice(0, slidesLength - visibleSlides)
            .map((slide) => slide.cloneNode(true))
        : slides.map((slide) => slide.cloneNode(true));

    startSlides.reverse().forEach((slide) => {
      slide.classList.add("yp-slider__slide--cloned");
      sliderTrack.insertBefore(slide, sliderTrack.firstChild);
    });

    endSlides.forEach((slide) => {
      slide.classList.add("yp-slider__slide--cloned");
      sliderTrack.appendChild(slide);
    });

    const totalSlides = [...startSlides.reverse(), ...slides, ...endSlides];

    return totalSlides;
  };

  // updates the slide width to fit the slider track
  const updateSlideWidth = (slider, slides, visibleSlides) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visibleSlides;

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
  };

  // shifts the slider track by the given offset
  const shiftSliderTrack = (sliderTrack, slider) => {
    sliderTrack.style.transform = `translateX(${-slider.getBoundingClientRect()
      .width}px)`;
  };

  const animateSliderTrack = (
    sliderTrack,
    offset,
    onComplete,
    duration = 500
  ) => {
    const startTime = performance.now();
    const initialTransform = parseFloat(
      getComputedStyle(sliderTrack).transform.split(",")[4]
    );

    const animate = (currentTime) => {
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const newOffset = initialTransform + offset * progress;
        sliderTrack.style.transform = `translateX(${newOffset}px)`;
        requestAnimationFrame(animate);
      } else {
        sliderTrack.style.transform = `translateX(${
          initialTransform + offset
        }px)`;
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  };

  buildSlider(slider, 6);
});
