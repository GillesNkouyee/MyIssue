if (Meteor.IsClient){
  Curriculums.find().observe({
    removed: function(curriculums){
      new Notification("Breaking News: "+curriculums.nom+ " died");
    }
  })
}
// if(Meteor.isServer){
//   Curriculums.find().observe({
//     deleteCV: function(curriculums){
//       new Notification("Breaking News: "+curriculums.nom+ " died");
//     }
//   })
// }
