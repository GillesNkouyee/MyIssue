

var SearchData = new ReactiveVar(null);
var map;
var Markers = [];
//variable globale
var infowindow = null;
var filters = {Center:false,East:false,Litoral:false,North:false,NorthWest:false,South:false,SouthWest:false,West:false};
if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyAjQpbO7DRHNw8vidtkPtyRBYlor0WVg1k' });
  });
}
var createMap = function() {
  var lat = 4.864716;
  var lng = 9.349014;
  var center = new google.maps.LatLng(lat, lng);
  var latlng = new google.maps.LatLng(lat, lng);
  var options = {
    zoom: 10,
    streetViewControl: true,
    scaleControl: true,
    draggable: true,
    panControl:true,
    disableDefaultUI: false,
    zoomControl: true,
    zoomControlOptions: {
    style: google.maps.ZoomControlStyle.SMALL
    },
    overviewMapControl: true,
    overviewMapControlOptions: {
    opened: true
  },
    disableDoubleClickZoom: false,
     center: center,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

   map = new google.maps.Map(document.getElementById("map-canvas"),options);
  };

  var addMarkersToMap = function(unsite) {
  if (!map) {
    console.log("Map non initialisée!");
    return;
  }

    var center = true;
    var sitegroup = $('#type option:selected').text();

    unsite.forEach(function(unsite) {

    var lat = unsite.location.lat;
    var lng = unsite.location.lng;
    var sitetitle = unsite.sitename ;
  	//var lestock = unsite.fuelStock.quantity;
    var legroup = unsite.region;

    if (center) {
      map.setCenter(new google.maps.LatLng(lat, lng));
    }
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: sitetitle

    });
    bounds  = new google.maps.LatLngBounds();
    loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    bounds.extend(loc);
    //map.fitBounds(bounds);
    map.panToBounds(bounds);
    // # auto-zoom # auto-center custom marker  function

    var contentString = '<div style="margin:0 0 0 5px;">'
	//+ '<img src="'+zzz+'" style="height:2 cm; widht:2cm" />' +''
    +'<h4 style="text-align:center;color:#5E7CBD; font-family: Open Sans,sans-serif;">'+ sitetitle +'</h4>'

    +'<h5 style="text-align:center;color:#000; font-family: Open Sans,sans-serif;">'+'<strong>Fuel level:</strong>'+ lestock +'</h5>'
    //+ '<h5 style="text-align:center;">'+xxx +'</h5><hr>'+'<h5 class=" pull-left" style="text-align:center;">'+'<strong>Location:</strong>'+pharmaddress +'</h5>'
    +'</div>';
    $('#type').change(function(){
      var sitegroup = $('#type option:selected').text();
      if ( sitegroup == legroup || sitegroup == 'ALL') {
           marker.setVisible(true);
       }
       // Categories don't match
       else {
           marker.setVisible(false);
       }
    });

    marker.setIcon();

    marker.addListener("click", function() {
      if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
            map.panTo(this.getPosition());
            map.setZoom(10);
          } else {
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
            map.panTo(this.getPosition());
            //map.setZoom(10);
          }
          if (lestock >= 300){
        //marker.setVisible(false);
          toastr.info('Ce site est OK!',options={
      		"closeButton": true,
      		"debug": false,
      		"newestOnTop": false,
      		"progressBar": false,
      		"positionClass": "toast-bottom-right"})
          }else{
			  toastr.warning('Ce site doit être ravitaillé!',options={
      		"closeButton": true,
      		"debug": false,
      		"newestOnTop": false,
      		"progressBar": false,
      		"positionClass": "toast-up-right"})


		  };
          //marker.setShadowIcon('medicine.png', [43,31]);
        console.log("clicked on ", unsite );

      Markers.push(marker);
    });

  });
}
Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  }
});
Template.map.onRendered (function() {

  //load google map every time the template is rendered
	//GoogleMaps.load({ v: '3', key: 'AIzaSyAjQpbO7DRHNw8vidtkPtyRBYlor0WVg1k' });

       this.autorun(function() {
         if (GoogleMaps.loaded()) {
          return createMap();
        }
       });

       this.autorun(function() {
         var unsite = Sites.find({});

          if (unsite.count() > 0) {
           addMarkersToMap(unsite.fetch());
         }
       });
	   $('#btn_new').click(function(){
       $(this).find('span').toggleClass('glyphicon glyphicon-pencil').toggleClass('glyphicon glyphicon-plus');
       });
       /**************************/
    });

  $(function(){
   toastr.options = {
   "closeButton": true,
   "debug": false,
   "newestOnTop": false,
   "progressBar": false,
   "positionClass": "toast-bottom-right",
   "preventDuplicates": true,
   "onclick": null,
 // 	"showDuration": "300",
 // 	"hideDuration": "1000",
   "timeOut": "5000",
   "extendedTimeOut": "1000",
   "showEasing": "swing",
   "hideEasing": "linear",
   "showMethod": "fadeIn",
   "hideMethod": "fadeOut"
   }
 });
