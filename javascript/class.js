// This page constructs all the classes used in the program

// THE FOLLOWING BLOCK IS FOR THE USER CLASS
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

// END BLOCK

// THE FOLLOWING BLOCK IS FOR THE ELECTIVE CLASS
class Elective {
  constructor(electiveName) {
    this.electiveName = electiveName;
    this.ratingCriterias = [];
  }
  // Add criteria into the ratingCriteria array
  addRatingCriteria(criteria) {
    this.ratingCriterias.push(criteria);
  }
  // Generate table to input ratings based on ratingCriterias and electives
  generateEditTable() {
    var headerHTML = "<table><tr><th>" + this.electiveName + "</th>";
    var rowHTML = "";

    for (const ratingCriteria of this.ratingCriterias) {
      headerHTML += "<th>" + ratingCriteria.criteriaName + "</th>";
      // The data-elective and data-ratingcriteria are used in line 86-87 in overview.js
      rowHTML += "<td><input type='number' class='inputbox' data-elective='" + this.electiveName + "' data-ratingcriteria='" + ratingCriteria.criteriaName + "' /></td>"
    }
    headerHTML += "</tr>";
    headerHTML += "<tr><td></td>" + rowHTML + "</tr><br>";
    return headerHTML;
  }
  // Generate table with the average ratings and the overall ratings
  generateFixedTable() {
    var fixedHeaderHTML = "<table><tr><th>" + this.electiveName + "</th>";
    var fixedRowHTML = "";

    for (const ratingCriteria of this.ratingCriterias) {
      fixedHeaderHTML += "<th>" + ratingCriteria.criteriaName + "</th>";
      fixedRowHTML += "<td>" + ratingCriteria.calculateRatingCriteriaAvg() + "</td>"
    }
    fixedHeaderHTML += "</tr>";
    fixedHeaderHTML += "<tr><td>" + this.calculateElectiveAvg() + "</td>" + fixedRowHTML + "</tr><br>";
    return fixedHeaderHTML;
  }
  // Calculate the electives' ratingCriteria average
  calculateElectiveAvg() {
    var sum = 0;
    for (i = 0; i < this.ratingCriterias.length; i++) {
      sum += this.ratingCriterias[i].calculateRatingCriteriaAvg();
    }
    return Math.floor((sum / this.ratingCriterias.length) * 100) / 100;
  }
}

// END BLOCK

// THE FOLLOWING BLOCK IS FOR THE RATINGCRITERIA CLASS
class RatingCriteria {
  constructor(criteriaName) {
    this.criteriaName = criteriaName;
    this.ratings = [];
  }
  // Calculate the ratingCriteria average
  calculateRatingCriteriaAvg() {
    var sum = 0;
    for (const rating of this.ratings) {
      sum += rating.ratingValue;
    }
    var avg = Math.floor((sum / this.ratings.length) * 100) / 100; // variable that get immediately returned
    return avg;
  }
  // Checks if the userRating is valid and push it into the rating's array
  addRating(userRating) {
    userRating.ratingValue = parseInt(userRating.ratingValue) // Converting value to number
    if (userRating.ratingValue != "") { //Check if input is not empty
      if (userRating.ratingValue != NaN) { //Check if input is a number
        if (userRating.ratingValue > 0 && userRating.ratingValue <= 5) {
          this.ratings.push(userRating);
        }
      }
    }
  }
}

// END BLOCK

// THE FOLLOWING BLOCK IS FOR THE RATING CLASS
class Rating {
  constructor(user, ratingValue) {
    this.user = user;
    this.ratingValue = ratingValue;
  }
}

// END BLOCK