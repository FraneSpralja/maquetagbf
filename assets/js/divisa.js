const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');

// Objetos de captura

class Divisas {
    constructor(nombre, valor, unidadMedida, codigo){
    this.nombre = nombre;
    this.valor = valor;
    this.unidadMedida = unidadMedida;
    this.codigo = codigo;
    }
}

const  bitcoin = new Divisas();
const  dolar = new Divisas();
const  uf = new Divisas();
const  utm = new Divisas();
const  euro = new Divisas();
const  imacec = new Divisas();
const  ipc = new Divisas();
const  libra_cobre = new Divisas();
const  tasa_desempleo = new Divisas();
const  tpm = new Divisas();
// FETCH funcion

export function getDivisa() {
    fetch(url)
        .then( res => res.json())
        .then(data =>
            conjuntoDivisas(data)
            )
};

export function conjuntoDivisas(data) {
    const divisasArr = data.Object.entries()
}