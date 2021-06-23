import { getResource } from '../services/services';

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
	getResource('http://localhost:3000/menu')
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
export default cards;
