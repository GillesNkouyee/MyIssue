Meteor.methods({
    'addClient': function(doc) {
        console.log("Adding", doc);
        check(doc, Schemas.clients);

        Clients.insert(doc, function(err, _id) {console.log("ClientID:", _id);});//callback error function
    },
    'updateClientData': function(doc, docID) {
        console.log("Updating", doc);
        check(doc, Clients.SimpleSchema());
      Clients.update({_id: docID}, doc);
    },
    'deleteClient': function (docID){
      //get current user
        var user = Meteor.user();
        if(!user){
          throw new Meteor.Error('please login ');
        }
        Clients.remove(docID);

    }
  });
