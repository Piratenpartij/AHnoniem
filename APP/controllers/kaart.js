var args = arguments[0] || {};

$.web.url = 'http://doodlesoft.nl/dev/ah/card2.php?id='+args.id;
function sluiten(){
	$.win.close();
}

 /* var dialog = Ti.UI.createAlertDialog({
    buttonNames: ['Oke'],
    message: 'Tik twee keer op de kaart om terug te keren naar de app.',
    title: 'Kaart verbergen'
  }).show();*/