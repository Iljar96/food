function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, margin }) {
	//Slider==============================\
	const slider = document.querySelector(container),
		sliderBtnPrev = slider.querySelector(prevArrow),
		sliderBtnNext = slider.querySelector(nextArrow),
		counterCurrent = slider.querySelector(currentCounter),
		counterTotal = slider.querySelector(totalCounter),
		sliderWrapper = slider.querySelector(wrapper),
		sliderInner = slider.querySelector(field),
		sliderSlides = slider.querySelectorAll(slide),
		slidesMargin = margin;

	let sliderWidth,
		currentPosition = 0,
		currentCounterIndex = 0,
		dotsIndex = 0;

	counterTotal.textContent = ('0' + sliderSlides.length).substr(-2);

	sliderSlides[0].classList.add('_active');

	const getSliderWidth = () => sliderWidth = sliderInner.clientWidth;

	const setCurrentCounter = () => {
		counterCurrent.textContent = ('0' + (currentCounterIndex + 1)).substr(-2);
	};

	const addActiveClass = () => {
		sliderSlides.forEach(slide => slide.classList.remove('_active'));
		sliderSlides[currentCounterIndex].classList.add('_active');
	};

	const createPagination = () => {
		sliderWrapper.insertAdjacentHTML("beforeend",
			`
			<div class="carousel-indicators"></div>
		`);
		for (let i = 0; i < sliderSlides.length; i++) {
			document.querySelector('.carousel-indicators')
				.insertAdjacentHTML('beforeend',
					`
					<div class="dot" data-index=${dotsIndex++}></div>
				`);
		}
		changeDotsActiveClass();
	}

	const changeDotsActiveClass = () => {
		const dots = document.querySelectorAll('.dot');
		dots.forEach(dot => dot.classList.remove('_active'));
		dots[currentCounterIndex].classList.add('_active');
	};

	// const changeSlide = (i) => {
	// 	currentCounterIndex = i;
	// 	currentPosition = sliderWidth * (i) + (slidesMargin * (i));
	// 	sliderInner.style.transform = `translate(${-currentPosition}px ,0)`;
	// 	addActiveClass();
	// 	changeDotsActiveClass();
	// 	setCurrentCounter();
	// };

	createPagination()

	setCurrentCounter();

	getSliderWidth();
	window.addEventListener('resize', (e) => {
		getSliderWidth();
		if (currentPosition === 0) {
			sliderInner.style.transform = `translate(0px ,0)`;
		} else {
			currentPosition = sliderWidth * currentCounterIndex + (slidesMargin * currentCounterIndex);
			sliderInner.style.transform = `translate(${-currentPosition}px ,0)`;
		}

	});

	sliderInner.style.cssText = `
		display:flex;
		transition: all .8s ease;
	`;
	sliderWrapper.style.overflow = `hidden`;

	sliderSlides.forEach((slide) => slide.style.flex = `0 0 100%`);
	sliderSlides.forEach((slide) => slide.style.marginRight = `${slidesMargin}px`);

	document.querySelector('.carousel-indicators').addEventListener('click', (e) => {
		if (e.target.classList.contains('dot')) {
			currentCounterIndex = +e.target.dataset.index;
			currentPosition = -1 * sliderWidth * (e.target.dataset.index) + (slidesMargin * (e.target.dataset.index));
			sliderInner.style.transform = `translate(${currentPosition}px ,0)`;
			addActiveClass();
			changeDotsActiveClass();
			setCurrentCounter();
		}
	});

	sliderBtnPrev.addEventListener('click', (e) => {
		currentPosition += sliderWidth + slidesMargin;
		currentCounterIndex -= 1;

		if (currentPosition > 0 || currentCounterIndex < 0) {
			currentCounterIndex = sliderSlides.length - 1;
			currentPosition = ((sliderSlides.length - 1) * (sliderWidth + slidesMargin) * -1);
			currentCounterIndex = sliderSlides.length - 1;
		}
		addActiveClass();
		changeDotsActiveClass();
		sliderInner.style.transform = `translate(${currentPosition}px ,0)`;
		setCurrentCounter();
	});

	sliderBtnNext.addEventListener('click', (e) => {
		currentPosition -= sliderWidth + slidesMargin;
		currentCounterIndex += 1;

		if (currentPosition <= (sliderSlides.length * sliderWidth * -1) || currentCounterIndex > sliderSlides.length - 1) {
			currentPosition = 0;
			currentCounterIndex = 0;
		}
		addActiveClass();
		changeDotsActiveClass();
		sliderInner.style.transform = `translate(${currentPosition}px ,0)`;
		setCurrentCounter();
	});
}

// module.exports = slider;
export default slider;
