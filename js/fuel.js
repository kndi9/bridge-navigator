const search = document.getElementById('search')
const fuelStations = document.getElementById('fuel-stations');
const locationData = document.getElementById('location-data')
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sortFuelStations);
  } else {
    locationData.innerHTML = "Geolocation is not supported by this browser.";
  }
}
async function sortFuelStations(position) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;
  const res = await fetch('/data/fuel.json'); //'../bridge-navigator/data/fuel.json'
  const stations = await res.json();
  const sortedStations = stations.sort(function(a, b) {
    if (Math.hypot(a.latitude - userLatitude, a.longitude - userLongitude) > Math.hypot(b.latitude - userLatitude, b.longitude - userLongitude)
    ) return -1;
  if (Math.hypot(a.latitude - userLatitude, a.longitude - userLongitude) < Math.hypot(b.latitude - userLatitude, b.longitude - userLongitude)
    ) return 1;
  });
  outputHtml(sortedStations);
}
const outputHtml = stations => {
    const html = stations.map(station => `
    <div class="card text-white bg-secondary mb-3">
            <div class="card-header"><a href="https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}">${station.location}</a></div>
            <div class="card-body">
                <p class="card-text">
                ${station.address}, ${station.county} County<br>
                Hours: ${station.hours}<br> 
                Fuel Type:  ${station.fuel}<br>
                <a href="https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}">Lat/Long: ${station.latitude},${station.longitude}</a>
                </p>
            </div>
        </div>
    `).join('');
    fuelStations.innerHTML = html;
}
search.addEventListener('click', () => getLocation());