//Function that changes "devoured" from false to true, then sends that to the burgers api with an ajax call
$(function() {
    $(".change-devour").on("click", function(event) {
      const id = $(this).data("id");
  
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

    //Function to create a new burger on submit.
$(".create-form").on("submit", function(event) {
    event.preventDefault();

    //Making a new burger based on the user's value, and setting devoured to false
    const newBurger = {
        name: $("#burg").val().trim(),
        devoured: 0
    };

      //Ajax call to post the new burger to the API, and reload the page
    $.post("/api/burgers", newBurger).then(
    function() {
        console.log("Added your new burger");
        location.reload();
    }
    )
    });
    //Function to delete a devoured burger.
  $(".delete-btn").on("click", function(event) {
    const buttonId = $(this).data("id");
    $.ajax("/api/burgers/" + buttonId, {
      type: "DELETE",
    }).then (
      function() {
      console.log("Deleted your burg");
      location.reload();
     
    });
  });

});