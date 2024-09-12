import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokemonsArray = ref([]);
  const pokeFound = ref(null);

  function pokemonCatch(pok) {
    pokemonsArray.value.push(pok);
  }

  function removePokemon(pokemonToRemove) {
    pokemonsArray.value = pokemonsArray.value.filter(pokemon => pokemon.id !== pokemonToRemove.id);
  }

  function pokeFoundAdd(pokemonFound){
    pokeFound.value = pokemonFound;
  }

  function pokeFoundReset(){
    pokeFound.value = null;
  }

  return { pokemonsArray, pokemonCatch, removePokemon, pokeFound, pokeFoundAdd, pokeFoundReset };
});
