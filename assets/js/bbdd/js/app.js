(function(){
    let DB;
    const listadoCliente = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1)) {
            obtenerClientes()
        }

        listadoCliente.addEventListener('click', eliminarRegistro);
    });

    function eliminarRegistro(e) {
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.client);

            const confirmar = confirm('¿Estás seguro que quieres eliminar este cliente?')

            if(confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    console.log('eliminado')

                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('hubo un error');
                }
            };
        }
    }

    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('Hubo un error')
        };

        crearDB.onsuccess = function() {
            DB = crearDB.result;
        };

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { 
                keyPath: 'id', 
                autoIncrement: true});

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB lista y creada');
        };
    };

    function obtenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('error')
        }

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if(cursor) {
                    const { nombre, email, telefono, empresa, id } = cursor.value;

                    listadoCliente.innerHTML += `
                            <tr>
                                <td class="px-6 py4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">${nombre}</p>
                                <p class="text-sm leading-5 text-gray-700">${email}</p>
                                </td>
                                <td class="px-6 py4 whitespace-no-wrap border-b border-gray-200">
                                    <p class="text-gray-700">${telefono}</p>
                                </td>
                                <td class="px-6 py4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                                    <p class="text-gray-600">${empresa}</p>
                                </td>
                                <td class="px-6 py4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                    <a href="#" data-client="${id}" class="text-red-600 hover:text-red-900 mr-5 eliminar">Eliminar</a>
                                </td>
                            </tr>
                        `
                    cursor.continue()
                } else {
                    console.log('No hay mas registros')
                }
            }
        }
    }
})();