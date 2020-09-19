var createIndex = function () {
    var idx = lunr(function () {
      this.field('client');
      this.field('projetImpacte');
      this.field('title');
      this.field('statut');
      this.field('perimetre');
      this.ref('_id');

    });
    return idx;
  };
  Template.searchIncident.rendered = function () {
  //initiate the search session
  //Session.set('resultnber',0);
  Session.setDefault('search', null);

  };
  Template.searchIncident.onRendered(function () {
  //initiate the search session
  Session.set('issuelimit',12);

  lastScrollTop=0;
  $(window).scroll(function(event){
    //detect near bottom of the window
    if($(window).scrollTop()+$(window).height() > $(document).height()-100){
      //check where we already
      var scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {

        Session.set('issuelimit',Session.get('issuelimit')+4);
        console.log("Going down at bottom of window");
      } else {

        console.log("up");
      }
    lastScrollTop = scrollTop;

    Bert.alert('hey gilles, did u fix the issue ? it\'s all good already!','info');
    //console.log(new Date(),issuelimit);
    }
  })

  });
Template.searchIncident.helpers({
  //create a helper to get what the current search value is
  search: function () {
    var search = Session.get('search');
    return search;
  },

  //create a helper that returns the search results
  searchResults: function () {
    var index, docs, searchResults;
    var resultnber = 0;
    var search = Session.get('search');
    var results = [];
    if (search) {
      //create the index (see function above)
      index = createIndex();
      docs = Incidents.find({},{sort:{createdAt:-1},limit:(Session.get('issuelimit'))}).fetch();
      //for each Agent available to the client...
      _.each(docs, function (incident) {
        //add the todo to the index
        index.add(incident);
      });
      //process the search results
      //[{ref: 'mongoId', score: 0.923},...]
      searchResults = index.search(search);

      //for each of the search results score...
      _.each(searchResults, function (searchResult) {
        //only add if the results are above zero, zero means no result
        if (searchResult.score > 0) {
          //add doc to the list of valid results
          results.push(_.findWhere(docs, {_id: searchResult.ref}));
        }
      }
    );
    //Session.set('resultnber',results.length);
    //Session.get('resultnber');
    Bert.alert(results.length +""+"résultats","info");
    }

    return results;

  }
  ,
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
   }
  });

  Template.searchIncident.events({
    //update the search session when the search input changes
    'keyup #search, change #search' : function (event) {
      var search;
      search = event.target.value;
      Session.set('search', search);
    }
  });
