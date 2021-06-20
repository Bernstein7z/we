const themeChanger = document.querySelector('.changer');
themeChanger.addEventListener('click', event => {
    event.preventDefault();

    let theme = document.documentElement
        .getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
});