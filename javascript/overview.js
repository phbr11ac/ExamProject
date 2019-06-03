// This page is responsible for the rating system and calculating the averages

// The master array (First layer)
const electives = [
  new Elective("T1"),
  new Elective("P1"),
  new Elective("B1")
];

// Array of all the criteria. Input for the second layer of electives
const ratingCriterias = ["Friendliness", "Humor", "Techiness"]

// Creation of the second layer - pushing all ratingCriterias to each of the electives
for (i = 0; i < electives.length; i++) {
  for (u = 0; u < ratingCriterias.length; u++) {
    electives[i].addRatingCriteria(new RatingCriteria(ratingCriterias[u]));
  }
}

/* BLOCK OF CODE FOR THE ELEMENTS ON THE WEBSITE */

// Loading the current user
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser === null) {
  alert("You need to login")
  window.location.assign("./login.html");
}

// Log out button
document.getElementById('logout-btn').onclick = function () {
  localStorage.removeItem("currentUser");
  window.location.assign("./login.html");
}

// Load ratings from localStorage
let savedRatings = []
let overallRatings = JSON.parse(localStorage.getItem('overallratings'));
if (overallRatings !== null) {
  for (let i = 0; i < overallRatings.length; i++) {
    savedRatings[i] = new Elective(overallRatings[i].electiveName)
    for (let u = 0; u < overallRatings[i].ratingCriterias.length; u++) {
      savedRatings[i].addRatingCriteria(new RatingCriteria(overallRatings[i].ratingCriterias[u].criteriaName))
      for (y = 0; y < overallRatings[i].ratingCriterias[u].ratings.length; y++) {
        let user = overallRatings[i].ratingCriterias[u].ratings[y].user;
        savedRatings[i].ratingCriterias[u].ratings.push(new Rating(new User(user.firstName, user.lastName, user.username, user.password), overallRatings[i].ratingCriterias[u].ratings[y].ratingValue))
      }
    }
  }
  // A submit button to save ratings inside localStorage
  saveToLocalStorage(savedRatings)
}
else {
  saveToLocalStorage(electives)
}

// Generate the input tables
let inputTable = "";
for (const elective of electives) {
  inputTable += elective.generateEditTable();
}
document.getElementById('tableContent').innerHTML = inputTable;

// Generate the fixed tables with average values  

let fixedTable = "";
for (const savedRating of savedRatings) {
  fixedTable += savedRating.generateFixedTable()
}
document.getElementById('tableContentFixed').innerHTML = fixedTable;

/* END OF BLOCK */

// Creation of the third layer - pushing the ratings to the respective rating criteria
let inputs = document.getElementsByClassName("inputbox");

for (const input of inputs) {
  input.addEventListener("blur", function (event) {
    var tableElectiveName = event.target.dataset.elective;
    var tableRatingCriteriaName = event.target.dataset.ratingcriteria;
    for (const elective of electives) {
      if (elective.electiveName == tableElectiveName) {
        for (const ratingCriteria of elective.ratingCriterias) {
          if (ratingCriteria.criteriaName == tableRatingCriteriaName
            && event.target.value.length > 0
            && event.target.value.length < 2) {
            let user = new User(currentUser.firstName, currentUser.lastName, currentUser.username, currentUser.password);
            ratingCriteria.addRating(new Rating(user, event.target.value));
          }
        }
      }
    }
  });
}

// Function to save arrays to localStorage that behaves differently for savedRatings
function saveToLocalStorage(arrayName) {
  document.getElementById('submit-btn').onclick = function () {
    for (let i = 0; i < electives.length; i++) {
      for (let u = 0; u < ratingCriterias.length; u++) {
        if (electives[i].ratingCriterias[u].ratings.length > 0 && electives[i].ratingCriterias[u].ratings !== undefined) {
          if (arrayName == savedRatings) {
            arrayName[i].ratingCriterias[u].ratings.push(electives[i].ratingCriterias[u].ratings[0])
            localStorage.setItem('overallratings', JSON.stringify(arrayName));
          }
          else {
            localStorage.setItem('overallratings', JSON.stringify(arrayName));
          }
        }
      }
    }
    document.location.reload(true)
  }
}