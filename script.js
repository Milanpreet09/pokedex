const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const limit = 20;

async function fetchPokemonData(offset, limit) {
    const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}

function createPokemonCard(pokemon) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.className = 'pokemon';
    
    const pokemonImg = document.createElement('img');
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    pokemonImg.alt = pokemon.name;
    
    const pokemonName = document.createElement('p');
    pokemonName.textContent = pokemon.name;
    
    pokemonDiv.appendChild(pokemonImg);
    pokemonDiv.appendChild(pokemonName);
    
    return pokemonDiv;
}

async function loadPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    const pokemonData = await fetchPokemonData(offset, limit);
    for (const pokemon of pokemonData) {
        const response = await fetch(pokemon.url);
        const pokemonDetails = await response.json();
        const pokemonCard = createPokemonCard(pokemonDetails);
        pokemonContainer.appendChild(pokemonCard);
    }
    offset += limit;
}

document.getElementById('load-more').addEventListener('click', loadPokemon);

// Initial load
loadPokemon();
