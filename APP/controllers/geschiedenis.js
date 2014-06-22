var args = arguments[0] || {};

var points = [];
for (var i = 0; i < args.gps.length; i++) {
	var entry = {
		latitude : args.gps[i].lat,
		longitude : args.gps[i].lon
	};
	points.push(entry);

	var anno = Alloy.Globals.Map.createAnnotation({
		latitude : args.gps[i].lat,
		longitude : args.gps[i].lon,
		pincolor : Alloy.Globals.Map.ANNOTATION_BLUE,
		title : args.gps[i].datetime,
	});
	$.map.addAnnotation(anno);

}

var route = Alloy.Globals.Map.createRoute({
	name : "asdfh",
	points : points,
	color : "#0090DE",
	width : 2
});
$.map.addRoute(route);

$.map.region = {
	latitude : "52.19265747070312",
	latitudeDelta : "3.252771615982056",
	longitude : "5.523045539855957",
	longitudeDelta : "4.626287460327148"
};
$.map.userLocation = false;
