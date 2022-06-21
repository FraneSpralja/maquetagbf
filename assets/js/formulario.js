export const registroBtn = document.querySelector('#access-button');
export const newResgistroBtn = document.querySelector('#news-register');
export const bottomResgistroBtn = document.querySelector('#access-footer');

const sectionModal = document.querySelector('#sectionModalFormulario');
const template = document.getElementById('formularioModal').content;
const fragment = document.createDocumentFragment();

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function formularioEventListener() {

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
    const divContainer = document.createElement('div')
    
    formulario.classList.add('formularioContrato', 'modal-formulario');
    divContainer.classList.add('formContainer');
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    divContainer.appendChild(fragment)
    
    formulario.appendChild(divContainer);
    sectionModal.appendChild(formulario);
    console.log(sectionModal);
    
    funcionalidadModalFormulario()
}

function funcionalidadModalFormulario(){

    const container = document.querySelector('.formContainer');
    const formUno = document.querySelector('#formUno');
    const formDos = document.querySelector('#formDos');
    const formTres = document.querySelector('#formTres');
    const btnSiguienteUno =     document.querySelector('#formUno .buttonBox .buttonSiguiente')

    btnSiguienteUno.addEventListener('click', (e) => {
            e.preventDefault()
        if(breakpoint.matches){
            container.style.left = '-76vw';
            formUno.style.visibility = 'hidden';
            formTres.style.visibility = 'hidden';            
        }else{
            container.style.left = '-26vw';
            formUno.style.visibility = 'hidden';
            formTres.style.visibility = 'hidden';
        };
    });

    document.querySelector('#formDos .buttonBox .buttonSiguiente').addEventListener('click', (e) => {
            e.preventDefault()
        if(breakpoint.matches){
            container.style.left = '-152.2vw';
            formDos.style.visibility = 'hidden';
            formTres.style.visibility = 'inherit';
        }else{
            container.style.left = '-52.5vw';
            formDos.style.visibility = 'hidden';
            formTres.style.visibility = 'inherit';
        };
    });

    document.querySelector('#formDos .buttonBox .buttonVolver').addEventListener('click', (e) => {
            e.preventDefault()
        container.style.left = '0';
        formUno.style.visibility = 'inherit';
    });

    document.querySelector('#formTres .buttonBox .buttonVolver').addEventListener('click', (e) => {
            e.preventDefault()
        if(breakpoint.matches) {
            container.style.left = '-76vw';
            formDos.style.visibility = 'inherit';
            formTres.style.visibility = 'hidden';
        }else{
            container.style.left = '-26vw';
            formDos.style.visibility = 'inherit';
            formTres.style.visibility = 'hidden';
        };
    });
};

