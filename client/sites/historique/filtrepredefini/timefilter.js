// AFFICHAGE DE L'HISTORIQUE DES INCIDENTS



	//-------------------- Affichage sur le mois ------------------------------
	Template.issueByMonth.helpers({
		mesIncidentsMensuels : function(){

			var oday = new Date();
			var odayMois = oday.getMonth();

			var totalIncdt = [];
			var mesInMois = [];
			var nbreIncdt = 0;

			var mesIncdt = Incidents.find({});      // Tous les incidents confondus


			mesIncdt.forEach(function(transaction){

     			var incdt = {
     				startDate : transaction.startTime,
            endDate : transaction.endTime,
     				incdtClient : transaction.client,
	      		incdtProjet : transaction.projetImpacte,
	      	 	incdtTitle: transaction.title,
	      	 	incdtImpact: transaction.description,
	      		incdtNbreagent : transaction.nbreagents,
	      		incdtTicket1: transaction.tickets.Id1,
            incdtTicket2: transaction.tickets.Id2,
            incdtPerimetre: transaction.perimetre,
						issueId:transaction._id
	      		}

     			totalIncdt.push(incdt);  // Je mets tous ces incidents dans un tableau pr pouvoir effectuer des opérations
    	 	});


      		nbreIncdt = totalIncdt.length;

	     	if(nbreIncdt > 0){                               // Si BD non vide
				for(var i = 0; i < nbreIncdt; i++){
					if (totalIncdt[i].startDate.getMonth() == odayMois){
						mesInMois.push(totalIncdt[i]);   // Je mets ds un tableau les incidents du mois en cour
					}
				}
		  	}
		  	else {                                 // Si BD vide, je mets "#"
		  		var mesInMois = [
		  			{
              startDate : "#",
              incdtClient : "#",
              incdtProjet : "#",
              incdtTitle: "#",
              incdtImpact: "#",
              incdtNbreagent : "#",
              incdtTicket1: "#",
              incdtTicket2: "#",
              incdtPerimetre: "#",
		      		}
		      	];
		  	}


			return mesInMois;
		},
		// 'hasItem':function(){
	  //   var hasItem = maliste.get().count();
	  //   return hasItem;
		//
	  //   /* console.log(nbreIncidents); */
	  //  },
    rangetime: function(){
     var start = this.startDate;
     var end   = this.endDate;
     var diff  = new Date(end - start);
     var days  = diff/1000/60/60;

     if (days > 0) {
       return days;
       } else {
         return 'Incident en cours ';
       }
     }
	});
