const menuBtn = document.querySelector('.menu-btn');
const menuList = document.querySelector('.menu__list');
const lockerEl = document.querySelector('.locker');
const bodyEl = document.querySelector('body');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
    lockerEl.classList.toggle('locker--active');
    bodyEl.classList.toggle('lock');
});

window.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target.closest('.menu')) {
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
        lockerEl.classList.remove('locker--active');
        bodyEl.classList.remove('lock');
    }
});
