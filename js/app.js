
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
			var that = this;
			navigator.geolocation.getCurrentPosition(function(pos) {

				var lowDist = 100000; // set it super high to start
				var closeAirport = '';

				for (var airport in airports) {
					if (airports.hasOwnProperty(airport)) {
						var dist = that.getDistance(
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

				that.$airportSelect.val(closeAirport);
				that.$airportSelect.trigger("change");

			});
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

var airports = {
  ATL: {latitude:33.640728,longitude:-84.427700},
  BNA: {latitude:36.126317,longitude:-86.677371},
  BOS: {latitude:42.372230,longitude:-71.031142},
  BWI: {latitude:39.177404,longitude:-76.668392},
  CLE: {latitude:41.412434,longitude:-81.847992},
  CLT: {latitude:35.214403,longitude:-80.947315},
  CVG: {latitude:39.053275,longitude:-84.663017},
  DCA: {latitude:38.851242,longitude:-77.040232},
  DEN: {latitude:39.856096,longitude:-104.673738},
  DFW: {latitude:32.899809,longitude:-97.040335},
  DTW: {latitude:42.216172,longitude:-83.355384},
  EWR: {latitude:40.689531,longitude:-74.174462},
  FLL: {latitude:26.074234,longitude:-80.150602},
  IAD: {latitude:38.953116,longitude:-77.456539},
  IAH: {latitude:29.990220,longitude:-95.336783},
  IND: {latitude:39.716859,longitude:-86.295595},
  JFK: {latitude:40.641311,longitude:-73.778139},
  LAS: {latitude:36.084000,longitude:-115.153739},
  LAX: {latitude:33.941589,longitude:-118.408530},
  LGA: {latitude:40.776927,longitude:-73.873966},
  MCI: {latitude:39.300643,longitude:-94.712594},
  MCO: {latitude:28.431158,longitude:-81.308083},
  MDW: {latitude:41.786776,longitude:-87.752188},
  MEM: {latitude:35.042068,longitude:-89.979173},
  MIA: {latitude:25.795865,longitude:-80.287046},
  MSP: {latitude:44.884755,longitude:-93.222285},
  ORD: {latitude:41.974162,longitude:-87.907321},
  PDX: {latitude:45.589769,longitude:-122.595094},
  PHL: {latitude:39.874396,longitude:-75.242423},
  PIT: {latitude:40.495772,longitude:-80.241311},
  RDU: {latitude:35.880079,longitude:-78.787996},
  SAN: {latitude:32.733801,longitude:-117.193304},
  SEA: {latitude:47.450250,longitude:-122.308817},
  SFO: {latitude:37.621313,longitude:-122.378955},
  SJC: {latitude:37.363947,longitude:-121.928938},
  SLC: {latitude:40.789940,longitude:-111.979071},
  STL: {latitude:38.661945,longitude:-90.651108},
  TEB: {latitude:40.849022,longitude:-74.062953},
  TPA: {latitude:27.983478,longitude:-82.537078},
};

$(document).ready(function(){
	app.init();
});

