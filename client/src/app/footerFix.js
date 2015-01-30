!(function () {
  var $footer = $('.main-footer');

  var footerFixer = function () {
    if (window.innerHeight > $('body').innerHeight()) {
      $footer.addClass('fixed');
    } else {
      $footer.removeClass('fixed');
    }
  };

  footerFixer();

  $(window).on('resize', footerFixer);
})();

