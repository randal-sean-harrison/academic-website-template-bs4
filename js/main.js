$(document).ready(function() {

  // Write the page footer
  $("#page-footer").load("footer.html", function() {

    $(document).tooltip({
      selector: '[data-toggle="tooltip"]'
    });

    console.log("Footer loaded.");
    // Add the current year to copyright
    const thisYear = new Date().getFullYear();
    $("#footer-year").text(thisYear);

  });

  // Scroll to top button ---------------------------------------------

  // write the button to the page
  window.onscroll = function() {

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("back-to-top").style.display = "block";
    } else {
      document.getElementById("back-to-top").style.display = "none";
    }
  };


  // Scroll to top
  $('#back-to-top').on("click", function(event) {

    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 300, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

  // Initally hide the read more div
  $("#read-more").css("display", "none");

  // Show more on click
  $("#badge-more").on("click", function() {

    // Show/hide the div
    $("#read-more").slideToggle();

    // Change the button
    if ($("#badge-more").text() == "More") {
      $("#badge-more").empty().append("Less");
    } else {
      $("#badge-more").empty().append("More");
    }

  });

  // open all accordion panels for possible printing or close -----------
  $(".expander").on("click", function() {

    if ($(".expander").text() === "show all") {

      // Change the button text
      $(".expander").text("hide all");
      // show all accordions
      $("#wrapper .collapse").collapse('show');
      $("#teaching-section .btn").prev().find("i").addClass("fa-rotate-45");

    } else {
      // Change the button text
      $(".expander").text("show all");
      // hide all accordions
      $("#wrapper .collapse").collapse('hide');
      $("#teaching-section .btn").prev().find("i").removeClass("fa-rotate-45");
    }
  });


});
// document ready
