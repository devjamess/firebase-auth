import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup,
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
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById("submitSignUp");

signUp.addEventListener("click", (ev) => {
    ev.preventDefault();

    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

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



const signInGoogle = document.getElementById("submitSignInGoogle");
signInGoogle.addEventListener("click", event => {
    event.preventDefault();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();


    signInWithPopup(auth, provider)
        .then((userCredential) => {
            showMessage('usuário logado com sucesso', 'signInMessage'); 
            const user = userCredential.user; 

            localStorage.setItem('loggedInUserId', user.uid);

            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Email ou Senha incorreta", "signInMessage");
            } else {
                showMessage("Essa conta não existe", "signInMessage");
            }
        });
});



const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", event => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    //Realiza o login com email e senha
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('usuário logado com sucesso', 'signInMessage'); //exibe mensagem de sucesso
            const user = userCredential.user; //usuario autenticado

            // Salva o ID no localStorage
            localStorage.setItem('loggedInUserId', user.uid);

            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Email ou Senha incorreta", "signInMessage");
            } else {
                showMessage("Essa conta não existe", "signInMessage");
            }
        });
});