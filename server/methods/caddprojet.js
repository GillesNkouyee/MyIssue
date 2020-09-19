Meteor.methods({
    addProjet: function(doc) {
        console.log("Adding", doc);
        check(doc, Schemas.projets);

        Projets.insert(doc, function(err, docID) {console.log("ProjetID: ", docID);});//callback error function
      },
      deleteProjet: function (docID){
        //get current user
          var user = Meteor.user();
          if(!user){
            throw new Meteor.Error('please login ');
          }
          Projets.remove(docID);

      },
    updateProjet: function(doc, docID) {
        console.log("Updating", doc);
        check(doc, Projets.SimpleSchema());
      Projets.update({_id: docID}, doc);
    }
  });
