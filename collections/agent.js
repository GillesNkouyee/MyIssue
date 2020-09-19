Agents = new Mongo.Collection('agents');

Agents.allow({

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
Agents.attachSchema(new SimpleSchema({
  nom:{
          type: String,
          label: "Nom",
          //regEx: /^[a-z0-9A-Z .]{3,30}$/,
          max: 50
  },
  prenom:{
          type: String,
          label: "Prenom",
          //regEx: /^[a-z0-9A-Z .]{3,30}$/,
          max: 50
  },
  matricule:{
          type: String,
          label: "Matricule",
          regEx: /^[a-z0-9A-Z .]{3,30}$/,
          max: 20
  },
  projet: {
             type: String,
             label: "Choisir un Projet",
             optional:true,
             autoform: {
               autoValue: "",
                 type: "select",
                 options: function() {
                     var pjt = Projets.find().fetch(); // Tableau de projets
                     var optTab = [];

                     for (var  i in pjt ) {
                         optTab[i] = {};
                         optTab[i].label = pjt[i].acronyme;
                         optTab[i].value = pjt[i].acronyme;
                     }

                     return optTab;
                 }
             }
         },
  emails: {
                   type: String,
                   regEx: SimpleSchema.RegEx.Email,
                   optional: false,
                   label: "Adresses Email"
               },
  mobile: {
             type:String,
             // regEx:/^[a-zA-Z-]{2,25}/,
             optional:true,
             label:"Phone Number"
       },
  login: {
                  type:String,
                  // regEx:/^[a-zA-Z-]{2,25}/,
                  optional:true,
                  label:"Login Avaya",
            },
  extension_Avaya: {
                       type:String,
                       // regEx:/^[a-zA-Z-]{2,25}/,
                       optional:true,
                       label:"Ext Avaya",
                 },
     fonction:{
                   type:String,
                   label:"Poste",
                   optional: true,
                   autoform: {
                       afFieldInput: {
                           type: 'select', // type de champ particulier, voir plus bas
                           options: [
                                 {
                                     value: "Comptable",
                                     label: "ASSIST DFI"
                                 },
                                 {
                                     value: "Assist_DMG",
                                     label: "ASSIST DMG"
                                 },
                                 {
                                     value: "BUM",
                                     label: "BUM"
                                 },
                                 {
                                     value: "Coach",
                                     label: "Coach"
                                 },
                                 {
                                     value: "Formateur",
                                     label: "FORM"
                                 },
                                 {
                                     value: "IDP",
                                     label: "IDP"
                                 },
                                 {
                                     value: "IT",
                                     label: "IT Support"
                                 },
                                 {
                                     value: "IT_Mngr",
                                     label: "IT Manager"
                                 },
                                 {
                                     value: "TL",
                                     label: "Team Leader"
                                 },
                                 {
                                     value: "OPS",
                                     label: "OPS"
                                 },
                                 {
                                     value: "RespQlt",
                                     label: "RespQlt"
                                 },
                                 {
                                     value: "RespRH",
                                     label: "RespRH"
                                 },
                                 {
                                     value: "RespCOM",
                                     label: "RespCOM"
                                 },
                                 {
                                     value: "Assist_RH",
                                     label: "ASSIST_RH"
                                 },
                               ]
                            }
                         }
                },
  direction:{
          type: String,
          label:"Direction",
          autoform: {
              afFieldInput: {
                  type: 'select', // type de champ particulier, voir plus bas
                  options: [
                        {
                            value: "N/A",
                            label: "Non Applicable"
                        },
                        {
                            value: "DG",
                            label: "DG"
                        },
                        {
                            value: "DFI",
                            label: "DFI"
                        },
                        {
                            value: "DCOMM",
                            label: "DCOMM"
                        },
                        {
                            value: "DMG",
                            label: "DMG"
                        },
                        {
                            value: "DSI",
                            label: "DSI"
                        },
                        {
                            value: "DRH",
                            label: "DRH"
                        },
                        {
                            value: "DFORM",
                            label: "DFORM"
                        },
                        {
                            value: "DOPS",
                            label: "DOPS"
                        },
                        {
                            value: "DQLT",
                            label: "DQLT"
                        }
                      ]
                   }
                }
      },
      createdBy: {
    				type: String,
    				label: "Created By",
    				autoValue: function() {
    				if (this.isInsert) {
    				return this.userId;
    			}
    		},
    		autoform: {
    				type:"hidden"
    			}
    	},
    	createdAt: {
    				type: Date,
    				label: "Date de sortie",
    				autoValue: function() {
    				if (this.isInsert) {
    				return new Date();
    			}
    		}
    	},
    	lastUpdate: {
    				type: Date,
    				label: "Updated At",
    				autoValue: function() {
    				if (this.isUpdate) {
    				return new Date();
    			}
    		},
    			autoform: {
    				type:"hidden"
    			},
    			denyInsert: true,
    			optional: true
    	}
}))
