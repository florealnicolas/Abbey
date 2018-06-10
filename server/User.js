function User(emailAddress, password, registrationDate) {
  "use strict";

  this.emailAddress = emailAddress;
  this.password = password;
  this.registrationDate = registrationDate;

  this.lastLogoutDate = undefined;

  this.game = undefined;

  //Getters of User

  this.getPassword = function() {
    return this.password;
  };

  this.getEmailAddress = function() {
    return this.emailAddress;
  };

  this.getRegistrationDate = function() {
    return this.registrationDate;
  };

  this.getLastLogoutDate = function() {
    return this.lastLoginDate;
  };

  this.getGame = function() {
    return this.game;
  };

  //Setters of User


  //Functions of User

  this.toJSON = function() {

    return {
      _id: this.getEmailAddress(),
      password: this.getPassword(),
      emailAddress: this.getEmailAddress(),
      registrationDate: this.getRegistrationDate(),
      lastLogoutDate: this.getLastLogoutDate(),
      game: this.getGame()
    };

  }

}

module.exports = User;
