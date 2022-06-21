export const registroBtn = document.querySelector('#access-button');
export const newResgistroBtn = document.querySelector('#news-register');
export const bottomResgistroBtn = document.querySelector('#access-footer');

const sectionModal = document.querySelector('#sectionModalFormulario');
const template = document.getElementById('formularioModal').content;
const fragment = document.createDocumentFragment();

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function activarModalFormulario() {

    registroBtn.addEventListener('click', () => {
        sectionModal.classList.add('fade')
        sectionModal.style.display = 'flex'
        modalFormulario();
    })
    newResgistroBtn.addEventListener('click', () => {
        sectionModal.classList.add('fade')
        sectionModal.style.display = 'flex'
        modalFormulario();
    })
    bottomResgistroBtn.addEventListener('click', () => {
        sectionModal.classList.add('fade')
        sectionModal.style.display = 'flex'
        modalFormulario();
    })

}

function modalFormulario() {
    const formulario = document.createElement('form');
    formulario.classList.add('formularioContrato', 'formContainer')
    formulario.classList.add('modal-formulario');
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    formulario.appendChild(fragment)

    sectionModal.appendChild(formulario)
    console.log(sectionModal)
}
