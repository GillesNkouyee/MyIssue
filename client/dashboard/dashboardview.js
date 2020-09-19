this.maliste = new ReactiveVar([]);
this.ocmBuglist = new ReactiveVar([]);
Template.dashboardview.onCreated(function() {
  Session.set("renderLimit",9);
  Session.set("nbreIncidents",0);
  maliste.set(Incidents.find({},{sort: {createdAt: -1}}));
  // likecounter starts at 0
  this.counter = new ReactiveVar(0);

  Blaze._allowJavascriptUrls();

});



Template.dashboardview.helpers({
  profilepic: function() {
          return Meteor.users.findOne(Meteor.userId()).profile.avatar_url
          },
      name: function() {
      return Meteor.users.findOne(Meteor.userId()).profile.name
    },

  'listIncidents': function(){

    //return  Curriculums.find();
    var res=maliste.get();
    return res;

    // _.each(res, function (res) {
    //   for(var i = 1; i < res.count(); i++){
    //     return i;
    // }console.log(i);
    },
  'hasItem':function(){
    var hasItem = maliste.get().count();
    return hasItem;

    /* console.log(nbreIncidents); */
   },

   bugClient: function() {
       return _.uniq(Incidents.find({},{sort: {
         client: 1},fields:{client:true}
       }).fetch(), true, doc => {
         return doc.client;
       });
     },
     badgeColor:function(){
       var cltacro = this.statut;
           if (cltacro == "ouvert") {
               return " badge-danger";;
             } else {
               return " badge-success "
             }

          },
      panColor:function(){
            var cltacro = this.client;
                if (cltacro == "OCM") {

               return " badge-warning";

                  } else {
                    return " badge-danger "
                  }

               },
      logoType:function(){
                     var cltacro = this.client;
                         if (cltacro == "OCM") {

                        return " Orange-logo";

                           } else {
                             return " sfrlogo "
                           }

              },
   rangetime: function(){
    var start = this.startTime;
    var end   = this.endTime;
    var diff  = new Date(end - start);
    var days  = diff/1000/60/60;

    if (days > 0) {
      return days;
      } else {
        return 'Incident en cours ';
      }
    },
    //template dynamic handling
    curTemplate: function () {
    var curTempl = Session.get('curTemplate');
    if (!curTempl) {
    curTempl = 'Loading';
    Session.set('curTemplate', curTempl);
    }
    return curTempl;
    }

});


Template.dashboardview.onRendered(function(id){
  //$('.datetimepicker').datetimepicker();
  // $('input[name="StartTime"]').daterangepicker();

  });

Template.dashboardview.events({
  "keyup input": _.debounce(function(e) {
    var date = $("[name='startTime']").val().trim(),
      date2 = $("[name='endTime']").val().trim(),
    client = $("[name='Client']").val().trim(),
    projetimpacte = $("[name ='Projet']").val().trim(),    
    perimetre = $("[name ='Perimetre']").val().trim(),
    search = {};
    if(date) {
      var userDate = new Date(date);
      search.startTime = {
      $gte: userDate,
      $lte: new Date(moment(userDate).add(1,"day").unix()*1000)}
    }
    if (date,date2) {
      var userDate = new date(date);
      var toTime = new Date(moment(date2));
      search.startTime = {
        $gte : userDate,
        $lte : toTime
      }
    }

    if(client) search.client = {$regex: new RegExp(client),
    $options: "i"};    
    if(projetimpacte) search.projetImpacte = {$regex: new RegExp(projetimpacte),
    $options: "i"};
    if(perimetre) search.perimetre = {$regex: new RegExp(perimetre),
    $options: "i"};

    maliste.set(Incidents.find(search));
  }, 200),
  'click .previous':function(){
    if(Session.get('skip')>20){
        Session.set('skip',Session.get('skip')-20);
    }
  },
  'click .next':function(){
       Session.set('skip',Session.get('skip')+20);
    },
    //suppression d'incidents
    "click .suppIssue": function( event, template ) {
      if ( confirm( "Are you sure? This is permanent." ) ) {
        Meteor.call( "deleteIssue", this._id, function( error, response ) {
          if ( !error ) {
            Bert.alert( "Issue deleted!", "danger" );
          } else {
            Bert.alert( error.reason, "warning");
            return false;
          }
        });
      }
    },
    'click .button': function(e,c){
      var curTarget =e.currentTarget.textContent;
    Session.set('curTemplate',curTarget);
    console.log(curTarget);
    }


});
Template.navshapes.helpers({
  // curTemplate: function () {
  // var curTempl = Session.get('curTemplate');
  // if (!curTempl) {
  // curTempl = 'issueByMonth';
  // Session.set('curTemplate', curTempl);
  // }
  // return curTempl;
  // }
});
Template.navshapes.events({
// 'click button.button': function(e,c){
// Session.set('curTemplate',e.currentTarget.textContent);
// }
});
