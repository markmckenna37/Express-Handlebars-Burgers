$(function() {
    $(".change-devour").on("click", function(event) {
      const id = $(this).data("id");
      const newDevour = $(this).data("devoured");
  
      const newDevourState = {
        devoured: 1
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devour to", newDevourState);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

$(".create-form").on("submit", function(event) {
    event.preventDefault();

    const newBurger = {
        name: $("#burg").val().trim(),
        devoured: $("[name=devoured]:checked").val().trim()
    };

    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
    function() {
        console.log("Added your new burger");
        location.reload();
    }
    )
    });

});