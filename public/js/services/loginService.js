angular
  .module("LoginService", ["ngMaterial"])
  .service("Login", function ($http, $q) {
    this.loginSuccess = false;
    this.login = function(user,pass){
        if(user==="dummy" && pass==="dummy"){
            this.loginSuccess = true;
        }
    }
  })