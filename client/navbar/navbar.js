Template.Navbar.onRendered(function(){
  
});
Template.Navbar.events({
	'click #logout':function(){
		Meteor.logout();
		Router.go('index');
	}
});
Template.Navbar.helpers({
  profilepic: function() {
		return Meteor.users.findOne(Meteor.userId()).profile.avatar_url
		},
    name: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.name
  }
});
