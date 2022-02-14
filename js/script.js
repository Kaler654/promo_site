// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    const headerContacts = document.querySelector('.header__items');

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
    document.querySelector('[class="duck"]').setAttribute('src', `img/about/${themeName}.svg`);
    document.querySelector('[title="theme"]').setAttribute('href', `css/${themeName}.css`);

    changeThemeButtons.forEach(button => {
        button.style.display = 'block';
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
    localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme'); // Проверяем есть ли в LocalStorage записано значение для 'theme' и присваиваем его переменной.

if(activeTheme === null || activeTheme === 'dark') { // Если значение не записано, или оно равно 'dark' - применяем темную
    applyTheme('dark');
} else if (activeTheme === 'light') { // Если значение равно 'light' - применяем светлую
    applyTheme('light');
}