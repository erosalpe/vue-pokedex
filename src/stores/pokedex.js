import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokemonsArray = ref([]);

  function pokemonCatch(pok) {
    pokemonsArray.value.push(pok);
  }

  function removePokemon(pokemonToRemove) {
    pokemonsArray.value = pokemonsArray.value.filter(pokemon => pokemon.id !== pokemonToRemove.id);
  }

  return { pokemonsArray, pokemonCatch, removePokemon  };
});
