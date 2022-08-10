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
        snapshot.forEach((dataImg) => {
                // console.log(dataImg.val())
                const { ImageName, ImageURL } = dataImg.val();
                
                const itemName = document.createElement('li')
                itemName.textContent = ImageName;

                const itemURL = document.createElement('li')
                const linkURL = document.createElement('a');
                linkURL.textContent = 'front';
                linkURL.href = ImageURL;
                linkURL.target = '_blank';
                linkURL.setAttribute('download', ImageName);
                
                itemURL.appendChild(linkURL);

                const itemImagen = document.createElement('li');
                const image = document.createElement('img');
                image.src = linkURL;
                image.setAttribute('width', "150");
                image.setAttribute('height', "80");

                itemImagen.appendChild(image);

                listGroup.appendChild(itemName);
                listGroup.appendChild(itemURL);
                listGroup.appendChild(itemImagen);
            })
            frontCedula.appendChild(listGroup);
    })
}

function getImagenBackURL(){
    
    get(child(dbRef, "imagesBack"))
    .then((snapshot) => {
        const listGroup = document.createElement('ul');
        snapshot.forEach((dataImg) => {
                // console.log(dataImg.val())
                const { ImageName, ImageURL } = dataImg.val();
                
                const itemName = document.createElement('li')
                itemName.textContent = ImageName;

                const itemURL = document.createElement('li')
                const linkURL = document.createElement('a');
                linkURL.textContent = 'front';
                linkURL.href = ImageURL;
                linkURL.target = '_blank';
                linkURL.setAttribute('download', ImageName);
                
                itemURL.appendChild(linkURL);

                const itemImagen = document.createElement('li');
                const image = document.createElement('img');
                image.src = linkURL;
                image.setAttribute('width', "150");
                image.setAttribute('height', "80");

                itemImagen.appendChild(image);


                listGroup.appendChild(itemName);
                listGroup.appendChild(itemURL);
                listGroup.appendChild(itemImagen);
            })
            backCedula.appendChild(listGroup);
    })
}