import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokemonsArray = ref([]);
  const pokeFound = ref(null);

  // Recupera il valore iniziale da localStorage
  const loadPokemonsFromLocalStorage = () => {
    const storedPokemons = localStorage.getItem('pokemonsArray');
    if (storedPokemons) {
      pokemonsArray.value = JSON.parse(storedPokemons);
    }
  };

  // Salva il valore nel localStorage
  const savePokemonsToLocalStorage = () => {
    localStorage.setItem('pokemonsArray', JSON.stringify(pokemonsArray.value));
  };

  // Carica i dati dal localStorage all'inizio
  loadPokemonsFromLocalStorage();

  // Salva i dati nel localStorage ogni volta che pokemonsArray cambia
  watch(pokemonsArray, savePokemonsToLocalStorage, { deep: true });

  function pokemonCatch(pok) {
    pokemonsArray.value.push(pok);
  }

  function removePokemon(pokemonToRemove) {
    pokemonsArray.value = pokemonsArray.value.filter(pokemon => pokemon.id !== pokemonToRemove.id);
  }

  function pokeFoundAdd(pokemonFound) {
    pokeFound.value = pokemonFound;
  }

  function pokeFoundReset() {
    pokeFound.value = null;
  }

  return { pokemonsArray, pokemonCatch, removePokemon, pokeFound, pokeFoundAdd, pokeFoundReset };
});
