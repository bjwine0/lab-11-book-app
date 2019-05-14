'use strict';
function myFunction() {
  let hamMenu = $('#burgerMenu')[0];
  if (hamMenu.className === 'topnav') {
    hamMenu.className += ' responsive';
  } else {
    hamMenu.className = 'topnav';
  }
}


// $('div button').on('click', function () {
//   let $switch = $(this).data('tab');
//   console.log('switch to ', $switch);
//   $('.tab-content').hide();
//   $('#' + $switch).fadeIn(750)
// })