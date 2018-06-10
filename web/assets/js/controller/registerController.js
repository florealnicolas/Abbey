$(document).ready(function() {

  $("#registerForm").on("submit", function(e) {

    e.preventDefault();

    const emailAddress = $("#emailAddress").val();
    const password = $("#password").val();

    $.post("/register", {
      emailAddress: emailAddress,
      password: password
    }, function(result) {

      if (result) {
        window.location.replace("/login");
      }
    });

  });

});
