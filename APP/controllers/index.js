
Alloy.CFG.lastLocation = $.lastLocation;
Alloy.CFG.used = $.used;
Alloy.CFG.distance = $.distance;
Alloy.CFG.map = $.map;

$.map.userLocation = false;
$.map.region = {
	latitude : "52.19265747070312",
	latitudeDelta : "3.252771615982056",
	longitude : "5.523045539855957",
	longitudeDelta : "4.626287460327148"
};
$.index.open();

if (!Ti.App.Properties.getString('winkel')) {
	Alloy.createController('locatie').getView().open();
}

function annotationKlik(e) {
	Titanium.API.info($.map.region);
}

function geschiedenisKlik(e) {
	Titanium.API.info(Alloy.CFG.gps);
	var arg = {
		gps : Alloy.CFG.gps
	};
	var window = Alloy.createController('geschiedenis', arg).getView();
	$.indexTab.open(window);
}

function kaartKlik(e) {
	var x = Alloy.CFG.idd;
	var arg = {
		id : x
	};
	var window2 = Alloy.createController('kaart', arg).getView();
	window2.open();

	var url = "http://doodlesoft.nl/dev/ah/useCard.php?id=" + x + "&store=" + Ti.App.Properties.getString('winkel');
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {

		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
	});

	client.open("GET", url);

	client.send();
}

var im = null;
function doneer() {
	Titanium.Media.showCamera({

		success : function(event) {
			im = event.media;

			setTimeout(function() {
				mail(im);
			}, 700);
		},
		cancel : function() {
		},
		error : function(error) {
		},
		saveToPhotoGallery : false,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function mail(img) {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = "Kaart delen";
	emailDialog.toRecipients = ['ahnoniem@doodlesoft.nl'];
	emailDialog.addAttachment(img);
	emailDialog.open();
}

Ti.App.addEventListener('openURL', function(e){
    Ti.Platform.openURL(e.url);
});