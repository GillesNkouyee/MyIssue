Meteor.publish("dashboardview", function (argument) {
  argument = argument || {};
  return Incidents.find(argument);
  });
  /***************dashboardview template with pagination***************/
// Meteor.startup(function(){
//     Meteor.publish('dashboardview', function(skipCount) {
//       return Incidents.find({},{limit:20,skip:skipCount});
//       });
// });
Meteor.publish('clientList', function() {
  var clientlist = Clients.find();
  return clientlist });
Meteor.publish('agentList', function() {
  var agentlist = Agents.find();
  return agentlist });
Meteor.publish('projetList', function() {
  var projetlist = Projets.find();
  return projetlist });


Meteor.publish("images", function (argument) {
argument = argument || {};
return Images.find(argument);
});
Meteor.publish("mypictures", function (argument) {
argument = argument || {};
return Mypictures.find(argument);
});
Meteor.publish("piecejointes", function (argument) {
argument = argument || {};
return PiecesJointes.find(argument);
});
///////////////////////////////////
Meteor.publish( 'users', function() {
  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return [
      Meteor.users.find( {})

    ];
  } else {
    return null;
  }
});
Meteor.publish( 'workrecap', function() {
  let isAdmin = Roles.userIsInRole( this.userId, 'admin','manager' );

  if ( isAdmin ) {
    return [
      Meteor.users.find( {})

    ];
  } else {
    return null;
  }
});
// Meteor.publish('fsrList', function() {
//                 var fsrlist = Fournisseurs.find();
//                 return fsrlist });
//, { fields: { "emails.address": 1, "roles": 1 } }
Meteor.publish('userData', function () { return Meteor.users.find({}, {fields: {profile: 1}}); });

if (Meteor.isServer) {

    // ... code removed for clarity ...

    Meteor.publish('centrales', function(box) {
        var find = {
            location: {
                $geoWithin: {
                    $box: box
                }
            }
        };

        return Sites.find(find);
    });
}
