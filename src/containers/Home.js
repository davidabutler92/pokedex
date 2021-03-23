import React, { useState, useEffect } from "react";
import { getPokemon } from "../services/pokeApi";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  console.log(pokemon);

  useEffect(() => {
    getPokemon().then((res) => {
      setPokemon(res);
    });
  }, []);

  return (
    <ul>
      {pokemon.map((poke) => (
        <li key={poke.data.name}>
          <p>{poke.data.name}</p>
          <img src={poke.data.sprites.front_default} alt={poke.data.name} />
        </li>
      ))}
    </ul>
  );
}

export default Home;
