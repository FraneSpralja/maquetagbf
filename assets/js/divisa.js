const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');

// Objetos de captura

const divisasArr = [];

let bitcoin_divisa = {};
let dolar_divisa = {};
let uf_divisa = {};
let utm_divisa = {};
let euro_divisa = {};
let imacec_divisa = {};
let ipc_divisa = {};
let libra_cobre_divisa = {};
let tasa_desempleo_divisa = {};
let tpm_divisa = {};

// FETCH funcion

const bitcoinArr = []
const dolarArr = []
const ufArr = []
const utmArr = []
const euroArr = []
const imacecArr = []
const ipcArr = []
const libra_cobreArr = []
const tasa_desempleoArr = []
const tpmArr = []

export function getDivisa() {
    fetch(url)
        .then( res => res.json())
        .then(data =>
            conjuntoDivisas(data)
            )
};

export function imprimirTablaDivisas() {
    setTimeout(() => {
        prueba();
        valoresHistoricosDivisas();
    }, 500)
}

function conjuntoDivisas(data) {
    const { bitcoin, 
        dolar, 
        uf, 
        utm, 
        euro, 
        imacec, 
        ipc, 
        libra_cobre, 
        tasa_desempleo, 
        tpm 
    } = data

    const bitcoinObj = { ...bitcoin }
    const dolarObj = { ...dolar }
    const ufObj = { ...uf }
    const utmObj = { ...utm }
    const euroObj = { ...euro }
    const imacecObj = { ...imacec }
    const ipcObj = { ...ipc }
    const libra_cobreObj = { ...libra_cobre }
    const tasa_desempleoObj = { ...tasa_desempleo }
    const tpmObj = { ...tpm }

    bitcoin_divisa.nombre = bitcoinObj.nombre;
    bitcoin_divisa.unidad_medida = bitcoinObj.unidad_medida;
    bitcoin_divisa.valor = bitcoinObj.valor;
    bitcoin_divisa.codigo = bitcoinObj.codigo;

    dolar_divisa.nombre = dolarObj.nombre;
    dolar_divisa.unidad_medida = dolarObj.unidad_medida;
    dolar_divisa.valor = dolarObj.valor;
    dolar_divisa.codigo = dolarObj.codigo;

    uf_divisa.nombre = ufObj.nombre;
    uf_divisa.unidad_medida = ufObj.unidad_medida;
    uf_divisa.valor = ufObj.valor;
    uf_divisa.codigo = ufObj.codigo;

    utm_divisa.nombre = utmObj.nombre;
    utm_divisa.unidad_medida = utmObj.unidad_medida;
    utm_divisa.valor = utmObj.valor;
    utm_divisa.codigo = utmObj.codigo;

    euro_divisa.nombre = euroObj.nombre;
    euro_divisa.unidad_medida = euroObj.unidad_medida;
    euro_divisa.valor = euroObj.valor;
    euro_divisa.codigo = euroObj.codigo;

    imacec_divisa.nombre = imacecObj.nombre;
    imacec_divisa.unidad_medida = imacecObj.unidad_medida;
    imacec_divisa.valor = imacecObj.valor;
    imacec_divisa.codigo = imacecObj.codigo;

    ipc_divisa.nombre = ipcObj.nombre;
    ipc_divisa.unidad_medida = ipcObj.unidad_medida;
    ipc_divisa.valor = ipcObj.valor;
    ipc_divisa.codigo = ipcObj.codigo;

    libra_cobre_divisa.nombre = libra_cobreObj.nombre;
    libra_cobre_divisa.unidad_medida = libra_cobreObj.unidad_medida;
    libra_cobre_divisa.valor = libra_cobreObj.valor;
    libra_cobre_divisa.codigo = libra_cobreObj.codigo;

    tasa_desempleo_divisa.nombre = tasa_desempleoObj.nombre;
    tasa_desempleo_divisa.unidad_medida = tasa_desempleoObj.unidad_medida;
    tasa_desempleo_divisa.valor = tasa_desempleoObj.valor;
    tasa_desempleo_divisa.codigo = tasa_desempleoObj.codigo;

    tpm_divisa.nombre = tpmObj.nombre;
    tpm_divisa.unidad_medida = tpmObj.unidad_medida;
    tpm_divisa.valor = tpmObj.valor;
    tpm_divisa.codigo = tpmObj.codigo;

    divisasArr.push(bitcoin_divisa,
        dolar_divisa,
        uf_divisa,
        utm_divisa,
        euro_divisa,
        imacec_divisa,
        ipc_divisa,
        libra_cobre_divisa,
        tasa_desempleo_divisa,
        tpm_divisa)
}

function prueba() {
    const newDivisas = [...divisasArr]
    
    newDivisas.forEach((data) => {
        console.log(data)

        const { nombre, unidad_medida, valor, codigo } = data;
        const tablaRow = document.createElement('tr');
        const tablaContenido = `
            <td>${nombre}</td>
            <td>${valor}</td>
            <td>${unidad_medida}</td>
            <td><button class="button_historicos" id="${codigo}" data-id="${codigo}">Ver Historico</button></td>
        `
        tablaRow.innerHTML += tablaContenido;

        tablaDivisas.appendChild(tablaRow)

    })
}

function valoresHistoricosDivisas() {
    const historicosBtn = document.querySelectorAll('.button_historicos');

    historicosBtn.forEach((btn) => {
        console.log(btn)
        btn.addEventListener('click', () => {            
            fetch(`${url}${btn.dataset.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }
    )}
)}

// const bitcoin_valores = [...bitcoinArr];
// const dolar_valores = [...dolarArr];
// const uf_valores = [...ufArr];
// const utm_valores = [...utmArr];
// const euro_valores = [...euroArr];
// const imacec_valores = [...imacecArr];
// const ipc_valores = [...ipcArr];
// const libra_cobre_valores = [...libra_cobreArr];
// const tasa_desempleo_valores = [...tasa_desempleoArr];
// const tpm_valores = [...tpmArr];

// const myChart = new Chart(ctx,
//     {
//         type: 'line',
//         data: {
//             datasets: [{
//                 label: `click para ver ${btn.dataset.name}`,
//                 backgroundColor: 'red',
//                 borderColor: 'blue',
//                 borderWidth:1,
//             }]
//         },