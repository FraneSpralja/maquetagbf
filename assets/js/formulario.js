import { clienteContrato, verificarCorreoElectrónico } from './firebase.js'

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
    
    inicioBotonModal()
    funcionalidadModalFormulario()
    validacionEventListener()

    formulario.addEventListener('submit', enviarFormularioModal);
    
    document.querySelectorAll('span.cerrarModal').forEach((btn) => {
        btn.addEventListener('click', () => {
            sectionModal.removeChild(formulario);
            sectionModal.style.display = 'none';
        })
    })
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

function validacionEventListener() {
    const nombre = document.querySelector('.formBox input[name="nombre"]');
    const email = document.querySelector('.formBox input[name="email"]');
    const telefono = document.querySelector('.formBox input[name="telefono"]');
    const rut = document.querySelector('.formBox input[name="rut"]');
    const comuna = document.querySelector('.formBox input[name="comuna"]');
    const direccion = document.querySelector('.formBox input[name="direccion"]');
    const profesion = document.querySelector('.formBox input[name="profesion"]');

    nombre.addEventListener('blur', validarFormularioModal);
    email.addEventListener('blur', validarFormularioModal);
    telefono.addEventListener('blur', validarFormularioModal);
    rut.addEventListener('blur', validarFormularioModal);
    comuna.addEventListener('blur', validarFormularioModal);
    direccion.addEventListener('blur', validarFormularioModal);
    profesion.addEventListener('blur', validarFormularioModal);
}

function validarFormularioModal(e) {

    if(e.target.value.length !== 0) {
        const error = document.querySelector('p.error')
        if(error){
            error.remove();
        }

        e.target.classList.remove('input-error');
        e.target.classList.add('input-success');
    }else{
        e.target.classList.add('input-error');
        e.target.classList.remove('input-success');

        mostrarError('Los campos son obligatorios');
    }

    if(e.target.name === 'email'){

        if(er.test(e.target.value)){
            const error = document.querySelector('p.error')
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('input-error');
            e.target.classList.add('input-success');
        }else{
            e.target.classList.add('input-error');
            e.target.classList.remove('input-success');
    
            mostrarError('El correo no es válido');
        }
    }

    habilitarButtonSubmit()
}

function habilitarButtonSubmit() {

    const nombre = document.querySelector('.formBox input[name="nombre"]');
    const email = document.querySelector('.formBox input[name="email"]');
    const telefono = document.querySelector('.formBox input[name="telefono"]');
    const rut = document.querySelector('.formBox input[name="rut"]');
    const comuna = document.querySelector('.formBox input[name="comuna"]');
    const direccion = document.querySelector('.formBox input[name="direccion"]');
    const profesion = document.querySelector('.formBox input[name="profesion"]');

    if(er.test(email.value) && nombre.value !== '' && telefono.value !== '' && rut.value !== '' && comuna.value !== '' && direccion.value !== '' && profesion.value !== ''){
        document.querySelector('.buttonBox button[type="submit"]').disabled = false;
        document.querySelector('.buttonBox button[type="submit"]').classList.remove('button-disabled')
    }
}

function mostrarError(mensaje){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error', 'mensaje-error', 'mensaje-modal')

    const errores = document.querySelectorAll('.error');
        if(errores.length === 0) {
            sectionModal.appendChild(mensajeError);
    }
}

function enviarFormularioModal(e) {
    e.preventDefault();

    const parrafoSuccess = document.createElement('p');
    parrafoSuccess.textContent = `El formulario ha sido enviado.`;
    parrafoSuccess.classList.add('mensaje-success', 'mensaje-modal');

    sectionModal.appendChild(parrafoSuccess);

    agregarClienteEnBBDD()

    setTimeout(() => {
        parrafoSuccess.remove();

        resetFormularioModal();
    }, 3000)
}

function resetFormularioModal(){
    document.querySelector('.formularioContrato').reset();
    inicioBotonModal();
}

function inicioBotonModal() {
    document.querySelector('.buttonBox button[type="submit"]').disabled = true;
    document.querySelector('.buttonBox button[type="submit"]').classList.add('button-disabled');
}

// FIREBASE

function agregarClienteEnBBDD() {
    const nombre = document.querySelector('.formBox input[name="nombre"]')
    const email = document.querySelector('.formBox input[name="email"]')
    const telefono = document.querySelector('.formBox input[name="telefono"]')
    const rut = document.querySelector('.formBox input[name="rut"]')
    const comuna = document.querySelector('.formBox input[name="comuna"]')
    const direccion = document.querySelector('.formBox input[name="direccion"]')
    const profesion = document.querySelector('.formBox input[name="profesion"]')

    clienteContrato(nombre.value, email.value, telefono.value, rut.value, comuna.value, direccion.value, profesion.value)
    
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://inteligenciafinanciera.netlify.app/auth.html',
        // This must be true.
        handleCodeInApp: true,
    };

    verificarCorreoElectrónico(email.value, actionCodeSettings)
}