
//load the airport position data and create the firebase object
define(function (require) {
	var airports = require('./data/airports');
});

var firebase = new Firebase('https://publicdata-airports.firebaseio.com/');


/*
*	Application module
*
*	Main module that initializes the entire app.
*/


var app = {
	$airportSelect: null,
	$airportInfoTitle: null,
	$airportInfoDescription: null,

	/*
	*	Initialize the app
	*/


	init: function() {
		//Register the DOM elements
		this.$airportSelect = $("#airportSelect");
		this.$airportInfoTitle = $("#airportInfoTitle");
		this.$airportInfoDescription = $("#airportInfoDescription");

		//Get ready for user manually changing location
		this.changeLocation();

		//Check for location using geolocate api
		this.getLocation();

	},

	/*
	*	If user changes the select box, get data for a new airport
	*/


	changeLocation: function() {
		that = this;
		this.$airportSelect.change(function() {
			if (this.value !== '') {
				that.getDelayData(this.value);
			}
		});
	},


	/* 	If user allows us to get their location, iterate through the 
	*	airports object and find the closest airport to them
	*/


	getLocation: function() {
		// Use modernizr to detect for geolocation abilities
		if (Modernizr.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {

				var lowDist = 100000; // set it super high to start
				var closeAirport = '';

				for (var airport in airports) {
					if (airports.hasOwnProperty(airport)) {
						var dist = this.getDistance(
							pos.coords.latitude,
							pos.coords.longitude,
							airports[airport].latitude,
							airports[airport].longitude
							);

						if (dist < lowDist) {
							lowDist = dist;
							closeAirport = airport;
						}
					}
				}

				this.$airportSelect.val(closeAirport);

			}).bind(this);
		} else {
			//figure out what to do if they don't allow geolocate, etc
		}
	},


	/*
	*	Let firebase do what it does best
	*/


	getDelayData: function(data) {
		firebase.child(data).on("value", this.delayNotify.bind(this));
	},


	/*
	*	When data in firebase changes, fire the delayNotify function and update the DOM
	*/


	delayNotify: function(snapshot) {
		var html = '';
		var a = snapshot.val();
		this.$airportInfoTitle.html('<h1>'+a.IATA+' - '+a.name+'</h1>');
		if (a.delay) {
			html = '<p>There is currently an average delay of '+a.avg+' minutes. The FAA has listed the following reason for the delay: '+a.reason+'</p>';
		} else {
			html = '<p>There are no known delays for this airport.</p>';
		}
		this.$airportInfoDescription.html(html);
	},


	/* 
	*	Calculate the distance between two sets of coordinates.
	*	Courtesy of stack overflow
	*/


	getDistance: function(lat1, lon1, lat2, lon2) {
    	var R = 6731;
    	var dLat = this.deg2rad(lat2-lat1);
    	var dLon = this.deg2rad(lon2-lon1);
    	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  				Math.cos(this.deg2rad(lat1)) * 		
  				Math.cos(this.deg2rad(lat2)) * 
    			Math.sin(dLon/2) * Math.sin(dLon/2);
      	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  		var d = R * c; // Distance in km
  		return d;
  	},


  	/* 
  	*	Helper function for getDistance
  	*	also from stack overflow
  	*/


  	deg2rad: function(deg) {
    	return deg * (Math.PI/180);
  	},




};

$(document).ready(function(){
	app.init();
});

