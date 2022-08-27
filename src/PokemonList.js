import React from 'react'

export default function PokemonList(props) {
  const {pokemon} = props;
  return (
    <div>
      {pokemon.map(pkm => (
        <div key={pkm}>{pkm}</div>
      ))}
    </div>
  )
}
