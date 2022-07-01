// DECLARAR VARIABLES

const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');
const config = {
    type: 'line',
    data: {
        datasets:[{
            label: "Históricos"
        }]
    }
};
let myChart = new Chart(ctx, config);
const cintaDivisas = document.querySelector('#cinta-hero ul');
const bloqueCintaDivisas = document.querySelector('div#cinta-hero'); 

const breakpoint = window.matchMedia("(min-width: 350px) and (max-width: 790px)")
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

// Traer la información desde la API

export function getDivisa() {
    fetch(url)
        .then( res => res.json())
        .then(data =>
            conjuntoDivisas(data)
            )
        };
        
        // Imprimi los valores después de traer datos desde la API
        
export function imprimirTablaDivisas() {
    setTimeout(() => {
        valoresHistoricosDivisas();
    }, 1000)
}

// Guardar continuamente la información de la API 

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

    divisasArr.push(
        bitcoin_divisa,
        dolar_divisa,
        uf_divisa,
        utm_divisa,
        euro_divisa,
        imacec_divisa,
        ipc_divisa,
        libra_cobre_divisa,
        tasa_desempleo_divisa,
        tpm_divisa
    );

    imprimirValoresGlobales(divisasArr);
    rescateValoresDivisasCinta(divisasArr);
}

// Imprimir tabla de valores globales

function imprimirValoresGlobales(data) {
    const newDivisas = [...data]
    
    const fragment = document.createDocumentFragment();
    newDivisas.forEach((data) => {

        const { nombre, unidad_medida, valor, codigo } = data;
        const tablaRow = document.createElement('tr');
        const thName = document.createElement('th');
        const tdUnidadMediad = document.createElement('td');
        const tdValor = document.createElement('td');
        const tdButton = document.createElement('td');
        
        thName.textContent = nombre;
        tdUnidadMediad.textContent = unidad_medida;
        tdValor.textContent = valor;
        tdButton.innerHTML = `<button class="button_historicos" id="${codigo}" data-id="${codigo}" data-name="${nombre}">Ver Historico</button>`

        tablaRow.appendChild(thName);
        tablaRow.appendChild(tdValor);
        tablaRow.appendChild(tdUnidadMediad);
        tablaRow.appendChild(tdButton);

        fragment.appendChild(tablaRow);
    })
    tablaDivisas.appendChild(fragment)
}
// Imprimir valores historicos de las divisas en los gráficos

function valoresHistoricosDivisas() {
    const historicosBtn = document.querySelectorAll('.button_historicos');

    historicosBtn.forEach((btn) => {
        btn.addEventListener('click', () => {

            setTimeout(() => {
                fetch(`${url}${btn.dataset.id}`)
                .then(res => res.json())
                .then(data => {
                    imprimirGraficoDivisas(data);
                })
            }, 50)

        }
    )}
)}
        
function imprimirGraficoDivisas(info) {
    myChart.destroy()
    clearData();
    myChart = new Chart(ctx, {...config});
    const { nombre, serie } = info
    myChart.data['datasets'][0].label = `${nombre}`;

    serie.reverse().forEach((ele) => {
        const { fecha, valor } = ele;
        myChart.data['labels'].push(new Date(fecha).toLocaleDateString());
        myChart.data['datasets'][0].data.push(valor);
    });
    myChart.update();
}

function clearData() {
    const { data } = config;
    const { labels, datasets } = data;

    datasets[0].data.splice(0, datasets[0].data.length);
    labels.splice(0, labels.length);
};

// Imprimir cinta

function rescateValoresDivisasCinta(data) {
    const divisasCinta = [...data];

    divisasCinta.forEach((divisa) => {
        const { nombre, valor } = divisa;
        cintaDivisas.innerHTML += `<li><span><b style="color:#fff">${nombre}<b> - ${new Date().toLocaleDateString()} - <span style="color: #23b723;">${valor}</span></span> |</li>` 
    })

    if(breakpoint.matches){
        cintaDivisas.classList.add('animacionCinta-mobil')
        cintaDivisas.classList.remove('animacionCinta')
    }else{
        cintaDivisas.classList.add('animacionCinta');
        cintaDivisas.classList.remove('animacionCinta-mobil')
    }    
    bloqueCintaDivisas.appendChild(cintaDivisas);
}