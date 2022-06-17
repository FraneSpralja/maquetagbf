const url = 'https://mindicador.cl/api/'
const tablaDivisas = document.querySelector('#divisas-table tbody');
const historicoDivisas = document.querySelector('#historico-divisas');
const ctx = document.getElementById('myChart').getContext('2d');

export async function getDivisa() {

    try{

        const res = await fetch(url)

        if(!res.ok) return console.log('Error');

        const divisas = await res.json();
        const divisasArr = Object.entries(divisas);
        divisasArr.splice(0, 3)

        // imprimir global divisas
        divisasArr.forEach((divisa) => {
            tablaDivisas.innerHTML += `
            <tr>
                <th>${divisa[1].nombre}</th>
                <td>${divisa[1].valor}</td>
                <td>${divisa[1].unidad_medida}</td>
                <td><button class="btn-tabla" id="${divisa[1].codigo}" data-id="${divisa[1].codigo}" data-name="${divisa[1].nombre}">Ver histórico</button></td>
            </tr>
            `
        });
        imprimirVerHistorico();
    }catch(err){
        console.log('error')
    }
}

function imprimirVerHistorico() {
    const divisaBtn = document.querySelectorAll('.btn-tabla');
    // ctx.reset()

    const indexBtnDivisa = divisaBtn.findIndexOf(btn => btn.id === btn.dataset.id)

    indexBtnDivisa.addEventListener('click', async () => {
            try {
                const res = await fetch(`${url}${btn.dataset.id}`);
    
                const urlBars = await res.json();
                
                const historico = urlBars.serie;
    
                const myChart = new Chart(ctx,
                    {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: `click para ver ${btn.dataset.name}`,
                                backgroundColor: 'red',
                                borderColor: 'blue',
                                borderWidth:1,
                            }]
                        },
                    })
                
                historico.reverse().forEach((data) => {
    
                    const { fecha, valor } = data;
                    
                    myChart.data['labels'].push(new Date(fecha).toLocaleDateString());
                    myChart.data['datasets'][0].data.push(valor);
                })
            }catch(err){
                console.log('error')
            }
    
        })
    }

    // divisaBtn.forEach((btn) => {
    //     if(btn.id == btn.dataset.id) {
    //     }
    // })