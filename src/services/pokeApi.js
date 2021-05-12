import axios from "axios";

export const getPokemon = (offset) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    .then((res) => {
      if (res.status !== 200)
        throw new Error("No Pokémon matched your search.");

      return Promise.all(
        res.data.results.map((pokemon) => {
          return axios.get(pokemon.url).then((res) => {
            if (res.status !== 200)
              throw new Error("No Pokémon matched your search.");
            return res;
          });
        })
      ).then((res) => {
        return res;
      });
    });
};

export const getPokemonByName = (name) => {
  const lowerCaseName = name.toLowerCase();
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseName}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status !== 200)
        throw new Error("No Pokémon matched your search.");
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getPokemonByType = (typeArray) => {
  return Promise.all(
    typeArray.map((type) => {
      return axios.get(`https://pokeapi.co/api/v2/type/${type}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
  )
    .then((res) => {
      console.log(res);
      const CombinedArray = res
        .map((item) => {
          return item.data.pokemon;
        })
        .flat();

      console.log(CombinedArray[0].pokemon.name, "caterpie");

      const uniquePokemonNames = [
        ...new Set(CombinedArray.map((data) => data.pokemon.name)),
      ].map((name) => CombinedArray.find((data) => console.log(data)));
      console.log(uniquePokemonNames);
    })
    .catch((err) => {
      return err;
    });
};
