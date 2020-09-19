Template.editsite.onRendered(function(){
//  $('.menu .item').tab();

});
Template.editsite.helpers({
  'showAllagent': function(){
    return Agents.find({});
  },
  'clientList':function(){
    return Clients.find().fetch();
  },
  'projetList':function(){
    return Projets.find().fetch();
  }
});
Template.editsite.events({
  'submit #inAgentform': function(error,id){
  event.preventDefault(event);
  var Owner = Meteor.user();
      if(!error){

      toastr.success("Nouvel Agent ajouté par " + ' ' + Owner.profile.name);
      console.log('id');

    }
  },
  //suppression de client
  "click .suppClient": function( event, template ) {
    var Leclient=this._id;
    var issueOwner= this.acronyme;
    var  issueExist = Incidents.find({client:issueOwner}).count();
    var projetExist = Projets.find({client:Leclient}).count();
    console.log(issueExist,projetExist,Leclient);
    if (projetExist > 0) {
      Bert.alert( "Vous avez respectivement"+"  "+""+issueExist+""+"          "+"incident(s)  et"+""+""+projetExist +""+"projet(s) liés à ce Client:impossible de le supprimer !","danger");

      return false;
    }
    else {
      Meteor.call( "deleteClient", this._id, function( error, response ) {
        if ( !error ) {
          Bert.alert( "Client deleted!", "danger" );
        } else {
          Bert.alert( error.reason, "warning");
          return false;
        }
      });
    }
  },
    //suppression de client
    "click .suppProjet": function( event, template ) {
      var Leclient=this._id;
      var issueOwner= this.acronyme;
      var issueExist = Incidents.find({projetImpacte:issueOwner}).count();

      console.log(issueExist,Leclient);
      if (issueExist > 0) {
        Bert.alert( "Vous avez"+"  "+""+issueExist+""+"          "+"incident(s)  lié(s)  à ce Client:   impossible de le supprimer !","danger");

        return false;
      }
      else {
        Meteor.call( "deleteProjet", this._id, function( error, response ) {
          if ( !error ) {
            Bert.alert( "Project deleted!", "danger" );
          } else {
            Bert.alert( error.reason, "warning");
            return false;
          }
        });
      }
    //clientExist != 0 ||
    // if (!exist) {
      //  if ( confirm( "Are you sure? This is permanent." ) ) {
        // Meteor.call( "deleteClient", this._id, function( error, response ) {
        //   if ( !error ) {
        //     Bert.alert( "Client deleted!", "danger" );
        //   } else {
        //     Bert.alert( error.reason, "warning");
        //     return false;
        //   }
        // });
      // }
    // } else {
    //     console.log(exist);
    //     Bert.alert( "Il existe apparemment des incidents lies à ce Client, la suppression est impossible", "warning");
    //    return false;
    //}


  },
});
Template.mdfydata.events({
  'click .hijo': function(e,doc) {
    e.preventDefault();
    agentId = this._id;
    //Meteor.call('updateAgentData')
    //$('.ui.modal').modal();
    console.log(agentId);
  }
});
