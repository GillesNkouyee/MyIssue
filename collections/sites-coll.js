Sites = new Mongo.Collection('sites');

Sites.allow({

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
Schemas ={};

// Adresse ou coordonnées géographiques du site
Schemas.Address = new SimpleSchema({

  lng: {
    type : Number,
    decimal: true,
    min: -180,
    max: 180
    // ,
    // autoValue:function(){
    //   if(navigator.geolocation)
    //   {
    //   navigator.geolocation.getCurrentPosition(function(location) {
    //     var y = location.coords.longitude;
    //     return y;
    //     console.log(y);
    //   });
    //  }
    // }
  },
  lat: {
    type : Number,
    decimal: true,
    min: -90,
    max: 90
    // ,
    // autoValue:function(){
    //   if(navigator.geolocation)
    //   {
    //   navigator.geolocation.getCurrentPosition(function(location) {
    //     var x = location.coords.latitude;
    //     return x;
    //     console.log(x);
    //   });
    // }
    // }
  }
});
Sites.attachSchema ( new SimpleSchema({
	sitename :{
				type: String,
				label:"Name",
				max: 200,
				},
  index:{
          type: Number,

          decimal: true,
          label: "Counter Index",

        },
  
	region:{
    type: String,
    allowedValues: ['Center','East','Litoral','North','NorthWest','South','SouthWest','West' ],
    optional: true,
    label: "Groupe",
    autoform: {
        afFieldInput: {
            type: "select", // type de champ particulier, voir plus bas
            options: [

                  {
                      value: "Center",
                      label: "Centre/Center"
                  },
                  {
                      value: "East",
                      label: "EST/East"
                  },
                  {
                      value: "Litoral",
                      label: "LITORAL"
                  },

                  {
                      value: "North",
                      label: "North"
                  },
                  {
                      value: "NorthWest",
                      label: "North-West"
                  },
                  {
                      value: "South",
                      label: "South/Sud"
                  },
                  {
                      value: "SouthWest",
                      label: "South-West"
                  },
                  {
                      value: "West",
                      label: "OuesT/West"
                  },


                ]
             }
          }
    },
	ville:{
				type: String,
        // regEx:/^[a-zA-Z-]{2,25}/,
				label:"Ville/Quartier"
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
				label: "Created At",
				autoValue: function() {
				if (this.isInsert) {
				return new Date;
			}
		},
		autoform: {
				type:"hidden"
			}
	},
	updatedAt: {
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
	},

	location: {
		    type: Schemas.Address,
		    autoform: {
		      label: false,
		      placeholder: "Address"
		    }
  		}

}));

Sites.attachSchema (Schemas.sites);
//recherche de site
Schemas.Search = new SimpleSchema({
		  location: {
		    type: Schemas.Address,
		    autoform: {
		      label: false,
		      placeholder: "Address"
		    }
		  },
		  radius: {
		    type: Number,
		    autoform: {
		      label: false,
		      placeholder: "Radius (km)"
		    }
		  }
});
