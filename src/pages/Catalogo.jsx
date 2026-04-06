import { useState, useEffect, useMemo } from 'react';
import CardGrid from '../components/Cards/CardGrid';
import PokemonCard from '../components/Pokemon/PokemonCard';
import PokemonService from '../services/PokemonAPI';


const Catalogo = ()=>{
    /* Hooks en React herramientas que permiten ejecutar y mantener la referencia
    a un estado del componente  */
    const [isLoaded, setIsLoaded] = useState(false);
    const [PokemonListData, setPokemonListData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const PokemonServiceInstance = useMemo(()=>{
        return new PokemonService();
    },[isLoaded]);
    useEffect(
        ()=>{
            if(PokemonServiceInstance){
                PokemonServiceInstance.FetchList(page, limit, setPokemonListData);
            }
        }
        , [page, limit, isLoaded, PokemonServiceInstance]
    );

    if (isLoaded && !PokemonListData) {
        setIsLoaded(true);
        return <div>Loading</div>
    }
    return (
        <CardGrid
          gridItems={PokemonListData?.results?.map(o=> {
            return (
                <PokemonCard data={o} key={o.name} />
            );
          })} />
    );
}

export default Catalogo;