// To check if student already logged it
if (localStorage.getItem('currentUser') !== null) {
    window.location.assign("./overview.html")
} 

adduser.onclick = function () {
    window.location.assign("./createUser.html")
}

// Defining variables to be used in a later change of the code
var count = 0
const resultSpanUI = document.getElementById('resultSpan')
const loginUsername = document.getElementById('loginusername')
const loginPassword = document.getElementById('loginpassword')

// Enables login by pressing enter inside the loginpassword box
document.getElementById("loginpassword").addEventListener("keyup", function(event) {
    event.preventDefault();
        if (event.keyCode === 13) {
          login.onclick();
    }
});

// Login function
login.onclick = function() {
    var inputUsername = loginUsername.value;
    var inputPassword = loginPassword.value;

    if (inputPassword.length < 1 || inputUsername.length < 1) {
        resultSpanUI.innerText = "You should input something";
        return false; 
    }
// Checks the number of login attempts
        if (count == 2) {
            resultSpanUI.innerText = "You have used all your attempts";
            document.getElementById('loginusername').disabled=true;
            document.getElementById('loginpassword').disabled=true;
            return false 
        }
// Checks if username and password are in localStorage
            for (let i = 0; i < users.length; i ++) {
                if (inputPassword == users[i].password && inputUsername == users[i].username) {  
                    alert('Login is correct')
                    localStorage.setItem('currentUser', JSON.stringify(users[i]));
                    window.location.assign("./overview.html");
                    return true;
                }
            }
    loginUsername.value = "";
    loginPassword.value = "";
    resultSpanUI.innerText = "Username or password not in database. Try again";
    count ++
    return false;
}