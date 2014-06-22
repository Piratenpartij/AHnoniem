// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.Map = require('ti.map');

function checkDatum() {
	var a = new Date();
	a = a.toString();
	a = a.substring(0, 12);

	if (Ti.App.Properties.getString('datum') != a) {
		Ti.App.Properties.setString('datum',a);
		Ti.App.Properties.setInt('kaarten', 0);
	}
}

checkDatum();

Ti.App.addEventListener('resume', function() {
	checkDatum();
});

function getCard() {
	var urlid = '';
	if (Ti.App.Properties.getInt('kaarten') < 3) {
		Ti.App.Properties.setInt('kaarten', Ti.App.Properties.getInt('kaarten') + 1);
	} else {
		urlid = '&id=' + Ti.App.Properties.getString('id');
	}

	if (Ti.App.Properties.getString('winkel' == null)) {
		var url = "http://doodlesoft.nl/dev/ah/getCard.php?store=" + Ti.App.Properties.getString('winkel') + urlid;
	} else {
		var url = "http://doodlesoft.nl/dev/ah/getCard.php?store=Utrecht" + urlid;
	}

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var response = JSON.parse(this.responseText);
			Alloy.CFG.lastLocation.text = response.lastLocation;
			Alloy.CFG.used.text = response.used;
			Alloy.CFG.gps = response.history;
			Alloy.CFG.idd = response.id;
			Ti.App.Properties.setString('id', response.id);
			Alloy.CFG.distance.text = response.distance + ' KM';
			Titanium.API.info(response);
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
	});

	client.open("GET", url);

	client.send();
}

getCard();

function getAllCards() {
	var url = "http://doodlesoft.nl/dev/ah/getAllCards.php";
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var response = JSON.parse(this.responseText);
			for (var i = 0; i < response.length; i++) {
				var anno = Alloy.Globals.Map.createAnnotation({
					latitude : response[i].lat,
					longitude : response[i].lon,
					//pincolor : Alloy.Globals.Map.ANNOTATION_BLUE,
					title : response[i].titel,
					//rightButton : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
				});
				Alloy.CFG.map.addAnnotation(anno);
			}
		},

		onerror : function(e) {
			Ti.API.debug(e.error);
		},
	});

	client.open("GET", url);

	client.send();
}

getAllCards();


if (Ti.Platform.osname == 'android'){
            Ti.Gesture.addEventListener('orientationchange', function(e) {
 
              Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
            });
        }