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

class Admin extends User {
  constructor(firstName, lastName, username, password, adminRights) {
    super(firstName, lastName, username, password);
    this.adminRights = adminRights;
  }
  addElective() {
    // a method for the admin to add an elective to the electives array
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
    let editHeaderHTML = "<table><tr><th>" + this.electiveName + "</th>";
    let editRowHTML = "";

    for (const ratingCriteria of this.ratingCriterias) {
      editHeaderHTML += "<th>" + ratingCriteria.criteriaName + "</th>";
      // The data-elective and data-ratingcriteria are used in line 86-87 in overview.js
      editRowHTML += "<td><input type='number' class='inputbox' data-elective='" + this.electiveName + "' data-ratingcriteria='" + ratingCriteria.criteriaName + "' /></td>"
    }
    editHeaderHTML += "</tr>";
    editHeaderHTML += "<tr><td></td>" + editRowHTML + "</tr></table><br>";
    return editHeaderHTML;
  }
  // Generate table with the average ratings and the overall ratings
  generateFixedTable() {
    let fixedHeaderHTML = "<table><tr><th>" + this.electiveName + "</th>";
    let fixedRowHTML = "";

    for (const ratingCriteria of this.ratingCriterias) {
      fixedHeaderHTML += "<th>" + ratingCriteria.criteriaName + "</th>";
      fixedRowHTML += "<td>" + ratingCriteria.calculateRatingCriteriaAvg() + "</td>"
    }
    fixedHeaderHTML += "</tr>";
    fixedHeaderHTML += "<tr><td>" + this.calculateElectiveAvg() + "</td>" + fixedRowHTML + "</tr></table><br>";
    return fixedHeaderHTML;
  }
  // Calculate the electives' ratingCriteria average
  calculateElectiveAvg() {
    let sum = 0;
    for (i = 0; i < this.ratingCriterias.length; i++) {
      sum += this.ratingCriterias[i].calculateRatingCriteriaAvg();
    }
    if (sum > 0) {
      return Math.floor((sum / this.ratingCriterias.length) * 100) / 100;
    }
    else {
      return "Not able to calculate average"
    }
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
    let sum = 0;
    for (const rating of this.ratings) {
      sum += rating.ratingValue;
    }
    if (sum > 0) {
      return Math.floor((sum / this.ratings.length) * 100) / 100;
    }
    else {
      return "Not yet rated"
    }
  }
  // Checks if the userRating is valid and push it into the rating's array
  addRating(userRating) {
    userRating.ratingValue = parseInt(userRating.ratingValue) // Converting value to number
    if (userRating.ratingValue != ""
      && userRating.ratingValue != NaN
      && userRating.ratingValue > 0
      && userRating.ratingValue <= 5) { //Check if input is not empty and is a number between 1 and 5
      this.ratings.push(userRating);
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