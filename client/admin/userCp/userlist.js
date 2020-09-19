Template.userlist.onCreated( () => {
  Template.instance().subscribe( 'users' );
});

Template.userlist.helpers({
  'userlistitem': function() {
    return Meteor.users.find().fetch();
  },
  'RhmemberWorkcount' :function(){
    var cvCreator = Meteor.userId();
    return  Curriculums.find({createdBy:this._id}).count();
  },
  'usercount':function(){
       var usercount = Meteor.users.find().count();
        if(usercount){
       return usercount;
     }
   },
  'distinctUser':function(){
    var userId = Meteor.userId();
    return Meteor.users.findOne(Meteor.userId()).profile;
  }

 });

Template.userlist.events({
  'click .eraseusr': function( err, result ) {
    var loggedUser =Meteor.userId();
    if ( confirm( "Are you sure? This is permanent." ) ) {
      if (loggedUser !== this._id) {
        Meteor.users.remove({_id:this._id},function( error, response ) {
          if ( !error ) {
            Bert.alert( "User deleted!", "info" );
          } else {
            Bert.alert( error.reason, "danger");
            console.log("Error removing user: ", error);
            return false;
          }
        });
      } else {
        Bert.alert( 'Come on man,you are the logged user you can not kill yourself', "danger");
        console.log("Error removing user: ", err);
        return false;
      }

    }
    console.log("that's the removed userID"+ this._id);
  }
  // 'click .eraseusr': function () {
  //   if ( confirm( "Are you sure? This is permanent." ) ) {
  //     Meteor.users.remove({ _id: this._id }, function (error, result) {
  //       if (error) {
  //         console.log("Error removing user: ", error);
  //         Bert.alert( error.reason, "info");
  //         return false;
  //       } else {
  //         Bert.alert( "User deleted!", "success" );
  //         console.log("Number of users removed: " + result);
  //       }
  //     })
  //   }
  // }
});
