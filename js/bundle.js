/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	//Calc

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(`${selector} div`);

		elements.forEach(element => {
			element.classList.remove(activeClass);
			if (element.getAttribute('id') === localStorage.getItem('sex')) {
				element.classList.add(activeClass);
			}
			if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				element.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		document.querySelector(parentSelector).addEventListener('click', (e) => {
			if (e.target.getAttribute('data-ratio')) {
				ratio = +e.target.getAttribute('data-ratio');
				localStorage.setItem('ratio', ratio);
			} else {
				sex = e.target.getAttribute('id');
				localStorage.setItem('sex', sex);
			}

			if (e.target !== document.querySelector(parentSelector)) {
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);
			}

			calcTotal();

		});
	}

	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamivInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.value = input.value.replace(/\D/g, '')
				input.style.border = '1px solid red';
			} else {
				input.style.border = '';
			}
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			};

			calcTotal();
		});
	}

	getDynamivInformation('#height');
	getDynamivInformation('#weight');
	getDynamivInformation('#age');
}

// module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	//Используем классы для карточек
	class MenuCard {
		constructor(src, alt, title, text, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.text = text;
			this.price = price;
			this.classes = classes;
			this.transfer = 27;
			this.changeToUAH();
			this.parent = document.querySelector(`.${parentSelector}`);
		}

		changeToUAH() {
			this.price *= this.transfer
		}

		render() {
			if (this.classes.length === 0 || !this.classes.includes(('menu__item'))) {
				this.classes.push('menu__item');
			} else {

			}
			this.parent.insertAdjacentHTML('beforeend',
				`
				<div class="${this.classes.join(' ')} ">
					<img src = "${this.src}" alt = "${this.alt}">
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.text}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				</div >
		`
			)
		}
	}

	//1-способ с классами
	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, 'menu__field > .container').render(); //Ltcnhernehbpfwbz
			});
		})

	//====================
	//2-способ без классов, формируем верстку на лету
	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data))

	// function createCard(data) {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 			<img src = "${img}" alt = "${altimg}">
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
	// 			</div>
	// 		`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
	//====================
	//3-способ с axios
	//axios :
	//-автоматическая трансформация в JSON при ненеобходимости
	//- отмена запросов
	//- промисы
	//-посылает XMLHttpRequestы
	//...
	//Используеется, когда не хотим заниматься настройкой функций по получению, либо отправки каких-то данных, просто подключаем данную библиотеку и она делает все за нас
	// axios.get('http://localhost:3000/menu')
	// 	//data.data.forEach !!!! свойство объекта data
	// 	.then(data => data.data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(img, altimg, title, descr, price, 'menu__field > .container').render(); //Ltcnhernehbpfwbz
	// 	}))
	//====================


	// new MenuCard(
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'menu__field > .container',
	// ).render();
	// const card2 = new MenuCard(
	// 	'img/tabs/elite.jpg',
	// 	'elite',
	// 	'Меню “Премиум',
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	14,
	// 	'menu__field > .container',
	// ).render();
	// const card3 = new MenuCard(
	// 	'img/tabs/post.jpg',
	// 	'post',
	// 	'Меню "Постное"',
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие	продуктов	животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	20,
	// 	'menu__field > .container',
	// 	'test',
	// 	'test2'
	// ).render();
}

