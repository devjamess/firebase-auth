//importa as funções necessatias do firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"

//configuração do firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsRzkoZPqXsfoTQ8Tmswd1g5mXgdiIRQ4",
    authDomain: "fir-base-id890.firebaseapp.com",
    projectId: "fir-base-id890",
    storageBucket: "fir-base-id890.firebasestorage.app",
    messagingSenderId: "931450359843",
    appId: "1:931450359843:web:80cb043070a497eb796196",
    measurementId: "G-05Q4MESQGR"
  };

//inicializa o firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth() //configura o firebase authentication
const db = getFirestore() //conecta ao firestore

//monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca o id do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //se o Id estiver no localStorage, tenta obter os dados do firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); //referencia ao documento do usuário no firestore

        getDoc(docRef) //Busca o documento
            .then((docSnap) => {
                //se o documento existir, exibe os dados na interface
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log(userData)
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                } else {
                    console.log("ID não encontrado no documento");
                }
            })
            .catch((error) => {
                console.log("documento não encontrado")
            });
    } else {
        console.log("ID não encontrado no localStorage");
    }
});

//Lógica de logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o ID do usuário do localStorage
    signOut(auth) //realiza o logout
        .then(() => {
            window.location.href = "index.html"; //redireciona para a página de login
        })
        .catch((error) => {
            console.error("Error Signing Out:", error);
        });
});