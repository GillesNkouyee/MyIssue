Template.addClient.onRendered(function(){
  /* $('.menu .item')
  .tab()
  ;
  $('.ui.checkbox')
    .checkbox() */
  ;

  $('#btn_ext').click(function(){
     $(this).find('span').toggleClass('glyphicon glyphicon-pencil')
     .toggleClass('glyphicon glyphicon-plus');
  });
});

Template.addClient.events({
  'submit #clientform': function(err,id){
  event.preventDefault(event);
  var Owner = Meteor.user();
  if(!err) {
          toastr.success("Nouveau Client ajouté par " + ' ' + Owner.profile.name);
          console.log('id');

          } else {
            console.log(err);
            toastr.warning(err);
          }
      }
});
