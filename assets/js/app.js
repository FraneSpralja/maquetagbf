// IMPORTS
import {
    clienteNuevo
} from "./firebase.js"

import { 
    getDivisa, 
    imprimirTablaDivisas,
} from "./divisa.js";

import { 
    formularioEventListener,
} from "./formulario.js";

import {
    burgerMenu,
} from './menu.js'

// VARIABLES

//Formulario Header
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#formulario .form-box input[type="text"]');
const correo = document.querySelector('#formulario .form-box input[type="email"]');
const telefono = document.querySelector('#formulario .form-box input[type="number"]');
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
formularioEventListener();


function eventListener() {

    document.addEventListener('DOMContentLoaded', () => {
        iniciarApp()
        // Fetch e imprimir divisas
        getDivisa()
        setTimeout(() => {
            imprimirTablaDivisas()
        }, 500)
        burgerMenu()
    });

    nombre.addEventListener('blur', validarFormularioHeader);
    correo.addEventListener('blur', validarFormularioHeader);
    riesgo.addEventListener('change', validarFormularioHeader);

    formulario.addEventListener('submit', enviarFormularioHeader);
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

    agregarClienteEnBBDD();

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

/* Mosatrar modales con los botones correspondientes */

function activarModalInfo() {
    const closDialogoBtnUno = document.querySelector('#ventanaUno div .close-dialog-button');
    const closDialogoBtnDos = document.querySelector('#ventanaDos div .close-dialog-button');
    const closDialogoBtntres = document.querySelector('#ventanaTres div .close-dialog-button');

    saberMasBtnUno.addEventListener('click', () => {
        const ventanaUno = document.querySelector('#ventanaUno');

        ventanaUno.classList.remove('ventana-display-none');
        closDialogoBtnUno.addEventListener('click', () => {
            const ventanaUno = document.querySelector('#ventanaUno')

            ventanaUno.classList.add('ventana-display-none');
        });
    });

    saberMasBtnDos.addEventListener('click', () => {
        const ventanaDos = document.querySelector('#ventanaDos');


        ventanaDos.classList.remove('ventana-display-none');
        closDialogoBtnDos.addEventListener('click', () => {
            const ventanaDos = document.querySelector('#ventanaDos')

            ventanaDos.classList.add('ventana-display-none');
        });
    });

    saberMasBtnTres.addEventListener('click', () => {
        const ventanatres = document.querySelector('#ventanaTres');
        

        ventanatres.classList.remove('ventana-display-none');
        closDialogoBtntres.addEventListener('click', () => {
            const ventanaTres = document.querySelector('#ventanaTres')

            ventanaTres.classList.add('ventana-display-none');
        });
    });
}

// FIREBASE

function agregarClienteEnBBDD() {

    clienteNuevo(nombre.value, correo.value, telefono.value, riesgo.value)
}