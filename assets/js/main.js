/* 
    FETCH(URL)
    PROCESSAMENTO ASSINCRONO -> PROCESSAMENTO QUE VAI SER EXECUTADO E QUE NAO IRA TER A 
    RESPOSTA DE IMEDIATO, SERIA A PROMESSA DE UMA REQUISICAO

    .then RESQUISICAO MANIPULA O SUCESSO DO FECTCH -> CASO RETORNE SUCESSO EXECUTE A FUNCAO 
    .catch REQUISICAO MANIPULA O FRACASSO DO FETCH -> CASO RETORNE FRACASSO A FUNCAO NAO IRA SER EXECUTADA
    .finally REQUISICAO IDEPENDENTE DO SUCESSO OU DO FRACASSO
    
    PROMESSA DE ALGUMA COISA -> QUANDO FOR TERONARN IRA EXECUTAR O THEN

    response.json() CONVERSAO DE ReadableStream PARA JSON 
*/
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 16
let offset = 0    

function loadPokemonItens(offset, limit){ 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                    <li class="pokemon ${pokemon.type}" >
                        <span class="number">#${pokemon.number}</span> 
                        <span class="name">${pokemon.name}</span>
            
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}" alt=${pokemon.name}">
                        </div>
                    </li>
             `  
        ).join('')
        pokemonList.innerHTML += newHtml       
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => { 
    offset += limit
    loadPokemonItens(offset, limit)
})