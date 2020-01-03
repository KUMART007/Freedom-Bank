// import {
//   json
// } from "sequelize/types";

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax({
    type: "GET",
    url: "/api/user/me",
  }).then((res) => {

    var data = JSON.stringify(res, null, 2);
    console.log(`User name is ${ data}`);
    $(".member-name").text(res[0].username);
    $(`#current-balance`).text(res[0].useraccount.current_balance);
    $(`.date`).text(moment(res[0].useraccount.createdAt).add(1, 'days').format('L'));
    var userId = res[0].id;
    var current_balance = parseInt(res[0].useraccount.current_balance);
    $("#transfer_btn").click(function (e) {
      e.preventDefault();
      var transferComment = `Transferred to ${$("#transfer_to").val()}`;
      var transferingAmount = $("#transferring_amount").val();
      var activityType = "debit";
      var updatedBalance = current_balance - transferingAmount;
      var sendingData = {
        transaction_type: activityType,
        comment: transferComment,
        amount: transferingAmount,
        updated_balance: updatedBalance
      }
      $.ajax({
        type: "POST",
        url: "api/transfer/" + userId,
        data: sendingData
      }).then((result) => {
        $("#transfer").modal("toggle");
      })
    });
  });

  // $.ajax({
  //   type: "GET",
  //   url: "/api/account",
  // }).then((res) => {
  //   var data = JSON.stringify(res, null, 2);
  //   console.log(`Balance is ${ data }`);
  //   $(`#current-balance`).text(res[0].current_balance);
  //   console.log(`Date is ${moment(res[0].createdAt).format('L')}`);
  //   $(`.date`).text(moment(res[0].createdAt).add(1, 'days').format('L'));
  // });

  // $(`.date`).text(moment().format('L'));

  // Transfer from account

});