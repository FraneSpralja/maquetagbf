export const registroBtn = document.querySelector('#access-button');
export const newResgistroBtn = document.querySelector('#news-register');
export const bottomResgistroBtn = document.querySelector('#access-footer');
const sectionModal = document.querySelector('#sectionModalFormulario');

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)")

// Class

class Clientes {
    constructor(clientes) {
        this.clientes = [];
    }
}

export function modalFormulario() {
    console.log('abriendo div')

    const divModalFormulario = document.createElement('div');
    divModalFormulario.classList.add('modal-formulario')

    sectionModal.appendChild(divModalFormulario);

    // Crear formulario
    
    
    const nuevoFormulario = `
    <a id="cerrarFormulario">X</a>
    <form id="formularioContrato">
        <div id="formContainer">
            <div id="formUno" class="formBox fade">
                <span>Este es el uno</span>
                <label for="nombre">Nombre y Apellido</label>
                <input type="text" name="nombre" placeholder="Nombre y Apellido">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="correo@dominio.com">
                <label type="tel" for="telefono">Teléfono</label>
                <input type="tel" name="telefono" placeholder="912345678">
                <div class="buttonBox">
                    <button class="buttonSiguiente" value="1">Siguiente</button>
                </div>
            </div>
            <div id="formDos" class="formBox fade">
                <span>Este es el Dos</span>
                <label for="rut">Rut</label>
                <input type="number" name="rut" placeholder="Sin puntos ni guión">
                <label for="comuna">Comuna</label>
                <input type="text" name="comuna" placeholder="Comuna dónde vive">
                <label for="direccion">Direccion y Número</label>
                <input type="text" name="direccion" placeholder="calle, 1234">
                <div class="buttonBox">
                    <button class="buttonVolver" value="1">Volver</button>
                    <button class="buttonSiguiente" value="2">Siguiente</button>
                </div>
            </div>
            <div id="formTres" class="formBox fade">
                <span>Este es el tres</span>
                <label for="profesion">Profesión u Oficio</label>
                <input type="text" name="profesion" placeholder="Abogado, Orfebre, etc">
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
    
    const modalFormulario = document.querySelector('.modal-formulario')

    modalFormulario.innerHTML = nuevoFormulario

    // Funcionalidad al formulario
    const container = document.querySelector('#formContainer')
    const formBox = document.querySelector('.formBox');
    const formUno = document.querySelector('#formUno');
    const formDos = document.querySelector('#formDos');
    const formTres = document.querySelector('#formTres');

    document.querySelector('#formUno .buttonBox .buttonSiguiente').addEventListener('click', () => {
        if(breakpoint.matches){
            container.style.left = '-88vw';
            formUno.style.visibility = 'hidden';
            formTres.style.visibility = 'hidden';            
        }else{
            container.style.left = '-26vw';
            formUno.style.visibility = 'hidden';
            formTres.style.visibility = 'hidden';
        }
        
    })

    document.querySelector('#formDos .buttonBox .buttonSiguiente').addEventListener('click', () => {
        if(breakpoint.matches){
            container.style.left = '-176.2vw';
            formDos.style.visibility = 'hidden';
            formTres.style.visibility = 'inherit';
        }else{
            container.style.left = '-52.5vw';
            formDos.style.visibility = 'hidden';
            formTres.style.visibility = 'inherit';
        }
    })

    document.querySelector('#formDos .buttonBox .buttonVolver').addEventListener('click', () => {
        container.style.left = '0';
        formUno.style.visibility = 'inherit';
    })

    document.querySelector('#formTres .buttonBox .buttonVolver').addEventListener('click', () => {
        if(breakpoint.matches) {
            container.style.left = '-88vw';
            formDos.style.visibility = 'inherit';
            formTres.style.visibility = 'hidden';
        }else{
            container.style.left = '-26vw';
            formDos.style.visibility = 'inherit';
            formTres.style.visibility = 'hidden';
        }
    })

    document.querySelector('#cerrarFormulario').addEventListener('click', () => {
        modalFormulario.remove()
    });
}






// Objeto
const clienteObj = {
    nombre: '',
    telefono: '',
    email: '',
    rut: '',
    region: '',
    comuna: '',
    direccion: '',
    profesion: '',
    cedulaFront: '',
    cedulaBack: '',
}