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
export default calc;
