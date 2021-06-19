(function () {
    const storage = localStorage.getItem('data-theme');
    if (storage) {
        document.documentElement.setAttribute('data-theme', storage)
        return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
})();

const themeChanger = document.querySelector('.changer');
themeChanger.addEventListener('click', event => {
    event.preventDefault();

    let theme = document.documentElement
        .getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('data-theme', theme);

    let img = document.querySelector('#gh-logo');
    img.src = theme === 'dark' ? 'media/GitHub-light.png' : 'media/GitHub-dark.png';
})