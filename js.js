var password = document.getElementById('passwordInput');

var meterGood = document.getElementById('meter-good');
var meterOk = document.getElementById('meter-ok');
var meterWeak = document.getElementById('meter-weak');
var meterWeakest = document.getElementById('meter-weakest');

password.addEventListener('input', function() {
    var val = password.value;
    var result = zxcvbn(val).score;

    if (val){
        if (result == 0) {
            meterWeakest.style.backgroundColor ="red";
        }else if(result == 1){
            meterWeak.style.backgroundColor = "orange";
            meterWeakest.style.backgroundColor ="red";
        } else if(result == 2) {
            meterOk.style.backgroundColor = "yellow";
            meterWeakest.style.backgroundColor ="red";
            meterWeak.style.backgroundColor = "orange";
        }else if(meterGood == 3 || 4) {
            meterGood.style.backgroundColor = "green"
            meterWeakest.style.backgroundColor ="red";
            meterWeak.style.backgroundColor = "orange";
            meterOk.style.backgroundColor = "yellow";
        } 
    } else {
        meterGood.style.backgroundColor = "grey";
        meterWeakest.style.backgroundColor ="grey";
        meterWeak.style.backgroundColor = "grey";
        meterOk.style.backgroundColor = "grey";
    }
});

function onShowPassword() {
    document.getElementById("passwordInput").type = "text";
    document.getElementById("eyeIcon").classList.remove("show-icon");
    document.getElementById("eyeslashIcon").classList.add("show-icon");
}

function onHidePassword() {
    document.getElementById("passwordInput").type = "password";
    document.getElementById("eyeslashIcon").classList.remove("show-icon");
    document.getElementById("eyeIcon").classList.add("show-icon");
}

function fetchLogin(registeringUser) {
    var myHeaders = new Headers();
    myHeaders.append("Accept-Encoding", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({data: registeringUser}),
    redirect: 'follow'
    };

    fetch("https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        alert(result);
    })
    .catch(error => {
        console.log('error', error);
    });
}

function login(event) {
    event.preventDefault();
    var registeringUser = {
        email: document.getElementById("email").value, 
        password: document.getElementById("passwordInput").value
    };
    fetchLogin(registeringUser);
}