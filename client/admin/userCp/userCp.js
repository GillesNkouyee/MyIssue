Template.userProfile.events({
	'change .myFileInput': function(event,template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
             console.log( err);
          } else {
             // handle success depending what you need to do
              toastr.success('Upload succeeded!'), setTimeout(function() {

            var userId = Meteor.userId();
            var imageURL = {
              "profile.avatar_url" : "/cfs/files/images/" + fileObj._id
            };
            Meteor.users.update(userId, {$set: imageURL});
                  }, 2000);
                }
            });
	   });
	 },
	 //changement du mot de passe//
	 	'submit #oldPwd': function (event){
			event.preventDefault();
			var id = Meteor.userId();
			var updtformhdler = event.target;
			var oldPassword;
	    oldPassword= Meteor.users.findOne(Meteor.userId()).password;

			var newPassword = updtformhdler.newpassword.value;
			
			toastr.success('Modification du Pwd en cours...'), setTimeout(function() {
			Accounts.changePassword(oldPassword,newPassword,function(error,result){
								if (error) {console.log(oldPassword,newPassword);
									return false;
								} else {
									Bert.alert('new password correctly set');
								}
							});
						}, 2000);
					},
		//Modification du profile//
	 		'submit #changeProf': function (event){
				event.preventDefault();
				var id = Meteor.userId();
				var formhdler = event.target;
				var doc ={};
				var name =formhdler.usrname.value;
				var lastname =formhdler.usrlastname.value;
				var mobile =formhdler.usrmobile.value;
				var occupation =formhdler.usroccupation.value;
				var status =formhdler.usrstatus.value;
				var birthday =formhdler.usrbirthday.value;
				var website =formhdler.usrwebsite.value;
				var organization =formhdler.usrorganization.value;
				var bio =formhdler.usrbio.value;
				var gender=formhdler.usrgender.value;

				var doc={name:name,lastname:lastname,mobile:mobile,occupation:occupation,status:status,birthday:birthday,organization:organization,website:website,bio:bio,gender:gender};

				//Meteor.users.update({_id:Meteor.userId()}, {$set: {profile:{doc}}});
				Meteor.call("updateUser",name,lastname,gender,organization,occupation,birthday,mobile,website,status,bio, function(error,
						result) {
						if(!error) {Router.go("Home");}
						else {
							Bert.alert(error);
							console.log(error);
							}
						});
				}

	});
Template.userProfile.helpers({
  getdate: function(){
      var mydate =Date.now();
      return mydate.toDateString();
  },
  imageURL: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.avatar_url
  },
  name: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.name
  },
    lastname: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.lastname
  },
    mobile: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.mobile
  },
    status: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.status
  },
    occupation: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.occupation
  },
    birthday: function() {
    return Meteor.users.findOne(Meteor.userId()).profile.birthday
  },
  mail: function() {
    return Meteor.users.findOne(Meteor.userId()).emails[0].address
  },
  role: function() {
    return Meteor.users.findOne(Meteor.userId()).roles },
  userProfile : function() {
    return Meteor.users.findOne({_id: Router.current().params._id})
  }
});

Template.userProfile.onRendered(function(){
  $(document).on('click', '#close-preview', function(){
    //$('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
           $('.image-preview').popover('show');
        },
         function () {
           $('.image-preview').popover('hide');
        }
    );
});
$('#btn_now').click(function(){
	 $(this).find('span').toggleClass('glyphicon glyphicon-pencil').toggleClass('glyphicon glyphicon-plus');
});
$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

});
