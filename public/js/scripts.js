function registerUser() {
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmpassword");

  if (
    !firstName.value ||
    !lastName.value ||
    !username.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    alert("Please fill in all fields.");
    return;
  } else if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return;
  } else if (
    password.value.length < 8 ||
    !password.value.match(/[0-9]/g) ||
    !password.value.match(/[A-Z]/g) ||
    !password.value.match(/[a-z]/g)
  ) {
    alert(
      "Please enter a password of at least 8 characters including at least one number, one uppercase letter, and one lowercase letter."
    );
    return;
  } else if (confirmPassword.value !== password.value) {
    alert("Passwords do not match!");
    return;
  } else {
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    alert("Your account has been created.");
  }
}

function loginUser(e) {
  e.preventDefault();
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");

  if (!username.value || !password.value) {
    alert("Please fill in both fields.");
    return;
  } else if (
    username.value != storedUsername ||
    password.value != storedPassword
  ) {
    alert("Incorrect username or password.");
    return;
  } else {
    window.location.href = "/candidate/jobs";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Function to Subscribe
function toSubscribe(params) {
  window.location.href = "subscribe.html";
}

const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};

function userName() {
  var firstName = localStorage.getItem("firstName");
  var lastName = localStorage.getItem("lastName");

  document.getElementById(
    "user_name"
  ).innerHTML = `Hello ${firstName} ${lastName}!`;
  // document.getElementById("avatar__title").innerHTML = firstName + " " + lastName;
}
