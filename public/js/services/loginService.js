angular
  .module("LoginService", ["ngMaterial"])
  .service("Login", function ($http, $q) {
    this.loginSuccess = false;
    this.login = function(user,pass){
        if(user==="dummy" && pass==="she@12345"){
            this.loginSuccess = true;
        }
    }
    this.setLoginSuccess = function(value){
        this.loginSuccess = value;
    }
  })