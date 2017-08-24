(function () {

    $("#login").on('click', function () {

        const username =$("#username").val();
        const password =$("#password").val();
        /*
         * Perform some validation here.
         */
        $.post("/login",{user:{username:username,password:password}},function(user){
            if(user !== undefined)
            {
                const state = new State().setActiveUser(user);
                window.sessionStorage.user = user;
                window.sessionStorage.active = true;
                window.location.assign("/");
            }
        });
    });

})();