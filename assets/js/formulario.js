export const registroBtn = document.querySelector('#access-button');
export const newResgistroBtn = document.querySelector('#news-register');
export const bottomResgistroBtn = document.querySelector('#access-footer');
const sectionModal = document.querySelector('#sectionModalFormulario');

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Objeto
const clienteObj = {};

export function modalFormulario() {
    console.log('abriendo div');

    const divModalFormulario = document.createElement('div');
    divModalFormulario.classList.add('modal-formulario');

    sectionModal.appendChild(divModalFormulario);

    // Crear formulario
    
    
    const nuevoFormulario = `
    <a id="cerrarFormulario">X</a>
    <form id="formularioContrato">
        <div id="formContainer">
            <div id="formUno" class="formBox fade">
                <span>Este es el uno</span>
                <label for="nombre">Nombre y Apellido</label>
                <input name="nombre" placeholder="Nombre y Apellido">
                <label for="email">Email</label>
                <input name="email" placeholder="correo@dominio.com">
                <label type="tel" for="telefono">Teléfono</label>
                <input name="telefono" placeholder="912345678">
                <div class="buttonBox">
                    <button class="buttonSiguiente" value="1">Siguiente</button>
                </div>
            </div>
            <div id="formDos" class="formBox fade">
                <span>Este es el Dos</span>
                <label for="rut">Rut</label>
                <input name="rut" placeholder="Sin puntos ni guión">
                <label for="comuna">Comuna</label>
                <input name="comuna" placeholder="Comuna dónde vive">
                <label for="direccion">Direccion y Número</label>
                <input name="direccion" placeholder="calle, 1234">
                <div class="buttonBox">
                    <button class="buttonVolver" value="1">Volver</button>
                    <button class="buttonSiguiente" value="2">Siguiente</button>
                </div>
            </div>
            <div id="formTres" class="formBox fade">
                <span>Este es el tres</span>
                <label for="profesion">Profesión u Oficio</label>
                <input name="profesion" placeholder="Abogado, Orfebre, etc">
                <label for="cedulaFront">Foto de tu cédula de identidad (delantera)</label>
                <input type="file" name="cedulaFront" placeholder="sube una imagen o pdf">
                <label for="cedulaBack">Foto de tu cédula de identidad (trasera)</label>
                <input type="file" name="cedulaBack" placeholder="sube una imagen o pdf">
                <div class="buttonBox">
                    <button class="buttonVolver" value="2">Volver</button>
                    <button type="submit">Enviar</button>
                </div>
            </div>
        </div>
    </form>
    `;
    
    // agregar formulario
    
    const modalFormulario = document.querySelector('.modal-formulario');

    modalFormulario.innerHTML = nuevoFormulario;

    // Funcionalidad al formulario
    funcionalidadModalFormulario();
    
    // Validar formulario
    const inputNombre = document.querySelector('.formBox input[name="nombre"]');
    const inputEmail = document.querySelector('.formBox input[name="email"]');
    const inputTelefono = document.querySelector('.formBox input[name="telefono"]');
    const inputRut = document.querySelector('.formBox input[name="rut"]');
    const inputComuna = document.querySelector('.formBox input[name="comuna"]');
    const inputDireccion = document.querySelector('.formBox input[name="direccion"]');
    const inputProfesion = document.querySelector('.formBox input[name="profesion"]');

    inputNombre.addEventListener('blur', validarFormulario)
    inputEmail.addEventListener('blur', validarFormulario)
    inputTelefono.addEventListener('blur', validarFormulario)
    inputRut.addEventListener('blur', validarFormulario)
    inputComuna.addEventListener('blur', validarFormulario)
    inputDireccion.addEventListener('blur', validarFormulario)
    inputProfesion.addEventListener('blur', validarFormulario)

    // Submit formulario
    const submitFormModal = document.querySelector('button[type="submit"]');
    console.log(inputComuna);

    submitFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        guardarCliente(inputNombre, inputEmail, inputTelefono, inputRut, inputComuna, inputDireccion, inputProfesion)
    })
    
    // cerrar
    document.querySelector('#cerrarFormulario').addEventListener('click', () => {
        modalFormulario.remove();
    });
    
}

// FUNCIONALIDAD FORMULARIO

function funcionalidadModalFormulario(){

    const container = document.querySelector('#formContainer');
    const formBox = document.querySelector('.formBox');
    const formUno = document.querySelector('#formUno');
    const formDos = document.querySelector('#formDos');
    const formTres = document.querySelector('#formTres');

    document.querySelector('#formUno .buttonBox .buttonSiguiente').addEventListener('click', (e) => {
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

// VALIDACION

function validarFormulario(e){

    if(e.value.length !== 0) {
        const error = document.querySelector('p.error')
        if(error){
            error.remove();
        }
    
        e.classList.remove('input-error');
        e.classList.add('input-success');
    }else{
        e.classList.add('input-error');
        e.classList.remove('input-success');
    
        console.log('error');
    }
    
    if(e.type === 'email'){
    
        if(er.test(e.value)){
            const error = document.querySelector('p.error')
            if(error){
                error.remove();
            }
    
            e.classList.remove('input-error');
            e.classList.add('input-success');
        }else{
            e.classList.add('input-error');
            e.classList.remove('input-success');
    
            console.log('error');
        }
    }
}


// GUARDAR CLIENTE

function guardarCliente(nombre, email, telefono, rut, comuna, direccion, profesion){
    let cliente = {...clienteObj}

    cliente.nombre = nombre.value;
    cliente.email = email.value;
    cliente.telefono = telefono.value;
    cliente.rut = rut.value;
    cliente.comuna = comuna.value;
    cliente.direccion = direccion.value;
    cliente.profesion = profesion.value;

    console.log(cliente)
}
