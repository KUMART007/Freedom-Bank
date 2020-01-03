//pressing the login/signup will toggle the modal for user
$("#login").on("click", function() {
  event.preventDefault();
  $(".login-modal").css("display", "block");
});
$("#signup").on("click", function() {
  event.preventDefault();
  $(".signup-modal").css("display", "block");
});
//pressing on the document or the X will allow the user to close the modal
$("span").on("click", function() {
  event.preventDefault();
  $(".signup-modal").css("display", "none");
  $(".login-modal").css("display", "none");
  $(".send-money-modal").css("display", "none");
});

// ---------------CONTAINER2 CONTENT--------------//
$('.display-li').on('click',function(){
  $('#credit-card').addClass("box2")
  $("#credit-card").removeClass('box1')
  $('#manage-money').removeClass('box1')
  $('#buy-home').removeClass('box1')
  $('#buy-car').removeClass('box1')
  $('#buy-equity').removeClass('box1')
})

$("#credit-card").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").show();
  $('#manage-money-box').hide();
  $('#buy-home-box').hide();
  $('#buy-car-box').hide();
  $('#buy-equity-box').hide();

  $('#credit-card').addClass('box1')
});
$("#manage-money").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide();
  $('#manage-money-box').show();
  $('#buy-home-box').hide();
  $('#buy-car-box').hide();
  $('#buy-equity-box').hide();

  $('#manage-money').addClass('box1')
});

//buttons on the modal
// $( ".login-button" ).unbind( "click" );
// $('.login-button').on('click',function(){
//   event.preventDefault()

//   let email = $('#username').val().trim()
//   let password = $('#pw').val().trim()
//   console.log(`Loging in as\nLogin:${email}\nPassword:${password}`)
//   // loginUser(email,password)
// })

// $('.signup-button').on('click',function(){
//   event.preventDefault()
//   $('.pw-error').empty()

//   let newUsername = $('#username').val().trim()
//   let newPassword = $('#pw').val().trim()
//   // checkSignUp(newUsername,newPassword)
// })

//function to make sure the user creates a password within the requirements
// function checkSignUp(username,pw){
//   let checkUpperCase = false;
//   let checkLowerCase = false;
//   let checkLength = false;

//   for(let i = 0; i < pw.length; i++){
//     if(pw.charAt(i) === pw.charAt(i).toUpperCase()){
//       checkUpperCase = true
//     }
//     if(pw.charAt(i) === pw.charAt(i).toLowerCase()){
//       checkLowerCase = true
//     }
//   }

//   if(pw.length >= 8){
//     checkLength = true
//   }

//   if(checkUpperCase === false){
//     $('.pw-error').append(`<p>You must include a uppercase letter!</p>`)
//   }
//   if(checkLowerCase === false){
//     $('.pw-error').append(`<p>You must include a lowercase letter!</p>`)
//   }
//   if(checkLength === false){
//     $('.pw-error').append(`<p>Your password must be 8 or more characters!</p>`)
//   }
//   if(checkUpperCase === true && checkLowerCase === true && checkLength === true){
//     console.log('password requirements passed')
//     console.log(`creating new user \nUsername: ${username}\nPassword: ${pw}`)
//   }
// }
//   function loginUser(userName, password) {
//   $.post("/login", {
//     username: userName,
//     password: password
//   }).then(function(data) {
//     // If there's an error, log the error
//   }).catch(function(err) {
//     alert('something failed')
//     console.log(`The error is ${err}`);
//   });
// }
