'use strict';
function myFunction() {
  let hamMenu = $('#burgerMenu')[0];
  if (hamMenu.className === 'topnav') {
    hamMenu.className += ' responsive';
  } else {
    hamMenu.className = 'topnav';
  }
}


// $(document).ready(function(){
//   $('.showButton').click(function(){
//     var on = $(this.form).is(':visible');
//     $(this.form).slideToggle();
//     $(this).html(on ? 'Select This Book' : 'Hide Form');
//   });
// });

// ------------------

// this will make things display-- first hide...on click it will toggle display or hide
$(document).ready(function(){
  $('.hide').hide();
  $('.showhidden').on('click', function(){
    $(this).next().slideToggle();
  });
});