// Template.issueByMonth.events({
// 	"click .delIssue": function( event, template ) {
// 		if ( confirm( "Are you sure? This is permanent." ) ) {
// 			Meteor.call( "deleteIssue", incndtId, function( error, response ) {
// 				if ( !error ) {
// 					Bert.alert( "Issue deleted!", "danger" );
// 				} else {
// 					Bert.alert( error.reason, "warning");
// 					return false;
// 				}
// 			});
// 		}
// 	}
// });


	//-------------------- Affichage sur le trimestre ------------------------------
	Template.issueByQuarter.helpers({
		mesIncidentsTrimestriels : function(){

			var mSup;
			var mInf;
			var oday = new Date();
			var odayMois = oday.getMonth();
			if (odayMois <3){ mSup = 3; mInf = 0; }
			else if (odayMois <6){ mSup = 6; mInf = 3; }
			else if (odayMois <9){ mSup = 9; mInf = 6; }
			else { mSup = 12; mInf = 9; }

      var totalIncdt = [];
      var mesInTrim = [];
      var nbreIncdt = 0;

      var mesIncdt = Incidents.find({});      // Tous les incidents confondus


      mesIncdt.forEach(function(transaction){

          var incdt = {
						incndtId:transaction._id,
            startDate : transaction.startTime,
            endDate : transaction.endTime,
            incdtClient : transaction.client,
            incdtProjet : transaction.projetImpacte,
            incdtTitle: transaction.title,
            incdtImpact: transaction.description,
            incdtNbreagent : transaction.nbreagents,
            incdtTicket1: transaction.tickets.Id1,
            incdtTicket2: transaction.tickets.Id2,
            incdtPerimetre: transaction.perimetre
            }

          totalIncdt.push(incdt);  // Je mets tous ces incidents dans un tableau pr pouvoir effectuer des opérations
        });


      nbreIncdt = totalIncdt.length;

	     	if(nbreIncdt > 0){                               // Si BD non vide
				for(var i = 0; i < nbreIncdt; i++){
					if (totalIncdt[i].startDate.getMonth() >= mInf && totalIncdt[i].startDate.getMonth() < mSup){
						mesInTrim.push(totalIncdt[i]);
					}
				}
		  	}
		  	else {
		  		var mesInTrim = [
		  			{
              startDate : "#",
              incdtClient : "#",
              incdtProjet : "#",
              incdtTitle: "#",
              incdtImpact: "#",
              incdtNbreagent : "#",
              incdtTicket1: "#",
              incdtTicket2: "#",
              incdtPerimetre: "#",
		      		}
		      	];
		  	}


			return mesInTrim;
		}
	});


	//-------------------- Affichage sur le semestre ------------------------------
	Template.issueBySemester.helpers({
		mesIncidentsSemestriels : function(){

			var mSup;
			var mInf;
			var oday = new Date();
			var odayMois = oday.getMonth();
			if (odayMois < 6){ mSup = 6; mInf = 0; }
			else { mSup = 12; mInf = 6; }

      var totalIncdt = [];
      var mesInSem = [];
      var nbreIncdt = 0;

      var mesIncdt = Incidents.find({});      // Tous les incidents confondus


      mesIncdt.forEach(function(transaction){

          var incdt = {
						incndtId:transaction._id,
            startDate : transaction.startTime,
            endDate : transaction.endTime,
            incdtClient : transaction.client,
            incdtProjet : transaction.projetImpacte,
            incdtTitle: transaction.title,
            incdtImpact: transaction.description,
            incdtNbreagent : transaction.nbreagents,
            incdtTicket1: transaction.tickets.Id1,
            incdtTicket2: transaction.tickets.Id2,
            incdtPerimetre: transaction.perimetre,
            }

          totalIncdt.push(incdt);  // Je mets tous ces incidents dans un tableau pr pouvoir effectuer des opérations
        });


        nbreIncdt = totalIncdt.length;

  	     	if(nbreIncdt > 0){                               // Si BD non vide
  				for(var i = 0; i < nbreIncdt; i++){
  					if (totalIncdt[i].startDate.getMonth() >= mInf && totalIncdt[i].startDate.getMonth() < mSup){
  						mesInSem.push(totalIncdt[i]);
  					}
  				}
  		  	}
  		  	else {
  		  		var mesInSem = [
  		  			{
                startDate : "#",
                incdtClient : "#",
                incdtProjet : "#",
                incdtTitle: "#",
                incdtImpact: "#",
                incdtNbreagent : "#",
                incdtTicket1: "#",
                incdtTicket2: "#",
                incdtPerimetre: "#",
  		      		}
  		      	];
  		  	}

			return mesInSem;
		}
	});


	//-------------------- Affichage sur l'année ------------------------------
	// Template.tmplteHistoEntreesAnnee.helpers({
	// 	mesEntreesAnnuelles : function(){
  //
	// 		var oday = new Date();
	// 		var odayAnnee = oday.getYear();
  //
	// 		var totalMvt = [];
	// 		var mesInAnnee = [];
	// 		var nbreMvt = 0;
  //
	// 		var mesIn = Mouvement.find({typeMvt : 'IN'});
  //
  //
	// 		mesIn.forEach(function(transaction){
  //
  //    			var mvt = {
  //    				dateM : transaction.dateMvt,
  //    				dateMa : transaction.dateMat,
	//       			typeM : transaction.typeMat,
	//       	 		categorieM : transaction.categorieMat,
	//       	 		etatM : transaction.etatMat,
	//       			qteM : transaction.qteMat,
	//       			frnsM : transaction.frnsseurMat
	//       		}
  //
  //    			totalMvt.push(mvt);
  //   	 	});
  //
  //
  //     		nbreMvt = totalMvt.length;
  //
	//      	if(nbreMvt > 0){                               // Si BD non vide
	// 			for(var i = 0; i < nbreMvt; i++){
	// 				if (totalMvt[i].dateM.getYear() == odayAnnee){
	// 					mesInAnnee.push(totalMvt[i]);
	// 				}
	// 			}
	// 	  	}
	// 	  	else {
	// 	  		var mesInAnnee = [
	// 	  			{
	// 	      			dateMa : "#",
	// 	      			typeM : "#",
	// 	      	 		categorieM : "#",
	// 	      	 		etatM : "#",
	// 	      			qteM : "#",
	// 	      			frnsM : "#"
	// 	      		}
	// 	      	];
	// 	  	}
  //
  //
	// 		return mesInAnnee;
	// 	}
	// });
