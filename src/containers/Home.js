import React, { useState, useCallback, useRef } from "react";

import usePokemon from "../hooks/usePokemon";
import SearchForm from "../components/forms/SearchForm";

function Home() {
  const [offset, setOffset] = useState(0);

  const {
    loading,
    pokemon,
    hasMore,
    error,
    handleSubmit,
    setFormValues,
  } = usePokemon(offset);

  const observer = useRef();

  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffSet) => prevOffSet + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} setFormValues={setFormValues} />
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {pokemon.map((poke, index) => {
            if (pokemon.length === index + 1 && pokemon.length > 1) {
              return (
                <li key={poke.data.name} ref={lastPokemonElementRef}>
                  <p>{poke.data.name}</p>
                  <img
                    src={poke.data.sprites.front_default}
                    alt={poke.data.name}
                  />
                </li>
              );
            }
            return (
              <li key={poke.data.name}>
                <p>{poke.data.name}</p>
                <img
                  src={poke.data.sprites.front_default}
                  alt={poke.data.name}
                />
              </li>
            );
          })}
        </ul>
      )}
      {loading ? <p>loading...</p> : <p></p>}
    </>
  );
}

export default Home;
