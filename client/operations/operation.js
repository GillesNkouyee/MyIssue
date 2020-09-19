this.myIndxlist = new ReactiveVar([]);
this.allCvlist = new ReactiveVar([]);
Template.operationview.onCreated(function() {
  var currentUser = Meteor.userId();
  myIndxlist.set(Curriculums.find({createdBy:currentUser},{sort: {createdAt: -1}}));
  allCvlist.set(Curriculums.find({},{sort: {createdAt: -1}}));
  Blaze._allowJavascriptUrls();

});
Template.operationview.onRendered(function(){
  $('.menu .item')
  .tab()
  ;
  $('.ui.checkbox')
    .checkbox()
  ;

});
Template.operationview.helpers({
  'Indxlist': function(){
    return myIndxlist.get();
  },
  'allCvlist': function(){
    return allCvlist.get();
    //return Consommation.find();
    //return maliste.get();
  },
'hasItem':function(){
    return myIndxlist.get().count();
  },
lesCVs: function () {
        let captR =this.CVScan;
        return PiecesJointes.findOne({_id:captR});
      },
VoirlesCVs: function () {
      return PiecesJointes.find();
    }
});

Template.operationview.events({
  "keyup input": _.debounce(function(e) {
    var  nom = $("[name='nomCandidat']").val().trim(),
    // date = $("[name='dateinsertion']").val().trim(),
    prenom = $("[name ='prenomCandidat']").val().trim(),
    phone = $("[name ='phoneCandidat']").val().trim(),
    niveauform = $("[name ='niveauformation']").val().trim(),
    search = {};
    if(nom) search.nom = {$regex: new RegExp(nom),
    $options: "i"};
    if(prenom) search.prenom = {$regex: new RegExp(prenom),
    $options: "i"};
    if(phone) search.phone = {$regex: new RegExp(phone),
    $options: "i"};
    if(niveauform) search.formation = {$regex: new RegExp(niveauform),
    $options: "i"};
    // if(date) {
    //   var userDate = new Date(date);
    //   search.createdAt = {
    //   $gte: userDate,
    //   $lte: new Date(moment(userDate).add(1,"day").unix()*1000)
    //   }
    // }

    myIndxlist.set(Curriculums.find(search));
  }, 200),

    //Suppression CV
    "click .supprimCV": function( event, template ) {
      if ( confirm( "Are you sure? This is permanent." ) ) {
        Meteor.call( "deleteCV", this._id, function( error, response ) {
          if ( !error ) {
            Bert.alert( "CV deleted!", "info" );
          } else {
            Bert.alert( error.reason, "danger");
            return false;
          }
        });
      }
    },
    'click .submit': function(error,docID){
    if (confirm("Avez-vous correctement renseigné le formulaire ?")){
    Bert.alert('Nouveau CV enregistré', 'success');
    }
}

});
