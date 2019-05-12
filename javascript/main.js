// Retrieving already created users from localStorage
if (localStorage.getItem('users') === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i++) {
    users[i] = new User(users[i].firstName, users[i].lastName, users[i].username, users[i].password);
  }
}