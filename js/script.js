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

	const deadline = '2021-04-31';

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
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('.modal__close[data-close]');

	const openModal = () => {
		modal.classList.add('show', 'fade');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}
	const closeModal = () => {
		modal.classList.remove('show', 'fade');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	modalTriggers.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show'))
			closeModal();
	});

	const modalTimerId = setTimeout(openModal, 5000);

	const currentScroll = document.documentElement,
		bla
});