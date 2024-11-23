import { pokeApi } from './poke-api.js';

// Variáveis
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

// Lista global para armazenar todos os Pokémons carregados
let allPokemons = [];

const limit = 6;
let offset = 0;
const maxRecords = 156;

// A função para carregar os pokémons de determinada posição "offset" e quantos "limit". Para cada Pokémon retornado é gerado HTML.
function loadPokemonItens(offset, limit) {
    loadMoreButton.classList.add('spinner');

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Filtra os Pokémons novos, que não estão na lista allPokemons
        const newPokemons = pokemons.filter(pokemon => 
            !allPokemons.some(existing => existing.number === pokemon.number)
        );

        // Atualiza a lista global de Pokémons com os novos Pokémons
        allPokemons = [...allPokemons, ...newPokemons];

        // Cria um fragmento para adicionar os itens
        const fragment = document.createDocumentFragment();

        // Adiciona cada Pokémon ao fragmento
        newPokemons.forEach((pokemon) => {
            const li = document.createElement('li');
            li.className = `pokemon ${pokemon.type}`;
            li.innerHTML = `
                <span class="number"><b>#${pokemon.number}</b></span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="Imagem do Pokémon ${pokemon.name}">
                </div>
            `;
            fragment.appendChild(li);
        });

        // Adiciona o fragmento ao DOM
        pokemonList.appendChild(fragment);

        // Remove o spinner do botão
        loadMoreButton.classList.remove('spinner');
    }).catch((error) => {
        console.error('Erro ao carregar Pokémons:', error);
        loadMoreButton.classList.remove('spinner');
    });
}

// Função para exibir o card
function showPokemonCard(pokemon) {
    const card = document.getElementById('pokemonCard');

    // Renderiza os detalhes do Pokémon no card
    card.innerHTML = `
        <div class="card-content ${pokemon.type}">
            <span id="closeCard" class="close-button">&times;</span>
            <span class="number"><b>#${pokemon.number}</b></span>
            <div id="pokemonDetails">
                
                <span class="name">${pokemon.name}</span>
                

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <ol class="size">
                        <li>Altura: ${pokemon.height / 10} m</li>
                        <li>Peso: ${pokemon.weight / 10} kg</li>
                    </ol>
                </div>
                

                <img src="${pokemon.photo}" alt="${pokemon.name}">
                
                <div class="detail">
                    <p>Habilidades:</p>
                        <ol class="size">
                        ${pokemon.abilities.map((ability) => `<li ${ability}">${ability}</li>`).join('')}
                </div>

                
                <div id="status" class="detail">
                    <p>Atributos:</p>
                    <ol class="stats">
                        ${pokemon.stats
                        .map((stat) => `<li><strong>${stat.name}:</strong> ${stat.value}</li>`)
                        .join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;

    // Exibe o card
    card.classList.remove('hidden');

    // Captura o botão de fechar e adiciona o evento de clique
    const closeCardButton = document.getElementById('closeCard');
    closeCardButton.addEventListener('click', () => {
        card.classList.add('hidden');
    });
}

// Evento para capturar cliques nos Pokémons da tela pricipal
pokemonList.addEventListener('click', (event) => {
    const pokemonLi = event.target.closest('.pokemon');
    if (pokemonLi) {
        const pokemonIndex = Array.from(pokemonList.children).indexOf(pokemonLi);
        const selectedPokemon = allPokemons[pokemonIndex];
        showPokemonCard(selectedPokemon);
    }
});

// Carregamento inicial
loadPokemonItens(offset, limit);

// O botão "Load More" carrega mais Pokémons até alcançar o limite máximo.
loadMoreButton.addEventListener('click', () => {
    // Redefine o início para os próximo registro.
    offset += limit;

    const qtdRecordNextPage = offset + limit;
    // ajusta o limite para não carregar mais do que o permitido.
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        // Remove o botão quando atingir o limite
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});


