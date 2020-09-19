//SitePics collection
var pieceStore = new FS.Store.FileSystem("piecejointes",{path: "./uploads/piecejointes"
	});
PiecesJointes = new FS.Collection("piecejointes", {
	 stores: [pieceStore],
	 filter : {
        maxSize: 5048576,
        allow : {
                extensions: ['pdf','FBX','cad','jpeg','gif','png','jpg']
        }
    }

	});
// var PiecesJointes = new Mongo.Collection('piecejointes');
//MemberPics collection permission
PiecesJointes.allow({

	insert : function(userId,doc){
	return true;
	},
	update : function(userId,doc,fieldNames,modifier){
	return true;
	},
	remove : function(userId,doc){
	return true;
	},
	download: function(){
	return true;
	},
	  fetch: ['Owner']

});
