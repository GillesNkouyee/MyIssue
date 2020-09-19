
// Session.setDefault("skip",0);
// 		Deps.autorun(function(){
// 	Meteor.subscribe("dashboardview",Session.get("skip"))
// });
Tracker.autorun(function() {
	Meteor.subscribe("dashboardview");
});
Tracker.autorun(function() {
Meteor.subscribe("mypictures");
});
Meteor.subscribe("agentList");
Meteor.subscribe("projetList");
Meteor.subscribe("clientList");

// Meteor.subscribe("fsrList");
Tracker.autorun(function() {
Meteor.subscribe("images");
});
Meteor.subscribe("piecejointes");
//Pager pagination subscriber
// if(Meteor.isClient){
// 	Session.setDefault("skip",0);
// 	Deps.autorun(function() {
// 	Meteor.subscribe("Cvlist",Session.get('skip'));
// 	});
// }
//Infinite pagination
// if(Meteor.isClient){
// 	var handle;
// 	Tracker.autorun(function(){
// 		handle=Meteor.subscribeWithPagination('Cvlist',3);
// 	})
// }
