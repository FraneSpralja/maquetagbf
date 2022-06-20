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
        imprimirValoresGlobales();
        valoresHistoricosDivisas();
        rescateValoresDivisasCinta();
    }, 500)
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

// Imprimir tabla de valores globales

function imprimirValoresGlobales() {
    const newDivisas = [...divisasArr]
    
    newDivisas.forEach((data) => {
        // console.log(data)

        const { nombre, unidad_medida, valor, codigo } = data;
        const tablaRow = document.createElement('tr');
        const tablaContenido = `
            <td>${nombre}</td>
            <td>${valor}</td>
            <td>${unidad_medida}</td>
            <td><button class="button_historicos" id="${codigo}" data-id="${codigo}" data-name="${nombre}">Ver Historico</button></td>
        `
        tablaRow.innerHTML += tablaContenido;

        tablaDivisas.appendChild(tablaRow)

    })
}
// Imprimir valores historicos de las divisas en los gráficos

function valoresHistoricosDivisas() {
    const historicosBtn = document.querySelectorAll('.button_historicos');
    
    historicosBtn.forEach((btn) => {
        // console.log(btn)
        
        btn.addEventListener('click', () => {

            setTimeout(() => {

                fetch(`${url}${btn.dataset.id}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
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

function rescateValoresDivisasCinta() {
    const divisasCinta = [...divisasArr];
    const newCinta = [
        {nombre: 'bitcoin'},
        {nombre: 'dolar'},
        {nombre: 'uf'},
        {nombre: 'utm'},
        {nombre: 'euro'},
        {nombre: 'imacec'},
        {nombre: 'ipc'},
        {nombre: 'libra de cobre'},
        {nombre: 'tasa de desempleo'},
        {nombre: 'tpm'}
    ];

    divisasCinta.forEach((divisa) => {
        if(divisa.codigo == 'bitcoin'){
            fetch(`${url}bitcoin`)
                .then(res => res.json())
                .then(bitcoin => {
                    const { serie } = bitcoin;
                    let newDivisa = [ ...serie ]
                    newCinta[0].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'dolar'){
            fetch(`${url}dolar`)
                .then(res => res.json())
                .then(dolar => {
                    const { serie } = dolar;
                    let newDivisa = [ ...serie ]
                    newCinta[1].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'uf'){
            fetch(`${url}uf`)
                .then(res => res.json())
                .then(uf => {
                    const { serie } = uf;
                    let newDivisa = [ ...serie ]
                    newCinta[2].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'utm'){
            fetch(`${url}utm`)
                .then(res => res.json())
                .then(utm => {
                    const { serie } = utm;
                    let newDivisa = [ ...serie ]
                    newCinta[3].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'euro'){
            fetch(`${url}euro`)
                .then(res => res.json())
                .then(euro => {
                    const { serie } = euro;
                    let newDivisa = [ ...serie ]
                    newCinta[4].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'imacec'){
            fetch(`${url}imacec`)
                .then(res => res.json())
                .then(imacec => {
                    const { serie } = imacec;
                    let newDivisa = [ ...serie ]
                    newCinta[5].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'ipc'){
            fetch(`${url}ipc`)
                .then(res => res.json())
                .then(ipc => {
                    const { serie } = ipc;
                    let newDivisa = [ ...serie ]
                    newCinta[6].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'libra_cobre'){
            fetch(`${url}libra_cobre`)
                .then(res => res.json())
                .then(libra_cobre => {
                    const { serie } = libra_cobre;
                    let newDivisa = [ ...serie ]
                    newCinta[7].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'tasa_desempleo'){
            fetch(`${url}tasa_desempleo`)
                .then(res => res.json())
                .then(tasa_desempleo => {
                    const { serie } = tasa_desempleo;
                    let newDivisa = [ ...serie ]
                    newCinta[8].serie = newDivisa;
                })
        };
        if(divisa.codigo == 'tpm'){
            fetch(`${url}tpm`)
                .then(res => res.json())
                .then(tpm => {
                    const { serie } = tpm;
                    let newDivisa = [ ...serie ]
                    newCinta[9].serie = newDivisa;
                })
            };

        })
        setTimeout(() => {
            const cintaArray = [...newCinta];
            cintaArray.forEach((divisa) => {
                const { nombre, serie } = divisa;
                    serie.forEach((data) => {
                        const { fecha, valor } = data;
                        
                        cintaDivisas.innerHTML += `<li><span><b style="color:#fff">${nombre}<b> - ${new Date(fecha).toLocaleDateString()} - <span style="color: #23b723;">${valor}</span></span> |</li>` 
                    })
            })
        }, 1500)

        
        cintaDivisas.classList.add('animacionCinta');
        bloqueCintaDivisas.appendChild(cintaDivisas);

}

/* function pintarDivisasEnCinta(cinta){

    // console.log(cinta)
    

} */