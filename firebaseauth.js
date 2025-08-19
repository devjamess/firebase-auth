import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyDsRzkoZPqXsfoTQ8Tmswd1g5mXgdiIRQ4",
    authDomain: "fir-base-id890.firebaseapp.com",
    projectId: "fir-base-id890",
    storageBucket: "fir-base-id890.firebasestorage.app",
    messagingSenderId: "931450359843",
    appId: "1:931450359843:web:80cb043070a497eb796196",
    measurementId: "G-05Q4MESQGR"
  };
 
const app = initializeApp(firebaseConfig);
 
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = "message";
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}
 
const signUp = document.getElementById("submitSignUp");
 
signUp.addEventListener("click", (ev) => {
    ev.preventDefault();
 
    const email = document.getElementById("email").ariaValueMax;
    const password = document.getElementById("password").ariaValueMax;
    const firstName = document.getElementById("Fname").ariaValueMax;
    const lastName = document.getElementById("Lname").ariaValueMax;
 
    const auth = getAuth();
    const db = getFirestore();
 
    createUserWithEmailAndPassword(auth, email, password)
        .then( userCredential => {
            const user = userCredential.user;
            const userData = { email, firstName, lastName };
 
            showMessage("Conta criada com sucesso", "signUpMessage");
 
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch(error => {
                    console.error("Error writing document", error);
                })
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Endereço de email já existe", "signUpMessage");
            } else {
                showMessage("Não é possível criar usuário", "signUpMessage");
            }
        });
});
 
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", event => {
    event.preventDefault();
 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
})
 
// Realiza o Login com email e senha
signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
        showMessage("Login realizado com sucesso", "signInMessage"); //exibe mensagem de sucesso
        const user = userCredential.user;
 
        //Salva o ID do usuário no Local Storage
        localStorage.setItem('loggedUserId', user.uid);
 
        window.location.href = "homepage.html"; //Redireciona para a página inicial
    })
    .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
                showMessage("Email ou senha inválidos", "signInMessage");
        } else {
            showMessage("Não foi possível realizar o login", "signInMessage");
        }
    });
 