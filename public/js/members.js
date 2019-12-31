// import {
//   json
// } from "sequelize/types";

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax({
    type: "GET",
    url: "/api/user_data/",
  }).then((res) => {

    var data = JSON.stringify(res, null, 2);
    console.log(`User name is ${ data}`);
    $(".member-name").text(res[0].username);
  });
});