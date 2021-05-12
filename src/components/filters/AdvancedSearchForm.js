import React, { useState } from "react";

import { getPokemonByType } from "../../services/pokeApi";
import types from "../../constants";

export default function AdvancedSearchForm() {
  const [checked, setChecked] = useState({
    bug: false,
    fairy: false,
    fire: false,
    ghost: false,
    ground: false,
    normal: false,
    psychic: false,
    steel: false,
    dark: false,
    electric: false,
    fighting: false,
    flying: false,
    grass: false,
    ice: false,
    poison: false,
    rock: false,
    water: false,
  });

  const handleInputChange = ({ target }) => {
    const checked = target.checked;
    const name = target.name;

    setChecked((prevData) => {
      return {
        ...prevData,
        [name]: checked,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const entries = Object.entries(checked);
    const checkedTypes = entries
      .filter((entry) => {
        return entry[1] !== false;
      })
      .map((filteredEntries) => {
        return filteredEntries[0];
      });
    if (checkedTypes.length > 2)
      return console.log("No Pokémon matched your search.");
    getPokemonByType(checkedTypes).then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      {types.map((type) => (
        <label key={type.name}>
          {type.title}
          <input
            onChange={handleInputChange}
            type="checkbox"
            checked={checked[type.name]}
            name={type.name}
            className={type.name}
            value={type.name}
          />
        </label>
      ))}
      <button type="submit">filter</button>
    </form>
  );
}
