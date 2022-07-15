
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
    ref, 
    uploadBytes  
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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

export const clienteContrato = (nombre, email, telefono, rut, comuna, direccion, profesion, acepto, ingreso) => {
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
    })
};

export const clienteNuevo = (nombre, email, telefono, riesgo) => {
    addDoc(collection(db, 'clienteNuevo'), {
        nombre: nombre,
        email: email,
        telefono: telefono,
        riesgo: riesgo
    })
};

// export const getClientes = async () => await getDocs(collection(db, 'clientesContrato'));

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

const storage = getStorage();
const storageFrontRef = ref(storage, `image/cedulaFront/front_${Date.now()}.png`);
const storageBackRef = ref(storage, `image/cedulaBack/back_${Date.now()}.png`);

export const getImageFront = (front) => {
    uploadBytes(storageFrontRef, front)
        .then((snapshot) => {
            console.log('imagen de front cargada')
        })
}

export const getImageBack = (back) => {
    uploadBytes(storageBackRef, back)
        .then((snapshot) => {
            console.log('imagen de back cargada')
        })
}