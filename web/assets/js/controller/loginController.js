$(document).ready(function() {

  console.log("A sweetly, little canary called 林菁 sings a melody we all know.");

  $("#loginForm").on('submit', function(e) {

    e.preventDefault();

    $("#loginError").html("");

    const emailAddress = $("#emailAddress").val();
    const password = $("#password").val();

    $.post("/login", {
      user: {
        emailAddress: emailAddress,
        password: password
      }
    }, function(result) {

      const entry = result;

      if (entry.status !== 'error') {

        const user = entry.value;

        window.sessionStorage.user = user;
        window.sessionStorage.active = true;

        window.location.replace("/");

      } else {

        window.sessionStorage.user = undefined;
        window.sessionStorage.active = undefined;

        $("#loginError").html("<p>" + result.value + "</p>");

      }

    });

  });


});
