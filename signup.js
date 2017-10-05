// Initialize Firebase
(function(){
    var config = {
        apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
        authDomain: "game-jumper-tester.firebaseapp.com",
        databaseURL: "https://game-jumper-tester.firebaseio.com",
        projectId: "game-jumper-tester",
        storageBucket: "game-jumper-tester.appspot.com",
        messagingSenderId: "457793690679"
    };
    firebase.initializeApp(config);
    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnSignUp = document.getElementById('btnSignUp');
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