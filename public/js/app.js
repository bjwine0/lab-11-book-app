'use strict';
function myFunction() {
  let hamMenu = $('#burgerMenu')[0];
  if (hamMenu.className === 'topnav') {
    hamMenu.className += ' responsive';
  } else {
    hamMenu.className = 'topnav';
  }
}



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


