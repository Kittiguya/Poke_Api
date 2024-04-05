const searchForm = document.getElementById('search-form');
const pokeInput = document.getElementById('pokemon-name');
const pokeInfo = document.getElementById('pokemon-info');
const pokeImg = document.getElementById('pokemon-img');
const pokeDetails = document.getElementById('pokemon-details');

const fetchPokemon = async (pokemonName) => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await resp.json();
        displayPokemon(data);
    } catch (error) {
        displayError('Pokémon probably from Sword/Shield. ');
    }
};

const displayPokemon = (pokemon) => {
    pokeImg.src = pokemon.sprites.front_default || '';
    pokeDetails.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Base Experience: ${pokemon.base_experience}</p>
        <!-- Add more details as needed -->
    `;
};

const displayError = (message) => {
    pokeInfo.innerHTML = `<p>${message}</p>`;
    pokeImg.src = '';
    pokeDetails.innerHTML = '';
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemonName = pokeInput.value.trim().toLowerCase();
    if (pokemonName) {
        fetchPokemon(pokemonName);
    } else {
        displayError('Please enter a Pokémon name.');
    }
});

