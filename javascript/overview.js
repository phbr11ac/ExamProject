// Array of all the criteria
const ratingCriterias = [
  new RatingCriteria("Friendliness"),
  new RatingCriteria("Humor"),
  new RatingCriteria("Techiness")
];

// Array of all the electives
const electives = [
  new Elective("T1"),
  new Elective("P1"),
  new Elective("B1")
];

// Loading the current user (*)
currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
var savedRatings = []
overallRatings = JSON.parse(localStorage.getItem('overallratings'));
if (overallRatings !== null) {
  for (let i = 0; i < overallRatings.length; i++) {
    savedRatings[i] = new Elective(overallRatings[i].electiveName)

    for (let u = 0; u < overallRatings[i].ratingCriterias.length; u++) {
      savedRatings[i].ratingCriterias.push(new RatingCriteria(overallRatings[i].ratingCriterias[u].criteriaName))

      for (y = 0; y < overallRatings[i].ratingCriterias[u].ratings.length; y++) {
        let user = overallRatings[i].ratingCriterias[u].ratings[y].user;
        savedRatings[i].ratingCriterias[u].ratings.push(new Rating(new User(user.firstName, user.lastName, user.username, user.password), overallRatings[i].ratingCriterias[u].ratings[y].ratingValue))
      }
    }
  }
  // A submit button to save ratings inside localStorage
  document.getElementById('submit-btn').onclick = function () {
    saveToLocalStorage(savedRatings)
  }
}
else {
  document.getElementById('submit-btn').onclick = function () {
    saveToLocalStorage(electives)
  }
}

function saveToLocalStorage(arrayName) {
  for (let i = 0; i < electives.length; i++) {
    for (let u = 0; u < ratingCriterias.length; u++) {
      if (electives[i].ratingCriterias[u].ratings.length > 0 && electives[i].ratingCriterias[u].ratings !== undefined) {
        arrayName[i].ratingCriterias[u].ratings.push(electives[i].ratingCriterias[u].ratings[0])  // does ratings acutally need to be an array on our eletive 
      }
    }
  }
  localStorage.setItem('overallratings', JSON.stringify(arrayName));
  document.location.reload(true)
}

// Adding all the ratingCriterias to electives
for (i = 0; i < electives.length; i++) {
  for (u = 0; u < ratingCriterias.length; u++) {
    electives[i].addRatingCriteria(new RatingCriteria(ratingCriterias[u].criteriaName));
  }
}

// Generate the input tables
var inputTable = "";

for (const elective of electives) {
  inputTable += elective.generateEditTable();
}
document.getElementById('tableContent').innerHTML = inputTable;

// To push inputs in ratings array
let inputs = document.getElementsByClassName("inputbox");

for (const input of inputs) {
  input.addEventListener("blur", function (event) {
    var electiveValue = event.target.dataset.elective;
    var ratingCriteriaValue = event.target.dataset.ratingcriteria;

    for (const elective of electives) {
      if (elective.electiveName != electiveValue) {
        continue;
      } else {
        for (const ratingCriteria of elective.ratingCriterias) {
          if (ratingCriteria.criteriaName != ratingCriteriaValue) {
            continue;
          } else {
            if (event.target.value.length > 0 && event.target.value.length < 2) {
              let jsonUser = JSON.parse(localStorage.getItem('currentUser'));
              let user = new User(jsonUser.firstName, jsonUser.lastName, jsonUser.username, jsonUser.password);
              ratingCriteria.addRating(new Rating(user, event.target.value));
            }
          }
        }
      }
    }
  });
}

// Generate the fixed tables with average values  
var fixedTable = "";
for (const savedRating of savedRatings) {
  fixedTable += savedRating.generateFixedTable()
}
document.getElementById('tableContentFixed').innerHTML = fixedTable; 