if (localStorage.getItem('users') === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i++) {
    users[i] = new User(users[i].firstName, users[i].lastName, users[i].username, users[i].password);
  }
}

/*
Things to do:
3) (DOING) Fix problem with tab saving values inside ratings (L)
-- PB: With help from Jan I changed from "keyup" to "blur". It works better, but not perfectly

5) (DOING) Make it impossible to input other things than numbers between 1 and 5 (M)
-- PB: This can done with a "min: 1" "max:5" inside the table definition, but didn't work out perfectly

6) Overwrite ratings if student already rated (XXXL)

7) Move methods into User and Rating class (L)
-- PB: I'm not sure whether the createUser() should be added to the User class. It's basically one line of code

To do Thursday:
-- How to move code from main to User class?
-- Move (*) from overview.js to Rating class.
-- Line 77 in overview.js: Only save ratings when submit button is pushed. Remove blur thingy.

100) Renaming all the text inside website

101) Add a pop out menu with our "Terms and conditions"
-- PB: Not that important

Things for the exam:
1) How would you integrate student and admin into the User class? (Child and parent)


DONE:
1) (DONE) Use the entire user object in currentUser (M)
-- PB: I'm pretty sure this is working now. But not sure why/how we should use it
2) (DONE) Save everything in localstorage (XXL)
-- PB: This has been done
4) (DONE) Add a logout button
-- PB: This has been done
8) (DONE) Integrate electiveAvg into table (XL)
-- PB: This has been done
9) (DONE) Check for CBS email (M)
-- PB: This has been done
-- (DONE) Line 28 (**) in overview.js: remove window.onload to be able to use savedRatings array from the beginning
-- (DONE) Line 52 in overview.js: How to push electives array onto savedRatings array and saving to localStorage.
-- (DONE) Combine the arrays electives and savedRatings and then update the table (XXL)








Notes from Martens class:

Do code review before handing in the code
Fully understand every line of code
Test if everything still works
Add comments to describe the code



The oral exam will be a code review / discussion about your code.
*/