Meteor.methods({
    createSite: function(doc) {
      if (!this.userId) {
      return throwError(403, 'Must be logged in');
      }
        console.log("Adding", doc);
        check(doc, Schemas.sites);

        Sites.insert(doc, function(err, docID) {console.log("SiteID: ", docID);});//callback error function
    },
    updateSiteData: function(doc, docID) {
      if (!this.userId) {
      return throwError(403, 'Must be logged in');
      }
        console.log("Updating", doc);
        check(doc, Schemas.sites);
        Sites.update({_id: docID}, doc);
    }
  });
