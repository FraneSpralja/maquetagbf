// VARIABLES
const burger = document.querySelector('a#menu_burger');
const menu = document.querySelector('.nav-menu ul#menu');
const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)");

export function burgerMenu() {
    activarBurgerMenu()

    burger.addEventListener('click', abrirMenu)
    menu.addEventListener('click', abrirMenu)
}

function activarBurgerMenu() {
    if(breakpoint.matches){
        burger.classList.add('open-menu');
        menu.classList.add('menu-close')
    }
}

function abrirMenu() {
    menu.classList.toggle('menu-open')
}
