Meteor.methods({
    addIncident: function(doc) {
      if (!this.userId) {
      return throwError(403, 'Must be logged in');
      }
        console.log("Adding", doc);

        //check(incidents,Schemas.Incidents);

        Incidents.insert({doc}, function(err, doc) {
          if (err) {
            return err;
          }else {
            Bert.alert('Incident crée', 'info');
            console.log("IncidentID: ", doc);
          }

        });//callback error function
      },
    updateIncident: function(doc, docID) {
      if (!this.userId) {
      return throwError(403, 'Must be logged in');
       }
        console.log("Updating", doc);
        //check(doc, Incidents.simpleSchema());
        Incidents.update({_id: docID}, doc);
      },
      'deleteIssue': function (docID){
        //get current user
          var user = Meteor.user();
          if(!user){
            throw new Meteor.Error('please login ');
          }
          Incidents.remove(docID);

      }
  });
