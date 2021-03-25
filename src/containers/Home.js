import React, { useState, useCallback, useRef } from "react";

import usePokemon from "../hooks/usePokemon";
import SearchForm from "../components/forms/SearchForm";
import PokeList from "../components/list/PokeList";
import AdvancedSearchForm from "../components/filters/AdvancedSearchForm";

function Home() {
  const [offset, setOffset] = useState(0);

  const {
    loading,
    pokemon,
    hasMore,
    error,
    handleSubmit,
    setFormValues,
    isSubmitting,
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
      <AdvancedSearchForm />
      <PokeList
        error={error}
        isSubmitting={isSubmitting}
        loading={loading}
        pokemon={pokemon}
        lastPokemonElementRef={lastPokemonElementRef}
      />
      {loading && isSubmitting === false ? <p>loading...</p> : <p></p>}
    </>
  );
}

export default Home;
