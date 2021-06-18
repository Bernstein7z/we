(function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
})();

const themeChanger = document.querySelector('.changer');
themeChanger.addEventListener('click', event => {
    event.preventDefault();
    let theme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme',
        theme === 'dark' ? 'light' : 'dark')
})