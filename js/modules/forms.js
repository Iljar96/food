import { closeModal, openModal, getScrollbarWidth } from './modal';
import { postData } from '../services/services';

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
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');
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
export default forms;
