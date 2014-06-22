var args = arguments[0] || {};

var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '', 'winkels.json');
var json = f.read();

var winkels = JSON.parse(json);

var data = [];
for(var i = 0 ; i < winkels.length; i++){
	data.push(Titanium.UI.createTableViewRow({title:winkels[i],color:'#000000'}));
}
$.winkels.data = data;

function klik(e){
	Ti.App.Properties.setString('winkel', e.row.title);
	$.win.close();
}
