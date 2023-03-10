const bcrypt = require("bcryptjs");
const saltRounds = 10; // define the number of salt rounds
const password = "myPassword123";
bcrypt.hash(password, saltRounds, function (err, hash) {
  // Store the hashed password in your database
  console.log(hash);
});

const hash = "$2b$10$7Vh5AaH5VJy5/M3W5PY8NO.lxFhJcKmyZQtez/mRJ8rgQjC2cVvyu"; // the hashed password retrieved from your database
bcrypt.compare(password, hash, function (err, result) {
  if (result === true) {
    console.log("Password is correct");
  } else {
    console.log("Password is incorrect");
  }
});
