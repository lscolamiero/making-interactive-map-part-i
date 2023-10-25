//creating map
var map = L.map('myMap').setView([36.188110, -115.176468], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '6',
}).addTo(map);
  
navigator.geolocation.watchPosition(success, error);

//declaring global variables for the functions
let marker, circle, zoomed;

function success(pos) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
//removing markers according to the user position
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

//adding custom marker for the user
    marker = L.marker([lat, lng]).addTo(map)
    .bindPopup('<span><b>You are here<br></b></span>')
    .openPopup();
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

//fit bounds for the circle if position changed
    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);

}

//alert for errors function
function error(err) {
    if (err.code === 1) {
        alert("Please allow location access");
    }
    else {
        alert("Cannot get current location");
    }
}

//getting the business value from the user
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})