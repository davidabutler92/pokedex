import React from "react";

export default function PokeList({
  error,
  pokemon,
  lastPokemonElementRef,
  loading,
  isSubmitting,
}) {
  return (
    <>
      {loading && isSubmitting === true ? (
        <p>loading...</p>
      ) : error ? (
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
    </>
  );
}
