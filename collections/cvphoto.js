
cvphotoStore = new FS.Store.FileSystem("mypictures");
	Mypictures = new FS.Collection("mypictures",{
	 stores: [cvphotoStore],
   filter : {
        maxSize: 5048576,
        allow : {
                extensions: ['jpeg','gif','png','jpg']
        }
    }
	});

	Mypictures.allow({
	 insert: function(){
	 return true;
	 },
	 update: function(){
	 return true;
	 },
	 remove: function(){
	 return true;
	 },
	 download: function(){
	 return true;
	 }
	});
