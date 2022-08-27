import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [previousPageURL, setPreviousPageURL] = useState();
  const [nextPageURL, setNextPageURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageURL(res.data.next);
      setPreviousPageURL(res.data.previous);
      setPokemon(res.data.results.map((pkm => pkm.name)))
    })

    return () => cancel();
  }, [currentPageURL]);

  function gotoNextPage(){
    setCurrentPageURL(nextPageURL);
  }
  
  function gotoPrevPage(){
    setCurrentPageURL(previousPageURL);
  }

  if(loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        gotoPrevPage={previousPageURL ? gotoPrevPage : null}
        gotoNextPage={nextPageURL ? gotoNextPage : null}
      />
    </>
  );
}

export default App;
