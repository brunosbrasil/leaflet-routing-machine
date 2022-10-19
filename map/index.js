const map = L.map('map');
var control;

function mapsCreateMap() {
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
};

function mapsRoutingPoints(points) {
	mapsCreateMap();
	var listPoint = [];
	points.forEach(function (item, indice, array) {
		listPoint.push(L.latLng(item[0], item[1]))
	});

	var oleoIcon = new L.Icon({
		iconUrl: '../image/barril-de-petroleo.png',
		shadowUrl: '../image/barril-de-petroleo.png',
		iconSize: [35, 35],
		shadowSize: [35, 35]
	  });

	// let iconOptions = {
	// 	title:"company name",
	// 	draggable:true,
	//    };

	(control == undefined) ? null : control.remove();
	control = L.Routing.control(L.extend(window.lrmConfig, {
		waypoints: listPoint,
		createMarker: function (i, wp, nWps) {
			return L.marker(wp.latLng, {
				icon: oleoIcon 
			});
			//  return L.marker(wp.latLng, iconOptions);
		},
		geocoder: L.Control.Geocoder.nominatim(),
		routeWhileDragging: true,
		reverseWaypoints: true,
		showAlternatives: true,
		altLineOptions: {
			styles: [
				{ color: 'black', opacity: 0.15, weight: 9 },
				{ color: 'white', opacity: 0.8, weight: 6 },
				{ color: 'blue', opacity: 0.5, weight: 2 }
			]
		}
	})).addTo(map);

	L.Routing.errorControl(control).addTo(map);
}

var points = [[-12.939036, -38.340930], [-12.951179, -38.384995], [-12.930545, -38.325996],
[-12.930378, -38.357066],[-12.941838, -38.358912],[-12.948697, -38.361701]];
mapsRoutingPoints(points);