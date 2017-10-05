// Initialize Firebase
(function(){
    var config = {
        apiKey: "AIzaSyCrfbcS3Ut5BoyCfNaX-WPUjmglB8cf1kE",
        authDomain: "game-jumper.firebaseapp.com",
        databaseURL: "https://game-jumper.firebaseio.com",
        projectId: "game-jumper",
        storageBucket: "game-jumper.appspot.com",
        messagingSenderId: "1076316179864"
    };
    firebase.initializeApp(config);
    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogOut = document.getElementById('btnLogOut');
    //Add Login Event
    btnLogin.addEventListener('click', e => {
        //Get Email & Pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    //Add SignUp Event
    btnSignUp.addEventListener('click', e => {
        //Get Email & Pass
        //TODO: Check For Real Email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise
            .catch(e => console.log(e.message));
    });
    //Add RealTime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('Not Logged In');
        }
    });
}());