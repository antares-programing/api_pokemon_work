const URL = "https://pokeapi.co/api/v2/pokemon";
const getPokemonButton = document.getElementById("getPokemonButton");
const pokemonInfo = document.getElementById("pokemonInfo");
const PKINFO = document.getElementById("pkDataDiv")
const PKIMG = document.getElementById("pkImgDiv")

getPokemonButton.addEventListener("click", () => {
    const POKEMONENTRY = document.getElementById("pokemonName").value;
    console.log(POKEMONENTRY)
    fetch(`${URL}/${POKEMONENTRY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let stats = [];
            for (element of data.stats){
                let newEntry = {propertyName: element.stat.name, propertyValue: element.base_stat}
                stats.push(newEntry)
            }
            let statHTML = "";
            for (let i = 0; i < stats.length; i++){
                statHTML += `
                <p>${stats[i].propertyName}: ${stats[i].propertyValue}</p>`
            }
            PKINFO.innerHTML = `
                <h2>${data.name}</h2>
                <p>Type: ${data.types[0].type.name}</p>
                <p>Height: ${data.height} ft</p>
                ${statHTML}
            `;
            PKIMG.innerHTML =`
            <img id="pokeimage" src="${data.sprites.front_default}" alt="${data.name}">
            `;
        })
        .catch(error => {
            console.error("Error al obtener los datos del Pokémon:", error);
            pokemonInfo.innerHTML = `
                <h2>No lo encontre, lo siento</h2>
                <h2>intenta con otro nombre</h2>
            `;
        });
});