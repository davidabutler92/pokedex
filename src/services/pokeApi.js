import axios from "axios";

export const getPokemon = (offset) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    .then((res) => {
      if (res.status !== 200) throw new Error("could not get pokemon");

      return Promise.all(
        res.data.results.map((pokemon) => {
          return axios.get(pokemon.url).then((res) => {
            if (res.status !== 200)
              throw new Error("could not get this pokemon");
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
      if (res.status !== 200) throw new Error(`could not get ${name}`);
      return res;
    })
    .catch((err) => {
      return err;
    });
};