// module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	//Forms 
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/icons/spinner.svg',
		success: 'Спасибо,скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	}

	forms.forEach(item => {
		// postData(item);
		bindPostData(item);
	});

	//XMLHttpRequest

	// function postData(form) {
	// 	form.addEventListener('submit', (e) => {
	// 		e.preventDefault();

	// 		const statusMessage = document.createElement('img');
	// 		statusMessage.src = message.loading;
	// 		statusMessage.style.cssText = `
	// 			display: block;
	// 			margin: 0 auto;
	// 		`;
	// 		form.insertAdjacentElement('afterend', statusMessage);

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');

	// 		// request.setRequestHeader('Content-type', 'multipart/form-data'); //Rjulf используем связку объекта XMLHttpRequest + FormData нам заголовок не нужно устанавливатть заголовок, он  устанавливается автоматически
	// 		request.setRequestHeader('Content-type', 'application/json'); // * - для JSON 
	// 		//formData - специальный объект, который позволяетс определенной формы быстро  сформировать все заполненные данные
	// 		const formData = new FormData(form);

	// 		const object = {}; // * -formData переобразуем в формат JSON
	// 		formData.forEach(function (value, key) {
	// 			object[key] = value;
	// 		});

	// 		const json = JSON.stringify(object); // *

	// 		// request.send(formData);
	// 		request.send(json); // *

	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);
	// 				showThanksModal(message.success);
	// 				form.reset();
	// 				statusMessage.remove();
	// 			} else {
	// 				showThanksModal(message.failure);
	// 			}
	// 		})

	// 	})
	// }

	//fetch (formData)
	// function postData(form) {
	// 	form.addEventListener('submit', (e) => {
	// 		e.preventDefault();

	// 		const statusMessage = document.createElement('img');
	// 		statusMessage.src = message.loading;
	// 		statusMessage.style.cssText = `
	// 			display: block;
	// 			margin: 0 auto;
	// 		`;
	// 		form.insertAdjacentElement('afterend', statusMessage);

	// 		const formData = new FormData(form);

	// 		// const object = {}; // * -formData переобразуем в формат JSON
	// 		// formData.forEach(function (value, key) {
	// 		// 	object[key] = value;
	// 		// });

	// 		// const json = JSON.stringify(object); // *

	// 		fetch('server.php', {
	// 			method: 'POST',
	// 			// headers: {
	// 			// 	'Content-type': 'application/json'
	// 			// },
	// 			body: formData
	// 		})
	// 			.then(data => data.text()) // Ответ модифицируем
	// 			.then(data => {
	// 				console.log(data);
	// 				showThanksModal(message.success);
	// 				statusMessage.remove();
	// 			}).catch(() => {
	// 				showThanksModal(message.failure);
	// 			}).finally(() => {
	// 				form.reset();
	// 			})

	// 	})
	// }

	//await ставится перед теми операциями, которые нужно дождаться - для того чтобы дождаться результата
	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	//fetch (JSON)
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			// const object = {}; // * -formData переобразуем в формат JSON
			// formData.forEach(function (value, key) {
			// 	object[key] = value;
			// });

			const json = JSON.stringify(Object.fromEntries(formData.entries()));// * -formData переобразуем в формат JSON // entries() преобразует объект в матрицу, fromEntries() - наобарот

			// fetch('server.php', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify(object)
			// })
			postData('http://localhost:3000/requests', json)
				// .then(data => data.text()) // Ответ модифицируем
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					//промис, который запускается при помощи fetch() не перейдет в состояние отклонено (rejected) из-за ответа http, который считается ошибкой: 404, 500,501... Единственное, что поменяется это статус, который перейдет в состояние false. rejected будет возникать только при сбои сети или что-то помешало выполниться. 
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				})

			e.preventDefault();

		})
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		prevModalDialog.classList.remove('show');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div data-close class="modal__close">×</div>
		<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			prevModalDialog.classList.add('show');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 6000);
	}

	//fetch API - это технология, которая позволяет общаться с сервером построенная на промисах
	//Если ничего не указывать - это будет классический GET запрос, чтобы получить данные из этого url 
	//из конструкции fetch('https://jsonplaceholder.typicode.com/todos/1') возвращается промис
	//куызщтыу полученный ответ в формате (у нас JSON) / для трансформации в обычный объект вместо JSON.parse() в fetch() есть встроенные возможности, которые позволяют сделать - .json(), но есть одна ВАЖНАЯ особенность - команда response.json() возвращает нам промис, так как мы не знаем как быстро этот JSON объект превратиться в обычный объект
	//Есть еще методы: text()...
	// fetch('https://jsonplaceholder.typicode.com/posts', {
	// 	method: "POST",
	// 	body: JSON.stringify({ name: 'Alex' }), //Можно поместить как строку, так и объект
	// 	headers: {
	// 		'Content-type': 'application/json'
	// 	}
	// })
	// 	// fetch('https://jsonplaceholder.typicode.com/todos/1') //GET
	// 	// .then(response => response.text())
	// 	.then(response => response.json())
	// 	.then(json => console.log(json));
}

// module.exports = forms;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "getScrollbarWidth": () => (/* binding */ getScrollbarWidth)
/* harmony export */ });
const openModal = (modalSelector, modalTimerId) => {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show', 'fade');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	document.querySelector('.wrapper').style.paddingRight = getScrollbarWidth() + 'px';

	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}
const closeModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);

	modal.classList.remove('show', 'fade');
	modal.classList.add('hide');
	document.querySelector('.wrapper').style.paddingRight = 0;
	document.body.style.overflow = '';
}
function getScrollbarWidth() {

	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	//Modal
	const modalTriggers = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTriggers.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //Чтобы не вызывать функцию сразу оборачиваем в стрелочную функцию
	});

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show'))
			closeModal(modalSelector);
	});

	//Перемещаем в script.js
	// const modalTimerId = setTimeout(openModal, 50000);

	const openModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			document.removeEventListener('scroll', openModalByScroll);
		}
	}

	document.addEventListener('scroll', openModalByScroll);
}

// module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//Tabs

	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent()

	tabsParent.addEventListener('click', e => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			// hideTabContent();
			// showTabContent(Array.from(tabs).indexOf(e.target));
			tabs.forEach((item, i) => {
				if (item === target) {
					hideTabContent();
					showTabContent(i);
				}
			})
		}
	})
}

// export default tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	//Timer

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60) % 24));


		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds
		}
	}

	function setZero(num) {
		return (num >= 0 && num < 10) ? `0${num}` : num;
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);

			// days.innerHTML = ('0' + t.days).substr(-2);
			days.innerHTML = setZero(t.days);
			hours.innerHTML = setZero(t.hours);
			minutes.innerHTML = setZero(t.minutes);
			seconds.innerHTML = setZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				days.innerHTML = setZero(0);
				hours.innerHTML = setZero(0);
				minutes.innerHTML = setZero(0);
				seconds.innerHTML = setZero(0);
			}
		}
		updateClock()
	}

	setClock(id, deadline);
}

// module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
};

const getResource = async (url) => {
	const res = await fetch(url);

	//Избежание ошибок при fetch
	//свойство ok - говорит о том, что мы что-то получили(ok), или не получили
	//свойство status - там мы попадаем на тот статус, который вернул нам сервер (200-ok, 404- not found, 500...)
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`); //Выкидываем новую ошибку
	}

	return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









document.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

	// const tabs = require('./modules/tabs'),
	// 	modal = require('./modules/modal'),
	// 	timer = require('./modules/timer'),
	// 	cards = require('./modules/cards'),
	// 	calc = require('./modules/calc'),
	// 	forms = require('./modules/forms'),
	// 	slider = require('./modules/slider');

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-12-31');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)(
		{
			container: '.offer__slider',
			slide: '.offer__slide',
			nextArrow: '.offer__slider-next',
			prevArrow: '.offer__slider-prev',
			totalCounter: '#total',
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner',
			margin: 50
		}
	);

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map