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
  $('.showButton').click(function(){
    var on = $(this.form).is(':visible');
    $(this.form).slideToggle();
    $(this).html(on ? 'Select This Book' : 'Hide Form');
  });
});






