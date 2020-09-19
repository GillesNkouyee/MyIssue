Router.configure({
    layoutTemplate: 'AppLayout',
    notFoundTemplate: 'notFound', //template with name notFound
    loadingTemplate: 'Loading',//template with name loading

});
Router.map(function(){


    this.route('index',{path: '/'}),
    this.route('login',{path: 'login'}),
    this.route('searchIncident',{path: '/search.view'

    //on route / template named "home" will be rendered


  }),
    this.route('dashboardview',{path: '/dashboard.view'}),
    this.route('createIncident',{path: '/createIncident.view'}),

   this.route('Profile',{path:'/admin/userCp',
            onBeforeAction:function(pause){
            if (Roles.userIsInRole(Meteor.user(), ['admin','basic','manager'])) {
              this.render('userProfile');
                 }
                else {
                //adminfalse
                  this.render('Home');
            }
        }

     }),
     this.route('register',{path: '/register'}),
     this.route('userCtrlpanel',{path: 'Admin/controlpanel/userCtrlpanel.view',
               onBeforeAction:function(pause){
                if (! Meteor.user()) {
                    if (Meteor.loggingIn()) {
                    this.render(this.loadingTemplate);
                } else{
                this.render('index');
                }

                    }else {
                    this.next();
                }
              }
   }),
     this.route('operationview',{path: 'operations/enregistrement.view',
               onBeforeAction:function(pause){
                if (! Meteor.user()) {
                    if (Meteor.loggingIn()) {
                    this.render(this.loadingTemplate);
                } else{
                this.render('index');
                }

                    }else {
                    this.next();
                }
              }
   }),

 this.route('/modification/Incidents/:_id', function () {
      var item = Incidents.findOne({_id: this.params._id});
      this.render('updateIncident', {data: item});
        }, {
      name: 'updateIncident'
    })

   Router.route('/cfs/meteor_uploads/piecejointes/:_id', function() {
      //var pjurl = fileObj.url;
       var item = PiecesJointes.findOne({_id:Router.current().params._id});
       this.render('piecejointes', {data: item});
       }, {
     name: 'ppjointes'
   }),

     this.route('editsite',{path: 'editsite.view',
               onBeforeAction:function(pause){
                if (! Meteor.user()) {
                    if (Meteor.loggingIn()) {
                    this.render('Loading');
                } else{
                this.render('index');
                }

                    }else {
                    this.next();
                }
              }
     })
    //  Router.route('/modifySite/:_id', function() {
    //     var item = Sites.findOne({_id:Router.current().params._id});
    //     this.render('modifySite', {data: item})
    //     }, {
    //   name: 'modifySite'
    // })

    });
    var mustBeSignedIn = function(){
      if (!(Meteor.user()|| Meteor.loggingIn())){
          Router.go('index');
      }else{
        this.next();
      }
    };
