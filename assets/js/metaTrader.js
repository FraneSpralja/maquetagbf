const mt5Bloque = document.querySelector('#descarga_mt5');
const grupoDeListadDescarga = document.querySelector('ul.grupo-lista-descarga');
const linkDescarga = document.querySelectorAll('ul.grupo-lista-descarga > li > a')

export function descargaMetaTrader() {

    const buttonDescarga = document.createElement('button');
    buttonDescarga.classList.add('buttonDescarga');
    buttonDescarga.textContent = 'Descarga Meta Trader'

    mt5Bloque.appendChild(buttonDescarga)

    buttonDescarga.onclick = function() {
        mostrarListaDescarga()
    }

    linkDescarga.forEach((link) => {
        link.onclick = mostrarListaDescarga
    })
}

function mostrarListaDescarga() {
    grupoDeListadDescarga.classList.toggle('d-none')
}