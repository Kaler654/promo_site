// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const headerContacts = document.querySelector('.header__items');
if (iconMenu) {

	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		headerContacts.classList.toggle('_active');
	});
}

// Смена темы

let changeThemeButtons = document.querySelectorAll('.change_theme');

changeThemeButtons.forEach(button => {
	button.addEventListener('click', function () {
		let theme = this.dataset.theme;
		applyTheme(theme);
	});
});

function applyTheme(themeName) {
	document.querySelector('[class="duck"]').setAttribute('src', `img/about/${themeName}_duck.svg`);
	document.querySelector('[title="theme"]').setAttribute('href', `css/${themeName}.css`);

	changeThemeButtons.forEach(button => {
		button.style.display = 'block';
	});
	document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
	localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme'); // Проверяем есть ли в LocalStorage записано значение для 'theme' и присваиваем его переменной.

if (activeTheme === null || activeTheme === 'dark') { // Если значение не записано, или оно равно 'dark' - применяем темную
	applyTheme('dark');
} else if (activeTheme === 'light') { // Если значение равно 'light' - применяем светлую
	applyTheme('light');
}


// Прокрутка к разделу

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
				headerContacts.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}


// Анимация при прокрутке

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint - 80) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

