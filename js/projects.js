$(document).ready(function() {

  function writeProjects (fileName) {

    $.getJSON(fileName, function(data) {

      // Sort the json resources object
      function sortJson(a, b) {
        return a.name > b.name ? 1 : -1;
      }

      data.projects.sort(sortJson);

      var template = $("#all-the-projects").html();
      var html = Mustache.to_html(template, data);
      $("#projects-div").html(html);

      // Show the counts in the buttons
      var allCount = $("#projects-div").find(".card").length;
      $("#all").append("&nbsp; ( " + allCount + " )");;


      var type1Count = $("#projects-div").find(".type1").length;
      var type2Count = $("#projects-div").find(".type2").length;
      var type3Count = $("#projects-div").find(".type3").length;
      var type4Count = $("#projects-div").find(".type4").length;


      $("#type1").append("&nbsp; ( " + type1Count + " )");
      $("#type2").append("&nbsp; ( " + type2Count + " )");
      $("#type3").append("&nbsp; ( " + type3Count + " )");
      $("#type4").append("&nbsp; ( " + type4Count + " )");

    });

  }

  writeProjects ("json/projects.json");


  // Clear the search
  $("#search-refresh-button").on("click", function() {
    // Show all the cards
    $(".card-container").removeClass("d-none");
    $(".card-container").css("display", "block");
    $("#search-input").val("");

    // Reset the filter buttons
    $("#filter-buttons .btn").removeClass("active");
    $("#filter-buttons .btn").find(".all").addClass("active");

  });


  // Filter buttons selection ----------------------------------------------
   $("#filter-buttons button").on("click", function(event) {

      $("#search-input").val("");

        // Then hide everyting to start
      $(".card-container").addClass("d-none");

      // Add color to the selected button
      $("#filter-buttons button").removeClass("active");
      $(this).addClass("active");

      // Get the id text of the button clicked
      var buttonClicked = event.target.id;

      // Turn the id text into a class name
      var show = "." + buttonClicked;
      console.log(show);

      if (buttonClicked === "all") {

         $(".card-container").removeClass("d-none");

      } else {

         // show all the panels with this class name
         $(show).parent().removeClass("d-none").css("display", "block");

      }

   });

   // Show all panels on focus into the input field
   $("#search-input").on("focus", function() {

      // Clear all other the buttons
      $("#filter-buttons .btn").removeClass("active");
      $("#filter-buttons .btn").find(".all").addClass("active");

      // Show all panels
      $(".card-container").removeClass("d-none");
   });

   // Search field filter
   $("#search-input").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#projects-div .card-container").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
   });

});
