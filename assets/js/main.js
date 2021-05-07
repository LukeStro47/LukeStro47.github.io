(function() {
    emailjs.init('user_9jzubAKlBplngwwYCfnBw');
})();
function sendStuff() {
    /*var params = {
        subject:
    };*/
    emailjs.sendForm('sendgrid', 'personal', 'contact-form')
        .then(function() {
            var elems = document.getElementsByClassName("form-control");
            for(var i = 0; i < elems.length; i++) {
                elems[i].value = "";
            }
            document.getElementById("submit").style.backgroundColor = "green";
            setTimeout(function(){ document.getElementById("submit").style.backgroundColor = "black"; }, 3000);
        }, function(error) {
            console.log('FAILED...', error);
            alert("Email failed to send.")
        });
}