const search = document.getElementById('search')
const fuelStations = document.getElementById('fuel-stations');
const locationData = document.getElementById('location-data')
const userPosition = navigator.geolocation.getCurrentPosition;

const sortFuelStations = async userLocation => {
    const res = await fetch('../bridge-navigator/data/fuel.json');
    const stations = await res.json();

    outputHtml(stations);
}
const outputHtml = stations => {
    const html = stations.map(station => `
    <div class="card text-white bg-secondary mb-3">
            <div class="card-header"><a href="https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}">${station.location}</a></div>
            <div class="card-body">
                <p class="card-text">
                <small>${station.address}, ${station.county}</small><br>
                <small>Hours: ${station.hours},<br> Fuel Type:  ${station.fuel}</small><br>
                <small>Lat/Long: ${station.latitude},${station.longitude}</small>
                </p>
            </div>
        </div>
    `).join('');
    fuelStations.innerHTML = html;
}
search.addEventListener('click', () => sortFuelStations());

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationData.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  locationData.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}