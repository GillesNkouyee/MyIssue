Template.workrecap.onCreated( () => {
  Template.instance().subscribe( 'users' );
});
Template.workrecap.helpers({
  listerlesUser: function() {
      return Meteor.users.find().fetch();
  },
  'RhmemberWorkcount' :function(){
    var cvCreator = Meteor.userId();
    return  Curriculums.find({createdBy:this._id}).count();
  },
  'RhmemberWork':function(){
    var creator = Meteor.userID();
    return   Curriculums.find({createdBy:creator},{sort: {createdAt:-1}}).count();
  },
  'daylyRhWorkcount' :function(){
    var oday = new Date().getDate();
    var daylyCVin=[];
    var totalCVin =[];
    var nbreCVin=0;
    var globalRes = Curriculums.find({createdBy:this._id});

      globalRes.forEach(function(insertion){
        var mvt = {
          dateCVin : insertion.createdAt.getDate(),
          cniCV : insertion.cni,
          nomCV : insertion.nom,
          prenomCV : insertion.prenom,
          telephoneCV : insertion.telephone,
          formationCV : insertion.formation

          }
        totalCVin.push(mvt);  // insertion dans le tableau
    });
        nbreCVin = totalCVin.length;

      if(nbreCVin > 0){                               // Si BD non vide
      for(var i = 0; i < nbreCVin; i++){
        if (totalCVin[i].dateCVin == oday){
          daylyCVin.push(totalCVin[i]);   // Je mets ds un tableau les entrées du mois en cour
        }
      }
    }  console.log(oday);
    return  daylyCVin.length;

  },
  'monthlyWorkcount' :function(){
    var oday = new Date();
		var odayMois = oday.getMonth();
    var cvCreator = Meteor.userId();
    var mnthlyCVin=[];
    var totalCVin =[];
    var nbreCVin=0;
    var info=0;
    var globalRes = Curriculums.find({createdBy:this._id});

      globalRes.forEach(function(insertion){
        var mvt = {
          dateCVin : insertion.createdAt,
          cniCV : insertion.cni,
          nomCV : insertion.nom,
          prenomCV : insertion.prenom,
          telephoneCV : insertion.telephone,
          formationCV : insertion.formation

          }
        totalCVin.push(mvt);  // insertion dans le tableau
    });
        nbreCVin = totalCVin.length;

      if(nbreCVin > 0){                               // Si BD non vide
      for(var i = 0; i < nbreCVin; i++){
        if (totalCVin[i].dateCVin.getMonth() == odayMois){
          mnthlyCVin.push(totalCVin[i]);   // Je mets ds un tableau les entrées du mois en cour
        }
      }
    }
    return  mnthlyCVin.length;
  }
});
