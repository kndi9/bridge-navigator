const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Search structures.json and filter it
const searchStructures = async searchText => {
    // const res = await fetch('../bridge-navigator/data/alstructures.json');
    const res = await fetch('data/alstructures.json');
    const structures = await res.json();
    
    //Get matches to current text input
    let matches = structures.filter(bridge => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return bridge.structure.match(regex) || bridge.name.match(regex);
    });
    if(searchText.length < 4){
        matches =[];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.name}<span class="text-primary"> ${match.structure}</span></h4>
            <small>${match.town}, ${match.county}</small>
            <small>${match.route}, Milepost ${match.milepost}</small>
            <small><a href="https://www.google.com/maps/search/?api=1&query=${match.latlong}">Lat/Long: ${match.latlong}</a></small>
        </div>
        `).join('');
        matchList.innerHTML = html;
    }
}
search.addEventListener('input', () => searchStructures(search.value));