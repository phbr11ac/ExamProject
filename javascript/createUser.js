const firstNameUI = document.getElementById('firstname')
const lastNameUI = document.getElementById('lastname')
const usernameUI = document.getElementById('username') 
const passwordUI = document.getElementById('password')
const checkboxUI = document.getElementById('terms')
const submitBtnUI = document.getElementById('submit-btn')
const resultSpanUI = document.getElementById('resultSpan')
const pattern = /^\"?[\w-_\.]*\"?@student.cbs\.dk$/

submitBtnUI.onclick = function () {
  if (checkboxUI.checked) {
    if (firstNameUI.value.length > 0 && lastNameUI.value.length > 0 && usernameUI.value.length > 0 && passwordUI.value.length > 0) {
        if (passwordUI.value.length > 7) {
          if (pattern.test(usernameUI.value) == true) {
            for (let i = 0; i < users.length; i++) {
              if (usernameUI.value === users[i].username) {
              resultSpanUI.innerText = 'Username is already in use'
              return false
              }
            }
            users.push(new User(firstNameUI.value, lastNameUI.value, usernameUI.value, passwordUI.value));
            localStorage.setItem('users', JSON.stringify(users));
            alert('The user has been created')
            window.location.assign('./login.html')
          }
          else {
            resultSpanUI.innerText = "You need to use a CBS email"
            return false
          }
                }
          else {
            resultSpanUI.innerText = "Your password is too short"
            return false
          }
        } 
        else {
          resultSpanUI.innerText = "You need to fill out the form"
          return false
        }
      }
    else {
      resultSpanUI.innerText = "You need to accept the terms and conditions"
    }
}

gobackbutton.onclick = function () {
  window.location.assign("./login.html")
}