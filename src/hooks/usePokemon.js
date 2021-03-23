import { useState, useEffect } from "react";
import { getPokemon, getPokemonByName } from "../services/pokeApi";

export default function usePokemon(offset) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (formValues === "") {
      offset = 0;
      getPokemon(offset).then((res) => {
        setError("");
        setPokemon(res);
        setLoading(false);
      });
    } else {
      getPokemonByName(formValues).then((res) => {
        if (res.status === 200) {
          setPokemon([res]);
          setLoading(false);
        } else {
          setError(`Please check spelling, could not find ${formValues}`);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    setLoading(true);

    getPokemon(offset).then((res) => {
      setPokemon((prevPokemon) => {
        return [...prevPokemon, ...res];
      });
      setHasMore(res.length > 0);
      setLoading(false);
    });
  }, [offset]);

  return {
    loading,
    pokemon,
    hasMore,
    handleSubmit,
    setFormValues,
    formValues,
    error,
  };
}
