// IMPORTS
import { getDivisa, imprimirTablaDivisas } from "./divisa.js";
import { 
    registroBtn, 
    newResgistroBtn, 
    bottomResgistroBtn, 
    modalFormulario 
} from "./formulario.js";

// VARIABLES

//Formulario Header
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#formulario .form-box input[type="text"]');
const correo = document.querySelector('#formulario .form-box input[type="email"]');
const riesgo = document.querySelector('#formulario .form-box select');
const heroBtn = document.querySelector('#hero-form-button');
const resultadoHeader = document.querySelector('#resultadoHeader')

// Como funciona
const saberMasBtnUno = document.querySelector('#funciona-button-uno');
const saberMasBtnDos = document.querySelector('#funciona-button-dos');
const saberMasBtnTres = document.querySelector('#funciona-button-tres');
// const ventanaUno = document.querySelector('#ventanaUno');

// Expresion Regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// EVENTOS
eventListener();
activarModalInfo();


function eventListener() {

    document.addEventListener('DOMContentLoaded', () => {
        iniciarApp()
        // Fetch divisas
        getDivisa()
        imprimirTablaDivisas()
    });

    nombre.addEventListener('blur', validarFormularioHeader);
    correo.addEventListener('blur', validarFormularioHeader);
    riesgo.addEventListener('change', validarFormularioHeader);

    formulario.addEventListener('submit', enviarFormularioHeader);
    registroBtn.addEventListener('click', modalFormulario);
    newResgistroBtn.addEventListener('click', modalFormulario);
    bottomResgistroBtn.addEventListener('click', modalFormulario);


};
// FUNCIONES

function iniciarApp() {

    inicioBotonHeader();

}

// FUNCIONES FORMULARIO HEADER

function validarFormularioHeader(e) {
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

    if(e.target.type === 'email'){

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

    if(er.test(correo.value) && nombre.value !== '' && riesgo.value !== '' ){
        heroBtn.disabled = false;
        heroBtn.classList.remove('button-disabled')
    }
}

function enviarFormularioHeader(e) {
    e.preventDefault();

    const parrafoSuccess = document.createElement('p');
    parrafoSuccess.textContent = `El formulario ha sido enviado.`;
    parrafoSuccess.classList.add('mensaje-success');

    resultadoHeader.appendChild(parrafoSuccess);

    setTimeout(() => {
        parrafoSuccess.remove();

        resetFormularioHeader();
    }, 3000)
}

//FUNCIONES SECUNDARIAS FORMULARIO HEADER

function inicioBotonHeader() {
    heroBtn.disabled = true;
    heroBtn.classList.add('button-disabled');
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error', 'mensaje-error')

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        resultadoHeader.appendChild(mensajeError);
    }
}

function resetFormularioHeader(){
    formulario.reset();
    iniciarApp();
}

// COMO FUNCIONA

function activarModalInfo() {
    saberMasBtnUno.addEventListener('click', () => {
        const ventanaUno = document.querySelector('#ventanaUno');
        const closDialogoBtn = document.querySelector('.close-dialog-button');

        ventanaUno.classList.remove('ventana-display-none');
        closDialogoBtn.addEventListener('click', () => {
            const ventanaUno = document.querySelector('#ventanaUno')

            ventanaUno.classList.add('ventana-display-none');
        });
    });

    saberMasBtnDos.addEventListener('click', () => {
        const ventanaUno = document.querySelector('#ventanaUno');
        const closDialogoBtn = document.querySelector('.close-dialog-button');

        ventanaUno.classList.remove('ventana-display-none');
        closDialogoBtn.addEventListener('click', () => {
            const ventanaUno = document.querySelector('#ventanaUno')

            ventanaUno.classList.add('ventana-display-none');
        });
    });

    saberMasBtnTres.addEventListener('click', () => {
        const ventanaUno = document.querySelector('#ventanaUno');
        const closDialogoBtn = document.querySelector('.close-dialog-button');

        ventanaUno.classList.remove('ventana-display-none');
        closDialogoBtn.addEventListener('click', () => {
            const ventanaUno = document.querySelector('#ventanaUno')

            ventanaUno.classList.add('ventana-display-none');
        });
    });
}