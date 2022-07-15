import { clienteContrato, 
        onGetClientes, 
        deleteCliente, 
        getCliente,
        updateCliente 
} from '../../firebase.js'

/* nombre: nombre,
email: email,
telefono: telefono,
rut: rut,
comuna: comuna,
direccion: direccion,
profesion: profesion */

const listadoClientes = document.querySelector('#listado-clientes');
const formulario = document.querySelector('#formulario');

// variables formulario

const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const inputTelefono = document.querySelector('#telefono');
const inputRut = document.querySelector('#rut');
const inputComuna = document.querySelector('#comuna');
const inputDireccion = document.querySelector('#direccion');
const inputProfesion = document.querySelector('#profesion');
const ingresoFecha = new Date().toLocaleString()

let editStatus = false;
let id = '';

document.addEventListener('DOMContentLoaded', () => {
    pintarClientesTabla()
});

async function pintarClientesTabla() {
    onGetClientes((querySnapShot) => {

        listadoClientes.innerHTML = '';

        querySnapShot.forEach(cliente => {

            const { nombre, email, telefono, rut, comuna, direccion, profesion, ingreso} = cliente.data();


            listadoClientes.innerHTML +=`
                <tr>
                    <td>${nombre}</td>
                    <td>${email}</td>
                    <td>${telefono}</td>
                    <td>${rut}</td>
                    <td>${comuna}</td>
                    <td>${direccion}</td>
                    <td>${profesion}</td>
                    <td>${ingreso}</td>
                    <td>
                        <a href="#" data-id="${cliente.id}" class="eliminar" style="color: red">Eliminar</a>
                        <a href="#" data-id="${cliente.id}" class="editar" style="color: green">Editar</a>
                    </td>
                </tr>
            ` 
        })

        const btnDelete = listadoClientes.querySelectorAll('.eliminar');
        const btnEditar = listadoClientes.querySelectorAll('.editar')

        btnDelete.forEach((btn) => {
            btn.addEventListener('click', ({ target: {dataset} }) => {
                deleteCliente(dataset.id);
            })
        })

        btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await getCliente(e.target.dataset.id)
                const cliente = doc.data()

                const { nombre, email, telefono, rut, comuna, direccion, profesion} = cliente;

                inputNombre.value = nombre;
                inputEmail.value = email;
                inputTelefono.value = telefono;
                inputRut.value = rut;
                inputComuna.value = comuna;
                inputDireccion.value = direccion;
                inputProfesion.value = profesion;

                editStatus = true;
                id = doc.id;

                document.querySelector('#titleForm').innerText = 'Editar Cliente'
                document.querySelector('input[type="submit"]').innerText = 'Editar'
            })
        })
    })
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    
    if(!editStatus) {
        clienteContrato(inputNombre.value, inputEmail.value, inputTelefono.value, inputRut.value, inputComuna.value, inputDireccion.value, inputProfesion.value, ingresoFecha);
    } else {
        updateCliente(id, {
            nombre: inputNombre.value, 
            email: inputEmail.value, 
            telefono: inputTelefono.value, 
            rut: inputRut.value, 
            comuna: inputComuna.value, 
            direccion: inputDireccion.value, 
            profesion: inputProfesion.value
        });

        editStatus = false;
        document.querySelector('#titleForm').innerText = 'Agregar Cliente'
    }

    formulario.reset();
})

