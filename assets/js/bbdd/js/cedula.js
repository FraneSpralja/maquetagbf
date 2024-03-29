import {
    dbRef,
} from '../../firebase.js'

import {
    child,
    get,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"

const frontCedula = document.querySelector('#frontCedula');
const backCedula = document.querySelector('#backCedula');

document.addEventListener('DOMContentLoaded', () => {
    getImagenFrontURL()
    getImagenBackURL()
})

function  getImagenFrontURL() {
    get(child(dbRef, "imagesFront"))
    .then((snapshot) => {
        const listGroup = document.createElement('ul');
        listGroup.classList.add('lista-cedula');

        const title = document.createElement('h3');
        title.textContent = 'Imagen Delantera'

        snapshot.forEach((dataImg) => {
                // console.log(dataImg.val())
                const { ImageName, ImageURL } = dataImg.val();

                const listItem = document.createElement('li')
                
                const itemName = document.createElement('span')
                itemName.textContent = ImageName;

                const itemURL = document.createElement('span')
                const linkURL = document.createElement('a');
                linkURL.textContent = 'front';
                linkURL.href = ImageURL;
                linkURL.target = '_blank';
                linkURL.setAttribute('download', ImageName);
                
                itemURL.appendChild(linkURL);

                const itemImagen = document.createElement('span');
                const image = document.createElement('img');
                image.src = linkURL;
                image.setAttribute('width', "150");
                image.setAttribute('height', "80");

                itemImagen.appendChild(image);

                listItem.appendChild(itemName);
                listItem.appendChild(itemURL);
                listItem.appendChild(itemImagen);

                listGroup.appendChild(listItem);
            })
            frontCedula.appendChild(title);
            frontCedula.appendChild(listGroup);
    })
}

function getImagenBackURL(){
    
    get(child(dbRef, "imagesBack"))
    .then((snapshot) => {
        const listGroup = document.createElement('ul');
        listGroup.classList.add('lista-cedula');

        const title = document.createElement('h3');
        title.textContent = 'Imagen Trasera'

        snapshot.forEach((dataImg) => {
                // console.log(dataImg.val())
                const { ImageName, ImageURL } = dataImg.val();

                const listItem = document.createElement('li')
                
                const itemName = document.createElement('span')
                itemName.textContent = ImageName;

                const itemURL = document.createElement('span')
                const linkURL = document.createElement('a');
                linkURL.textContent = 'back';
                linkURL.href = ImageURL;
                linkURL.target = '_blank';
                linkURL.setAttribute('download', ImageName);
                
                itemURL.appendChild(linkURL);

                const itemImagen = document.createElement('span');
                const image = document.createElement('img');
                image.src = linkURL;
                image.setAttribute('width', "150");
                image.setAttribute('height', "80");

                itemImagen.appendChild(image);

                listItem.appendChild(itemName);
                listItem.appendChild(itemURL);
                listItem.appendChild(itemImagen);

                listGroup.appendChild(listItem);
            })
            backCedula.appendChild(title);
            backCedula.appendChild(listGroup);
    })
}