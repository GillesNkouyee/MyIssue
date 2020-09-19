
Incidents = new Mongo.Collection('incidents');

 SimpleSchema.messages({

   badDate: 'End date must be after the start date.',
     notDateCombinationUnique: 'The start/end date combination must be unique'
});
Incidents.allow({

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
Incidents.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Titre de l'incident"
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
     perimetre:{
       type:String,
       label: "Périmètre",
       autoform: {
               type: 'select', // type de champ particulier, voir plus bas
               options: [
                     {
                         value: "client",
                         label: "Client"
                     },
                      {
                         value: "dsi-centrale",
                         label: "DSI-Centrale"
                     },
                     {
                         value: "dsi-local",
                         label: "DSI-locale"
                     },
                     {
                         value: "operateur",
                         label: "Opérateur"
                     },
                 ]
             }

     },
     Solution: {
         type: String,
         label: "Solution Appliquée",
         defaultValue: function () {
           var running="Indéterminée, action en cours";
           return running;
         },
         autoform: {
             afFieldInput: {
                 type: "textarea",
                 class: "ckeditor",
                 rows: 4
             }
         }
     },
     startTime:{
        type:Date,
        label: "Date de debut",
        // autoform: {
        //   type: "bootstrap-datepicker",
        //   datePickerOptions: {
        //     autoclose: true
        //   }
        // }
     },/*add(1, "days").*/
     endTime:{
        type:Date,
        optional: true,
        label: "Date de fin",
        // autoform: {
        //   type: "bootstrap-datepicker",
        //   datePickerOptions: {
        //     autoclose: true
        //   }
        // },
        custom: function() {
       // get a reference to the fields
       var start = this.field('startTime');
       var end = this;
       // Make sure the fields are set so that .value is not undefined
       if (start.isSet && end.isSet) {
         if (moment(end.value).isBefore(start.value)) return "badDate";
       }
     }
 },
        //}

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
                    optTab[i].value = Clt[i].acronyme;
                }
                return optTab;
            }
        }
    },
     projetImpacte:{
        type: String,
        label: "projet Impacté",
        autoform: {
            type: "select",
            options: function() {
                var Pjt = Projets.find().fetch(); // Tableau de catégories
                var optTab = [];

                for (var i in Pjt) {
                    optTab[i] = {};
                    optTab[i].label = Pjt[i].acronyme;
                    optTab[i].value = Pjt[i].acronyme;
                }
                return optTab;
            }
        }
    },
    nbreagents: {
        type: Number,
        label:"Nombre d'agents impacté"
    },
     statut:{
        type: String,
        label: "Statut de l'incident",
          autoform: {
              afFieldInput: {
                  type: 'select', // type de champ particulier, voir plus bas
                  options: [
                        {
                            value: "ouvert",
                            label: "En cours"
                        },
                        {
                            value: "cloturé",
                            label: "Résolu"
                        },
                    ]
                }
            }
          },
          tickets: {
                type: Array,
                optional: true
              },
              'tickets.$': {
                type: Object
              },
              'tickets.$.Id1': {
                type: String
              },
              'tickets.$.Id2': {
                type: String
              },
         createdAt: {
         type: Date,
         autoValue: function () {
           var Ddate = new Date;
             if (this.isInsert) {
               return Ddate;
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
},
{ tracker: Tracker}));

Incidents.attachSchema (Schemas.incidents);
