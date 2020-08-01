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