
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

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
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"

import { getAuth, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"

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

export const clienteContrato = (nombre, email, telefono, rut, comuna, direccion, profesion) => {
    addDoc(collection(db, 'clientesContrato'), {
        nombre: nombre,
        email: email,
        telefono: telefono,
        rut: rut,
        comuna: comuna,
        direccion: direccion,
        profesion: profesion
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

export const verificarCorreoElectrónico = (email, action) => {
    sendSignInLinkToEmail(auth, email, action)
        .then(() => {
            console.log('hemos enviado un link de confirmacion')
        })
        .catch((error) => console.log(error.code))
};