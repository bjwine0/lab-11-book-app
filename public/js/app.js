'use strict';
function myFunction() {
  let hamMenu = $('#burgerMenu')[0];
  if (hamMenu.className === 'topnav') {
    hamMenu.className += ' responsive';
  } else {
    hamMenu.className = 'topnav';
  }
}


<<<<<<< HEAD

=======
>>>>>>> 340676cacc8c6a10f60cb085eca7dcf8d2e0e015
$(document).ready(function(){
  // $('.form').hide();
  $('.showButton').click(function(){
    // var target = event.target.name;
    // console.log(event.target.name);

    var on = $('.form').is(':visible');
    $('.form').slideToggle();
    // }
    $(this).html(on ? 'Select This Book' : 'Hide Form');
  });
});

<<<<<<< HEAD


=======
>>>>>>> 340676cacc8c6a10f60cb085eca7dcf8d2e0e015
