// if (Meteor.isClient) {
Template.searchagents.events ({
  "submit #search": function (e) {
      e.preventDefault();
      Session.set('searchValue', $("#searchValue").val());

    }

 });
 // usercount:function(){
 //      var usercount = Meteor.users.find().count();
 //       if(usercount){
 //      return usercount;
 //    }
 //  }
 
    Template.searchagents.helpers({
        mesagents: function() {
          Meteor.subscribe("searchagents", Session.get('searchValue'));
          if (Session.get('searchValue')) {
            return Agents.find({},{sort: [["score", "desc"]],limit: 12});
          } else {
            Session.get('searchValue', "");
            return throwError(403, 'No result found');
          }
        },
        agentlistItem:function(){
          return Agents.find({}).count();
        }
        // distinctBrand: function() {
        //   return _.uniq(Agents.find({},{sort: {
        //     brand: 1},fields:{brand:true}
        //   }).fetch(), true, doc => {
        //     return doc.brand;
        //   });
        // }
      });
 //}
Template.searchagents.onRendered(function(){
  // onClick searchBtn effects
  Session.setDefault('searchValue', null);
      $('#input-search').on('keyup', function() {
        var rex = new RegExp($(this).val(), 'i');
          $('.searchable-container .items').hide();
          $('.searchable-container .items').filter(function() {
              return rex.test($(this).text());
          }).show();
        });
        $(function(){
          $('#searchBtn').click(function() {
            document.getElementById( 'leresultat' ).scrollIntoView();
                window.setTimeout( function () { fadeIn('slow'); },3000 );
        });


    });
    $(function () {
    $("div").slice(0, 4).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $("div:hidden").slice(0, 4).slideDown();
        if ($("div:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
      });
    });

    $('a[href=#top]').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.totop a').fadeIn();
        } else {
            $('.totop a').fadeOut();
        }
    });

});
