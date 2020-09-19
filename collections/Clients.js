Clients = new Mongo.Collection('clients');

Clients.allow({

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
Schemas={};
Clients.attachSchema(new SimpleSchema({
    acronyme: {
        type: String,
        label: "Nom du clientt"
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
Clients.attachSchema (Schemas.Clients);
