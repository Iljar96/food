document.addEventListener('DOMContentLoaded', () => {
	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
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

		if (target && target.classList.contains('tabheader__item')) {
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

	//Timer

	const deadline = '2021-12-31';

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

	setClock('.timer', deadline);

	//Modal
	const modalTriggers = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	const openModal = () => {
		modal.classList.add('show', 'fade');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		document.querySelector('.wrapper').style.paddingRight = getScrollbarWidth() + 'px';
		clearInterval(modalTimerId);
	}
	const closeModal = () => {
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

	modalTriggers.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show'))
			closeModal();
	});

	const modalTimerId = setTimeout(openModal, 50000);

	const openModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			document.removeEventListener('scroll', openModalByScroll);
		}
	}

	document.addEventListener('scroll', openModalByScroll);

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

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'menu__field > .container',
	).render();
	const card2 = new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'menu__field > .container',
	).render();
	const card3 = new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие	продуктов	животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		20,
		'menu__field > .container',
		'test',
		'test2'
	).render();

	//Forms 
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/icons/spinner.svg',
		success: 'Спасибо,скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	}

	forms.forEach(item => {
		postData(item);
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

	//fetch (JSON)
	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const object = {}; // * -formData переобразуем в формат JSON
			formData.forEach(function (value, key) {
				object[key] = value;
			});


			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object)
			})
				.then(data => data.text()) // Ответ модифицируем
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

		})
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		prevModalDialog.classList.remove('show');
		openModal();

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
			closeModal();
		}, 4000);
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

});
