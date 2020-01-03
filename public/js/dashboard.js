$('#nav-account').on('click',function(){
    $(".send-money").hide();
    $('.loans').hide();
    $('.update-account').hide();
    $('.account').show();
})

$('#nav-send-money').on('click',function(){
    $('.account').hide();
    $('.loans').hide();
    $('.update-account').hide();
    $('.send-money').show();
})

$('#nav-loans').on("click",function(){
    $('.account').hide();
    $('.update-account').hide();
    $('.send-money').hide();
    $('.loans').show();
})

$('#nav-update-account').on('click',function(){
    $('.account').hide();
    $('.loans').hide();
    $('.send-money').hide();
    $('.update-account').show();
})

$('#send-money-button').on('click',function(){
    event.preventDefault()
    let amount = $('#send-money-input').val().trim()
    let email = $("#send-email-input").val().trim()

    $('#sendmoneyamount').text(`You are sending $${amount}`)
    $('#sendemail').text(`to the Email Address of ${email}`)
    $('.send-money-modal').css('display','block')
})

$('#cancel-money').on('click',function(){
    event.preventDefault()
    $('.send-money-modal').css('display','none')
})
