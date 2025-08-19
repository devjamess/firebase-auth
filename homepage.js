import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth,
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged, 
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
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) =>{
    //busca o id do usuario autenticado salvo no localstorage
    const loggedInUserId = localStorage.getItem('loggedUserInId')

    //se o ID estiver no localstorage, tenta obter os dados do Firestore
    if(loggedInUserId){ 
        console.log(user)
        // referencia ao documento do usuraio no Firestore
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
        .then((docSnap) => {
            if(docSnap.exists()){
                const userData = docSnap.data();
                document.getElementById('loggedInUserId').innerText = userData.firstName;
                document.getElementById('loggedInUserId').innerText = userData.email;
                document.getElementById('loggedInUserId').innerText = userData.lastName;
            } else {
                console.log('ID não encontrado no Documento')
            }
        })
        .catch((error) => {
            console.log('documento nao encontrado')
        });
    }else{
        cosole.log('ID de usuario não encontrado no localStorage')
    }
});

//logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click',()=>{
    localSotrage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href = 'index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error)
    })
});