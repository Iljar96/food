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
export default modal;
export { openModal, closeModal, getScrollbarWidth };
