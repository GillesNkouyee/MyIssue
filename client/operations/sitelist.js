Template.sitelist.onCreated(function() {
  Session.set('consoSubmitErrors', {});
});
Template.sitelist.helpers({
  affichersite:function(){
    var listedesite = Sites.find({});
    if(listedesite){
      return listedesite;
    }
  },
  index: function () {
        return Session.get('lastIndex');
    },

  errorMessage: function(field) {
    return Session.get('consoSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('consoSubmitErrors')[field] ? 'has-error' : '';
  }
  // unAuthorized: function(){
  //   let indextest = Session.get('lastIndex');
  //   let indexAdd = Session.get('indexAdded');
  //
  //   if (indexAdd <10) {
  //      return 'disabled'
  //     console.log('echo');
  //   } else {
  //      return ''
  //     console.log('test micro');
  //   }
  // }
});

Template.sitelist.events({

  'change #site':function(doc){
    var unsite = $('#site option:selected').text();
    var Recup = Sites.findOne({'sitename' : unsite});
    Session.set('lastIndex', Recup.index);

    var monIndex = Session.get('lastIndex');

    console.log(monIndex);
  },
    'submit #consForm': function(event,template){
      event.preventDefault();
      var newIndex = 0;
      var previndex = 0;
      var unsite = $('#site option:selected').text();
      var form = event.target;
      var le_responsable = Meteor.user();
      var unsite = $('#site option:selected').text();
      var Recup = Sites.findOne({'sitename' : unsite});
      Session.set('centrale',unsite);
      Session.set('monIndex', Recup.index);
      Session.set('indexAdded',form.conso.value);

      //var pdcType = Session.get('pdcType');
      var previndex =  Session.get('monIndex');
      var indexadded = Session.get('indexAdded');
      var lastIndex = previndex + indexadded;
      console.log(lastIndex);
            Sites.update({_id:Recup._id},{$inc:{'index':indexadded}});
             Session.set('monIndex',newIndex);
             toastr.info("Le nouvel index de la consommation électrique du site" +" "+ unsite +" " + "a été relevé par " + ' ' + le_responsable.profile.name);
            }

});
