const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');

// Objetos de captura

let divisasArr;

class Divisas {
    constructor(nombre, valor, unidadMedida, codigo){
    this.nombre = nombre;
    this.valor = valor;
    this.unidadMedida = unidadMedida;
    this.codigo = codigo;
    }
}

// FETCH funcion

export async function getDivisa() {
    const res = await fetch(url);
    const divisaData = await res.json();

    console.log(divisaData)
    return divisaData
};


export function showDivisas() {
    
    getDivisa()

    divisasArr = Object.entries()

}