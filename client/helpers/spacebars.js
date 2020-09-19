Template.registerHelper('sortmaliste',function(){

});

Template.registerHelper('pluralize', function(n, thing) {
  // pluraliser assez simpliste
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }

});
Template.registerHelper('verrouillage', function(status) {
  if (status) {
    return 'hidden';
  } else {
    return '';
  }
});
Template.registerHelper('ratings',function(comp,val){
    return val >= comp ? 'price-text-color':'';
});

Template.registerHelper('currency',function(value){
    return ''+'FCFA'+''+ ''+ Number(value).toFixed(2);
});
Template.registerHelper('unity',function(value){
    return Number(value).toFixed(2)+''+'MW'+'(MegaWatts)'+ '';
});
Template.registerHelper('generationUnit',function(value){
    return Number(value).toFixed(2)+''+'MWh'+'';
});
Template.registerHelper('truncate',function(inputtxt,strlen){
    var shortened;
    var strlen = 12;
    if(inputtxt.length >= strlen){
        shortened = inputtxt.substring(2,strlen) + '...';
    }else {
        shortened = inputtxt;
    }
    return new Spacebars.SafeString(shortened);
});
/*Gestion des utilisateurs */
          Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
            return currentUser === Meteor.userId() ? true : false;
          });

          Template.registerHelper( 'disableIfAdmin', ( userId ) => {
            if ( Meteor.userId() === userId ) {
              return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
            }
          });
          Template.registerHelper( 'disableIfbasic', ( userId ) => {
            if ( Meteor.userId() === userId ) {
              return Roles.userIsInRole( userId, 'basic' ) ? "disabled" : "";
            }
          });
        //   Template.registerHelper('Set_user_inactive',(userId) => {
        //     if ( Meteor.userId() === userId){
        //       return Roles.userIsInRole( userId,'inactive') ?"disabled" :"";
        //    }
        // });
          Template.registerHelper( 'selected', ( v1, v2 ) => {
            return v1 === v2 ? true : false;
          });
          Template.registerHelper('humanReadableDate', (date) =>{
              var m = moment(date);
              //return m.format("MMM,DD");
               return m.format("MMM,DD YYYY HH:mm");
          });
		  Template.registerHelper('goodDateformat',(date) =>{

					  // var year = date.getYear();
					  // var month = (1 + date.getMonth()).toString();
					  // month = month.length > 1 ? month : '0' + month;
					  // var day = date.getDate().toString();
					  // day = day.length > 1 ? day : '0' + day;
					  // return month + '/' + day + '/' + year;

            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');


		  });
if(Meteor.isClient){
//this function puts our cursor where it needs to be.
    function focusText(i) {
    i.focus();
    i.select();
	};
 }
 Template.registerHelper('cltAcronyme', function(clientId,res) {

  if (clientId) {
     var clientAcronyme = Incidents.find({client:clientId}).count();
     return  clientAcronyme;
    } else {
      console.log('problem here'+res);
    }
 });
 Template.registerHelper('pjtAcronyme', function(clientId,res) {

  if (clientId) {
     var pjtacronyme = Clients.findOne(clientId).acronyme;
     return  pjtacronyme;
    } else {
      console.log('problem here'+res);
    }
 });
 Template.registerHelper('Acronyme', function(clientId,res) {

  if (clientId) {
     var cltname = Clients.findOne(clientId).acronyme;
     return  cltname;
     console.log(cltname);
    } else {
      console.log('problem here',);
    }
 });
 Template.registerHelper('activity', function(projetImpacte,res) {

  if (projetImpacte) {
     var activityName = Projets.findOne(projetImpacte).acronyme;
     return  activityName;
    } else {
      console.log('problem here'+res);
    }
 });
   Template.registerHelper('cvPhotoshow', function(myId,res) {

    if (myId) {
       var myUrl = Mypictures.findOne(myId).url;
       return  myUrl;
      } else {
        console.log('problem here');
      }
   });
   // ***Gestion piece jointe
   Template.registerHelper('recupjtname', function(brdId,res) {

    if (brdId) {
       var pjurl = PiecesJointes.findOne(brdId);
       return  pjurl;
      } else {
        console.log(pjurl);
      }
   });
   //***Gestion des ecarts
   Template.registerHelper('ShowGap', function(siteId,err) {

    if (siteId) {
      var sum = 0;
      var Insum = 0;
      var ecart =0;
      var tmpDate = new Date(new Date() - 31 * 24*60 * 60 * 1000);
      // return Sites.find({}).fetch();
      var cursorin = Consommation.find({},{'site':siteId,"createdAt":{"$gte":tmpDate}});

      cursorin.forEach(function(transaction){
          sum = sum + transaction.conso;});
      var cursorout = Livraisons.find({},{'site':siteId,"createdAt":{"$gte":tmpDate}});

      cursorout.forEach(function(transaction){
              Insum = Insum + transaction.appro;

          });
        return  ecart = Insum-sum;
          console.log(ecart);
      } else {
        console.log(err);
      }
   });
   // Template.registerHelper('showGraphIndx',function(siteId,err){
   //   var ctx = document.getElementById('myChart').getContext('2d');
   //   var bottomlabels =[];
   //   var testlist = Consommation.find({'site':siteId});
   //   let listTitles = testlist.map(doc => { return doc.conso });
   //   var mylabels= testlist.map(doc => { return doc.createdAt });
   //   testlist.forEach(function(transaction){
   //       		var lesConsoDate = {
   //       			consoDate : transaction.createdAt,
   //       	 		}
   //
   //      		bottomlabels.push(lesConsoDate);
   //     	 });
   //
   //   // var scdtestlist = Livraisons.find({}).fetch();
   //   // let anotherlist = scdtestlist.map(function(doc){return doc.appro});
   //     // The type of chart we want to create
   //
   //     // The data for our dataset
   //   var data = {
   //         labels:bottomlabels,
   //         datasets: [
   //           {
   //             label: "My First dataset",
   //             fillColor:"rgba(220,220,220,0,2)",
   //             backgroundColor: 'rgba(75, 192, 192, 1)',
   //             pointColor:'rgba(220, 220, 220,1)',
   //             strokeColor:'rgba(220, 220, 220,1)',
   //             pointstrokeColor:'rgba(255, 99, 132,1)',
   //             pointHighlightFill:'#fff',
   //             pointHighlightStroke: 'rgba(220, 220, 220,1)',
   //             data:listTitles ,
   //           }
   //
   //       ]
   //     }
   //     Chart.defaults.global.animation.duration = 300;
   //     var chart = new Chart(ctx).Line(data);
   //     console.log(listTitles);
   //
   // });
   Template.registerHelper('showsitename', function(siteId) {
     // pluraliser assez simpliste
     if (siteId) {
      var lesite = Sites.findOne(siteId).sitename;
      return  lesite;
       } else {
       Meteor.console.error();
       console.log('problem here');
     }

   });
   Template.registerHelper('affichage', function(myId,res) {
     // pluraliser assez simpliste
     if (myId) {
      var myurl = PiecesJointes.findOne(myId).original.name;
      return  myurl;
     } else {
       console.log('problem here');
     }

   });
