Projets = new Mongo.Collection('projets');
Projets.allow({

insert : function(userId,doc){
return true;
},
update : function(userId,doc,fieldNames,modifier){
return true;
},
remove : function(userId,doc){
return true;
},
  fetch: ['owner']
});
Schemas = {};

Projets.attachSchema(new SimpleSchema({
    acronyme: {
        type: String,
        label: "Nom du projet"
     },
     client:{
          type: String,
          label: "Client",
          autoform: {
              type: "select",
              options: function() {
                  var Clt = Clients.find().fetch(); // Tableau de catégories
                  var optTab = [];

                  for (var i in Clt) {
                      optTab[i] = {};
                      optTab[i].label = Clt[i].acronyme;
                      optTab[i].value = Clt[i]._id;
                  }

                  return optTab;
              }
            }
          },
     description: {
         type: String,
         label: "Description",
         autoform: {
             afFieldInput: {
                 type: "textarea",
                 class: "ckeditor",
                 rows: 3
             }
         }
     },
     createdAt: {
         type: Date,
         autoValue: function () {
             if (this.isInsert) {
               return new Date;
             } else {
               this.unset();
             }
         },
         autoform: {
             omit: true
         }
     },

    lastUpdate: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        },
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            } else {
                this.unset();
            }
        }
    },
    createdBy: {
        type: String,
        autoform: {
            omit: true
        },
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    }
}));
Projets.attachSchema (Schemas.Projets);
