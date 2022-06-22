
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"
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