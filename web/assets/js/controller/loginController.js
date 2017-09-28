$(document).ready(function () {

    $("#loginError").html("");

    const error = eval(window.sessionStorage.error);

    if (error !== undefined) {

        console.error("ERROR", error);

        $("#loginError").html("<p>" + error + "</p>");
        window.sessionStorage.error = undefined;
    }

    $("#loginForm").on('submit', function () {

        const username = $("#username").val();
        const password = $("#password").val();

        if (username !== '') {
            $.post("/login", {user: {username: username, password: password}}, function (result) {

                const entry = JSON.parse(result);
                console.log("RESULT", entry);

                if (entry.status !== 'error') {

                    const user = entry.value;

                    console.log("USER", user);

                    window.sessionStorage.user = JSON.stringify(user);
                    window.sessionStorage.active = true;
                    window.sessionStorage.error = undefined;

                    console.log("PASSWORD MATCH!");

                    window.location.replace("/");

                }
                else {
                    console.log("RESULT", entry);

                    window.sessionStorage.user = undefined;
                    window.sessionStorage.active = undefined;
                    window.sessionStorage.error = JSON.stringify(entry.value);

                    window.location.replace("/login");
                }

            });
        }

        window.location.replace("/login");
    });


});