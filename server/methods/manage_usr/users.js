Meteor.methods({
  setRoleOnUser( options ) {
    check( options, {
      user: String,
      role: String
    });

    try {
      Roles.setUserRoles( options.user, [ options.role ] );
    } catch( exception ) {
      return exception;
    }
  },
});
Meteor.users.allow({
  remove: function (userId, doc) {
    var currentUser, userRole, userPassword;
    currentUser = Meteor.users.findOne({ _id: userId }, { fields: { 'roles': 1,'password':1 } });
    userRole =  currentUser.roles;
    userPassword = currentUser.password;
    if (userRole == "admin" && userId !== doc._id) {
      console.log("Access granted. You are an administrator and you are not trying to delete your own document.");
      return true;
    } else {
      console.log("Access denied. You are not an administrator or you are trying to delete your own document.");
      console.log(currentUser,userRole);
      return false;
    }
  }
  ,
  fetch: []
});
//Creatio d'un utilisateur
Meteor.methods({
  createNewUser:function(options){
    if (!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error('Not Enough rights','only admins can create new users!')
    }
    var newUserId = Accounts.createUser(options);
    //Accounts.sendEnrollmentEmail(newUserId);
    Roles.addUsersToRoles(newUserId,'basic');
    return newUserId;
  }
})
