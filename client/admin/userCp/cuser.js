Template.users.onCreated( () => {
  Template.instance().subscribe( 'users' );
});

Template.users.helpers({
  users: function() {
    var users = Meteor.users.find();
    if ( users ) {
      return users;
    }
  },
  afficherzone:function(){
    var lesregions = Regions.find({});
    if(lesregions){
      return lesregions;
    }
  }

//   ,
//   usercount:function(){
//       var usercount = Meteor.users.find().count();
//        if(usercount){
//       return usercount;
//     }
//   }
});


Template.users.events({
  'change [name="userRole"]': function( err, template ) {
    let role = $( event.target ).find( 'option:selected' ).val();
    var loggedUser =Meteor.userId();
    if (loggedUser !== this._id) {

        Meteor.call( "setRoleOnUser", {
        user: this._id,
        role: role
        }, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "warning" );
          }else{
            Bert.alert( 'Cet utilisateur est désormais:'+role,"info" );
          }
      });
    } else {
      Bert.alert( 'Are you serious man , you can not change your role while logged in!',err.reason, "warning");
      console.log("Error removing user: ", err);
      return false;
    }

  },
  'click .revoke-invite': function( event, template ) {
    if ( confirm( "Are you sure? This is permanent." ) ) {
      Meteor.call( "revokeInvitation", this._id, function( error, response ) {
        if ( error ) {
          Bert.alert( error.reason, "warning" );
        } else {
          Bert.alert( "Invitation revoked!", "success" );
        }
      });
    }
  }


});
