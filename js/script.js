import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

	// const tabs = require('./modules/tabs'),
	// 	modal = require('./modules/modal'),
	// 	timer = require('./modules/timer'),
	// 	cards = require('./modules/cards'),
	// 	calc = require('./modules/calc'),
	// 	forms = require('./modules/forms'),
	// 	slider = require('./modules/slider');

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2021-12-31');
	cards();
	calc();
	forms('form', modalTimerId);
	slider(
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
