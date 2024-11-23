// initialise map
var map = L.map("map").setView([15, -15], 7);


// add the scale bar to the map
L.control.scale().addTo(map)

// add the basemap osm
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// add google basemap
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

// Ajout des geojson
var region = L.geoJSON(Sn_reg,{ 
    style:{
        color:"red"
    }}
  ).bindPopup(function  (layer) {
     return "Région de : " + layer.feature.properties.REG
}).addTo(map)
// ajout des routes
var route_national = L.geoJSON(route_national,{
    style: {color:"black",weight: "3", dashArray: "10, 20", dashOffset: "20"}
}).addTo(map);
  
    // Ajout des Département a partir de github 
var url = 'https://github.com/Darcman0/My_data/blob/main/Senegal/Administrative/SN_departement.geojson';
$.getJSON(url, function (geojson) {
var Departement = L.geoJson(geojson)
}).addTo(map);

    

// basemaps legend
var baseLayers = {
   
    "OSM": OpenStreetMap_France,
    "google Satellite": googleSat
};
// layers legend
var overlays = {
   "Route nationale" : route_national,
   "Région": region,
   "Departement": Departement
};
// controle de la légende 
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);


// ajout de leaflet impression de carte web
L.control.browserPrint({position: 'topleft'}).addTo(map);

// coordonner du hover de la souris et recupérer les coordonnes latitudinaux et longitudinaux et les ecrire dans la div avec la class coordinate


    map.on('mousemove', function(e) {
        console.log(e)
        $('.coordinate').html(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
    });
   
