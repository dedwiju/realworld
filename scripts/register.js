function postUsers(event) {
  var username = document.getElementById("username").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  if (email && !email.includes("@")) {
    return;
  }

  var errorMessages = document.getElementsByClassName("error-messages");

  var errorEmail = document.getElementsByClassName("error-email")[0];
  var errorUsername = document.getElementsByClassName("error-username")[0];
  var errorBoth = document.getElementsByClassName("error-both")[0];

  var emailBlank = document.getElementsByClassName("email-blank")[0];
  var usernameBlank = document.getElementsByClassName("username-blank")[0];
  var passwordBlank = document.getElementsByClassName("password-blank")[0];

  var body = {
    user: {
      username,
      email,
      password,
    },
  };

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://api.realworld.io/api/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 201) {
      location.href = "/";
    }

    if (xhr.readyState === 4 && xhr.status === 422) {
      var response = JSON.parse(xhr.response);

      for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].style.display = "none";
      }

      if (
        response.errors.username === undefined &&
        response.errors.email &&
        response.errors.email[0] === "has already been taken"
      ) {
        errorEmail.style.display = "block";

        return;
      }
      if (
        response.errors.email === undefined &&
        response.errors.username &&
        response.errors.username[0] === "has already been taken"
      ) {
        errorUsername.style.display = "block";

        return;
      }
      if (
        response.errors.email &&
        response.errors.username &&
        response.errors.email[0] === "has already been taken" &&
        response.errors.username[0] === "has already been taken"
      ) {
        errorBoth.style.display = "block";

        return;
      }

      if (
        response.errors.email &&
        response.errors.email[0] === "can't be blank"
      ) {
        emailBlank.style.display = "block";

        return;
      }
      if (
        response.errors.username &&
        response.errors.username[0] === "can't be blank"
      ) {
        usernameBlank.style.display = "block";

        return;
      }
      if (
        response.errors.password &&
        response.errors.password[0] === "can't be blank"
      ) {
        passwordBlank.style.display = "block";
      }
    }
  };
}
