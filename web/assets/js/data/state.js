const State = function () {

    let instance = undefined;
    let activeUser = undefined;

    // Getters of State

    this.getActiveUser = function() {
        return activeUser;
    };

    this.getInstance = function () {
        if (instance === undefined) {
            instance = new State();
        }

        return instance;
    };

    this.setActiveUser = function (newUser) {
        activeUser = newUser;
    }
};