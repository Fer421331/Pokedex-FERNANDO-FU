class PokemonService {
    constructor(){
        this.pokelist = [];
        this.fetchedIds = [];
        this.flatlist = {};
    }

    FetchList(page=1, limit=20, onFetchHandler) {
        const offset = limit * (page-1);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then( httpResponse => httpResponse.json())
            .then( data => {
                if (onFetchHandler !== undefined){
                    onFetchHandler(data);
                } else {
                    alert("Se Cargo los datos de Pokemon API");
                }
            })
            .catch((error)=>{
                alert("Error al cargar la lista de pokemon");
            });
    }

}

export default PokemonService;