Template.register.events({
    'submit #regform': function(event,template) {
        event.preventDefault();
        var matricule = event.target.regLogin.value;
        var regname = event.target.regname.value;
        var emailVar = event.target.regEmail.value;
        var passwordVar = event.target.regPassword.value;
        var options={username:matricule,
                      email: emailVar,
                      password: passwordVar,
                      profile:{name:regname,avatar_url:'/ad4.jpg',lastname:'',gender:'',organization:'',occupation:'',birthday:'',mobile:'',website:'',
                      status:'',bio:'',}
                    };
        Meteor.call('createNewUser', options,function(err,newUserId){
          if (!err) {
            Bert.alert('New user has come');
          } else {
            Bert.alert(err.reason);
            //alert('Error creating new user'+ err.details);
          }
        }
      );


      event.target.regLogin.value="";
      event.target.regname.value="";
      event.target.regEmail.value="";
      event.target.regPassword.value="";
      Bert.alert("It's all good ");

      // Router.go('Home');
      //Meteor.logout();
    }

});
//For the “login” template, the code is almost identical:

// Template.register.events({
// 'submit #regform': function(event) {
//     event.preventDefault();
//     var username = event.target.regUsername.value;
//     var emailVar = event.target.regEmail.value;
//     var passwordVar = event.target.regPassword.value;
//     Accounts.createUser({
//         email: emailVar,
//         password: passwordVar,
//         profile:{name:username,avatar_url:'/ad4.jpg',lastname:'',gender:'',organization:'',occupation:'',birthday:'',mobile:'',website:'',
//         status:'',bio:'',}
//
//     });
//   }
// });
// Template.LoginForm.onRendered(function(){
//     $(".dropdown-button").dropdown();
// });
