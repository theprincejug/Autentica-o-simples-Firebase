const firebaseConfig = {
  apiKey: "AIzaSyBJuQXRWxZduXAYagYQem_U0zejL2uNvxM",

  authDomain: "pumma-323d4.firebaseapp.com",

  projectId: "pumma-323d4",

  storageBucket: "pumma-323d4.appspot.com",

  messagingSenderId: "630909795743",

  appId: "1:630909795743:web:187e09a9eb2ff592e451aa",

  measurementId: "G-P0Q9ZTENZ7",
};

// Inicializa o Firebase com as configurações fornecidas
firebase.initializeApp(firebaseConfig);

// Inicializa as variáveis auth e database para facilitar o acesso aos serviços do Firebase
const auth = firebase.auth();
const database = firebase.database();

let email = document.getElementById("email");
let senha = document.getElementById("password");

function displayFeedback(message, isError = false) {
  const feedbackContainer = document.getElementById("feedback");

  feedbackContainer.style.color = isError ? "red" : "green";
  feedbackContainer.innerText = message;
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      displayFeedback("Usuário Logado com Sucesso!!");
    })
    .catch(function (error) {
      displayFeedback("Usuário não Logado", true);
    });
}

function cadastrar() {
  let newEmail = email.value;
  let newSenha = senha.value;

  try {
    if (newSenha.length < 6 || newSenha.length > 10)
      throw new Error("A senha deve ter entre 6 e 10 caracteres");
    
    if (!isNaN(newSenha))
      throw new Error("A senha deve conter ao menos uma letra");

    if (!/\d/.test(newSenha))
      throw new Error("A senha deve conter ao menos um numero");

    if (
      !/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(
        newEmail
      )
    )
      throw new Error("O email necessita ser válido");
  } catch (error) {
    displayFeedback(error.message);
    return;
  }

  auth
    .createUserWithEmailAndPassword(newEmail, newSenha)
    .then((userCredencial) => {
      const user = userCredencial.user;

      const userData = {
        email: newEmail,
        senha: newSenha,
        registration_time: new Date().toString(),
      };

      database.ref("users/" + user.uid).set(userData);

      displayFeedback("Usuario criado!");
    })
    .catch((error) => displayFeedback("ta com b.o!!"));
}
