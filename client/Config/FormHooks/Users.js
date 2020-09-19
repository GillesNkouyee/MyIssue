// AutoForm.hooks({
//     'insertUser': {
//         onSubmit: function(doc){ //Gestion du formulaire  d'inscription
//           console.log(doc);
//           var error = null;
//           var password = doc.password;
//           var email = doc.emails[0].address;
//           Accounts.createUser({
//             username:doc.username,
//             email: email,
//             password: password,
//             profile:doc.profile ? doc.profile:{avatar_url:'images/ad4.jpg',}
//           }, function(err){
//               if(err){
//                   error = new Error("Something bad has happend");
//               }
//           });
//           if (error === null){
//               this.done(); //Appelle onSuccess
//           }
//           else{
//               this.done(error); //Appelle onError
//           }
//           return false; //\dans tout les cas , stop data submitting
//         },
//         onSuccess: function(){
//             Router.go('Home');
//         },
//         onError:function(formType, err){
//           toastr.error(err.reason)
//         }
//
//     }
// });
