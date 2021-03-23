import axios from "axios";

export const getPokemon = () => {
  return axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
    if (res.status !== 200) throw new Error("could not get pokemon");

    return Promise.all(
      res.data.results.map((pokemon) => {
        return axios.get(pokemon.url).then((res) => {
          if (res.status !== 200) throw new Error("could not get this pokemon");
          return res;
        });
      })
    ).then((res) => {
      return res;
    });
  });
};
