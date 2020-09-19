Meteor.methods({
  'updateUser': function(name,lastname,gender,organization,occupation,birthday,mobile,website,status,bio) {
    //var doc = {name:name,lastname:lastname,mobile:mobile,occupation:occupation,status:status,birthday:birthday,organization:organization,bio:bio,gender:gender}
    Meteor.users.update({_id:Meteor.userId()}, {$set: {profile:{name:name,lastname:lastname,gender:gender,organization:organization,
      occupation:occupation,birthday:birthday,mobile:mobile,website:website,status:status,bio:bio}}});
  }
  // 'deleteUser': function (){
  //     //get current user
  //       var user = Meteor.user();
  //       if(!user){
  //         throw new Meteor.Error('please login ');
  //       }
  //       Meteor.users.remove({_id:this._id});
  //
  //   }
});
