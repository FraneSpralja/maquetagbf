export const registroBtn = document.querySelector('#access-button');
export const newResgistroBtn = document.querySelector('#news-register');
export const bottomResgistroBtn = document.querySelector('#access-footer');

const sectionModal = document.querySelector('#sectionModalFormulario');
const template = document.getElementById('formularioModal').content;
const fragment = document.createDocumentFragment();

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function modalFormulario() {
    const divModalFormulario = document.createElement('div');
    divModalFormulario.classList.add('modal-formulario');
    const formBox = template.querySelectorAll('.formBox');

    formBox.forEach((form) => {

    })
}