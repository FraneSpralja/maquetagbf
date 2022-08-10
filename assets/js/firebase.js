
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";

import {
    getFirestore,
    collection,
    doc, 
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"

import { getAuth, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js"

import {
    getStorage, 
    ref as sRef, 
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js"

import {
    getDatabase, 
    ref, 
    set,
    child,
    get,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
apiKey: "AIzaSyDPGZcHUmFsKbAjyiYQODr8wF3jL-fyV0E",
authDomain: "inteligenciafinanciera-cfb97.firebaseapp.com",
projectId: "inteligenciafinanciera-cfb97",
storageBucket: "inteligenciafinanciera-cfb97.appspot.com",
messagingSenderId: "460677556693",
appId: "1:460677556693:web:5d664d876a60721892355c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const clienteContrato = (nombre, email, telefono, rut, comuna, direccion, profesion, acepto, ingreso, id) => {
    addDoc(collection(db, 'clientesContrato'), {
        nombre: nombre,
        email: email,
        telefono: telefono,
        rut: rut,
        comuna: comuna,
        direccion: direccion,
        profesion: profesion,
        acepto: acepto,
        ingreso: ingreso,
        idImg: id,
    })
};

// FIRESTORE

export const clienteNuevo = (nombre, email, telefono, riesgo) => {
    addDoc(collection(db, 'clienteNuevo'), {
        nombre: nombre,
        email: email,
        telefono: telefono,
        riesgo: riesgo
    })
};

export const onGetClientes = (callback) => {
    onSnapshot(collection(db, 'clientesContrato'), callback)
}

export const deleteCliente = (id) => {
    deleteDoc(doc(db, 'clientesContrato', id));
}

export const getCliente = (id) => getDoc(doc(db, 'clientesContrato', id));

export const updateCliente = (id, nuevosDatos) => {
    updateDoc(doc(db, 'clientesContrato', id), nuevosDatos)
}

const auth = getAuth();

export const verificarCorreoElectronico = (email, action) => {
    sendSignInLinkToEmail(auth, email, action)
        .then(() => {
            console.log('hemos enviado un link de confirmacion')
        })
        .catch((error) => console.log(error.code))
};

// STORAGE

const storage = getStorage();

export async function setImageFront (front) {
    const metaData = {
        contentType: front.type
    }
    uploadBytesResumable(sRef(storage, `image/cedulaFront/front_${getNameFile(front)}${getFileExt(front)}`), front, metaData)
        .on('stage-changed', (snapshot) => {
            console.log('imagen de front cargada')
        })
}

export async function setImageBack(back) {
    const metaData = {
        contentType: back.type
    }
    uploadBytesResumable(sRef(storage, `image/cedulaBack/back_${getNameFile(back)}${getFileExt(back)}`), back, metaData)
        .on('stage-changed', (snapshot) => {
            console.log('imagen de back cargada')
        })
}

export function getImageFront(front) {
    const metaData = {
        contentType: front.type
    }
    getDownloadURL(uploadBytesResumable(sRef(storage, `image/cedulaFront/front_${getNameFile(front)}${getFileExt(front)}`), front, metaData).snapshot.ref)
        .then((downloadURL) => {
            setTimeout(() => {
                guardarImagenFrontURL(downloadURL, front)
            }, 1000)
        })
}

export function getImageBack(back) {
    const metaData = {
        contentType: back.type
    }
    getDownloadURL(uploadBytesResumable(sRef(storage, `image/cedulaBack/back_${getNameFile(back)}${getFileExt(back)}`), back, metaData).snapshot.ref)
        .then((downloadURL) => {
            setTimeout(() => {
                guardarImagenBackURL(downloadURL, back)
            }, 1000)
        })
}

function getFileExt(file) {
        let temp = file.name.split('.')
        let ext = temp.slice((temp.length-1),(temp.length));
        return '.' + ext[0];
}

function getNameFile(file) {
    let temp = file.name.split('.');
    let fname = temp.slice(0,-1).join('.');
    return fname;
}

// REALDATABASE

const realdb = getDatabase()
export const dbRef = ref(realdb)

function guardarImagenFrontURL(URL, file){
    let name = getNameFile(file);
    let ext = getFileExt(file);

    set(ref(realdb, "imagesFront/"+name), {
        ImageName: (name+ext),
        ImageURL: URL
    })
}

function guardarImagenBackURL(URL, file){
    let name = getNameFile(file);
    let ext = getFileExt(file);

    console.log(file)

    set(ref(realdb, "imagesBack/"+name), {
        ImageName: (name+ext),
        ImageURL: URL
    })
}