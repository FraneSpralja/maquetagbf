const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');

// Objetos de captura

const divisasArr = [];

const divisas = {
    nombre:  '',
    valor: '',
    unidadMedida: '',
    codigo: '',
}

// FETCH funcion

export async function getDivisa() {
    const res = await fetch(url);
    await res.json();

    console.log(res)
    return res
};

export function showDivisas() {
    
    divisas.nombre = res

}