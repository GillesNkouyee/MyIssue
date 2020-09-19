Template.updateIncident.helpers({
  listedeCV: function(){
    return Incidents.find();
  }
  // CVlistitem: function(){
  //      var Cvlst =  Curriculums.find({},{sort:{createdAt:-1}});
  //
  //      Cvlst.forEach(function(show){
  //        var Cvid = show._id;
  //        console.log(Cvid);
  //      });
  //      return Cvlst;
  //   },
})
Template.updateIncident.events({
  'change .myFileInput': function(event,template) {
      FS.Utility.eachFile(event, function(file) {
        PiecesJointes.insert(file, function (error, fileObj) {
          if (error){
             // handle error
            Bert.alert(error.reason,"info");
          } else {
             // handle success depending what you need to do
            toastr.success('Upload succeeded!'), setTimeout(function() {
            var CurriculumId = Router.current().params._id;
            var updtDoc = {"CVScan":fileObj._id};
            var userId = Meteor.userId();
            //Meteor.call('modifiercv',CurriculumId,{$set:{CVScan:fileObj._id}});
            Curriculums.update(CurriculumId, {$set:updtDoc}, function (error, fileObj) {
                  if (!error) {
                    Bert.alert('Great, you are the GOAT',fileObj);
                    // $("[name='piecejointes']").val()="";
                    Router.go('operationview');
                  } else {
                    Bert.alert(error.reason,"danger");
                  }
              });
              console.log(CurriculumId,updtDoc,fileObj._id);
          }, 1000);
          }
      });
	   });
	 },
   'change .myCvPicture': function(event,template) {
       FS.Utility.eachFile(event, function(file) {
         Mypictures.insert(file, function (error, fileObj) {
           if (error){
              // handle error
             Bert.alert(error.reason,"info");
           } else {
              // handle success depending what you need to do
             toastr.success('Upload succeeded!'), setTimeout(function() {
             var CurriculumId = Router.current().params._id;
             var updtDoc = {"photo":fileObj._id};
             var userId = Meteor.userId();

             Curriculums.update(CurriculumId, {$set:updtDoc}, function (error, fileObj) {
                   if (!error) {
                     Bert.alert('Great, you are the GOAT',fileObj);
                     // $("[name='piecejointes']").val()="";
                     Router.go('operationview');
                   } else {
                     Bert.alert(error.reason,"danger");
                   }
               });
               console.log(CurriculumId,updtDoc,fileObj._id);
           }, 1000);
           }
       });
 	   });
 	 },
   'submit #updtAgentform':function(error,tmplate){

           setTimeout(function() {
             Bert.alert('Great, you are still the GOAT !');
             // $("[name='piecejointes']").val()="";
           }, 500);
           Router.go('operationview');
   //     });
   //   console.log(exists);
    }
  });
  Template.updateIncident.onRendered(function(){
    $('#datepicker').datepicker({
              // uiLibrary: 'bootstrap4'
          });

  });
