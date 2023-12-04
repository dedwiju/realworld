function postUsers(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var errorEmail = document.getElementsByClassName("error-email")[0];
  var errorUsername = document.getElementsByClassName("error-username")[0];
  var errorBoth = document.getElementsByClassName("error-both")[0];

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

      if (
        response.errors.username === undefined &&
        response.errors.email[0] === "has already been taken"
      ) {
        errorUsername.style.display = "none";
        errorBoth.style.display = "none";

        errorEmail.style.display = "block";

        return;
      }
      if (
        response.errors.email === undefined &&
        response.errors.username[0] === "has already been taken"
      ) {
        errorEmail.style.display = "none";
        errorBoth.style.display = "none";

        errorUsername.style.display = "block";

        return;
      }
      if (
        response.errors.email[0] === "has already been taken" &&
        response.errors.username[0] === "has already been taken"
      ) {
        errorEmail.style.display = "none";
        errorUsername.style.display = "none";

        errorBoth.style.display = "block";
      }
    }
  };
}
