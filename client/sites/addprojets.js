Template.addProjet.onRendered(function(){
  // $('.ui.menu .item')
  // .tab()
  // ;
  // $('.ui.checkbox')
  //   .checkbox()
  // ;

  $('#btn_ext').click(function(){
     $(this).find('span').toggleClass('glyphicon glyphicon-pencil')
     .toggleClass('glyphicon glyphicon-plus');
  });
});

Template.addProjet.events({
  'submit #projetform': function(err,id){
  event.preventDefault(event);
  var Owner = Meteor.user();
  if(!err) {
          toastr.success("Nouveau Projet ajouté par " + ' ' + Owner.profile.name);
          console.log('id');

          } else {
            console.log(err);
            toastr.warning(err);
          }
      }
});
