$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    console.log(`username is ${usernameInput.val().trim()}`);
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    if (userExistance(userData.email) === true) {
      alert(`This email is already registered`)
    } else {
      signUpUser(userData.username, userData.email, userData.password);
      usernameInput.val("");
      emailInput.val("");
      passwordInput.val("");
    }
  });

  // Check if user exists
  function userExistance(email) {
    $.ajax({
      type: "GET",
      url: "api/usercheck/" + email,
      data: "data",
      dataType: "dataType",
      success: function (response) {

      }
    }).then((res) => {
      return true
    });
  }

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password) {
    $.post("/api/signup", {
      username: username,
      email: email,
      password: password
    }).then(function (data) {
      window.location.replace(data.location);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});