$(document).ready(function () {

    $("#loginError").html("");

    const error = eval(window.sessionStorage.error);

    if (error !== undefined) {

        console.error("ERROR", error);

        $("#loginError").html("<p>" + error + "</p>");
        window.sessionStorage.error = undefined;
    }

    $("#login").on('click', function () {

        const username = $("#username").val();
        const password = $("#password").val();

        $.post("/login", {user: {username: username, password: password}}, function (result) {

            const entry = JSON.parse(result);
            console.log("RESULT", entry);

            if (entry.status !== 'error') {

                const user = entry.value;

                console.log("USER",user);

                if (user.password === password) {
                    //const state = new State().setActiveUser(user);
                    window.sessionStorage.user = JSON.stringify(user);
                    window.sessionStorage.active = true;
                    window.sessionStorage.error = undefined;

                    console.log("PASSWORD MATCH!");

                    window.location.replace("/");
                }

                else {
                    console.error("NO PASSWORD MATCH: real password '",user.password,"' , Actual password '",password,"'");

                    window.sessionStorage.user = undefined;
                    window.sessionStorage.active = undefined;
                    window.sessionStorage.error = JSON.stringify("Incorrect password for username '"+user.userName+"'.");

                    console.log("ERROR",window.sessionStorage.session);

                    window.location.replace("/login");
                }
            }
            else {
                console.log("RESULT", entry);

                window.sessionStorage.user = undefined;
                window.sessionStorage.active = undefined;
                window.sessionStorage.error = JSON.stringify(entry.value);

                window.location.replace("/login");
            }

        });
    });

});