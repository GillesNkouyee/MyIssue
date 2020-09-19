Template.login.events({
  'submit #loginForm': function(event) {
        event.preventDefault();
        var username = event.target.login.value;
        //var emailVar = event.target.loginemail.value;
        var passwordVar = event.target.password.value;
        console.log("Form submitted.");

        Meteor.loginWithPassword(username, passwordVar, function(err,result){
         if(!err){  //use this if there is not error redirect them.
           Bert.alert('User correctly logged in','success');
           //this.next();
           Router.go('dashboardview')
           }else{
             Bert.alert(err.reason ,"warning");
            //should print the error
            return false;
          }
        });

    },
    'submit #regform': function(event) {
        event.preventDefault();
        var reglogin = event.target.regLogin.value;
        var regname = event.target.regname.value;
        var emailVar = event.target.regEmail.value;
        var passwordVar = event.target.regPassword.value;
        Accounts.createUser({
            username:regLogin,
            email: emailVar,
            password: passwordVar,
            profile:{name:regname,avatar_url:'/ad4.jpg',lastname:'',gender:'',organization:'',occupation:'',birthday:'',mobile:'',website:'',
            status:'',bio:'',}

        });
    }
});
// Template.login.onRendered(function(){
//
//
// });
