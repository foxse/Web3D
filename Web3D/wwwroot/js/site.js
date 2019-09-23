// Write your Javascript code.
/// <reference path="..\lib\typings\jquery.d.ts" />
/// <reference path="..\lib\typings\svg-pan-zoom.d.ts" />
$(document).ready(function () {
	$('#model_explorer').height('inherit');
	if ($('#svg').length) {
		$("#svg").contextmenu(function (e) {
			e.preventDefault();
		});
		var zoomSvg = svgPanZoom('#svg', {
			zoomEnabled: true,
			controlIconsEnabled: true,
			fit: true,
			center: true,
			preventMouseEventsDefault: true
		});
	}
});
