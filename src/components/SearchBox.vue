<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { usePokedexStore } from '../stores/pokedex.js';

const pokeName = ref(''); 
const pokedexStore = usePokedexStore();
const btnShow = ref(false); 

function isntCatched(poke) {
  if (!pokedexStore.pokemonsArray.some(element => element.name === poke.name)) {
    btnShow.value = true;
  }
}


function PokeSearch(){
  pokedexStore.pokeFoundReset();
  if (!pokeName.value.trim()) {
    console.warn('Inserisci un nome valido per il Pokémon');
    return;
  }

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`)
    .then(response => {
      pokedexStore.pokeFoundAdd({
        name: response.data.name,
        sprites: response.data.sprites,
        stats: response.data.stats,
        types: response.data.types
      });
      console.log(response.data);
      isntCatched(pokedexStore.pokeFound);
      console.log(btnShow.value);
    })
    .catch(error => {
      console.error('Errore nella richiesta:', error);
    });

  pokeName.value = '';
}

function pokeSend(){
  pokedexStore.pokemonCatch(pokedexStore.pokeFound);
  console.log(pokedexStore.pokemonsArray)
  btnShow.value = false;
}

function pokeFree(){
  pokedexStore.removePokemon(pokedexStore.pokeFound);
  console.log(pokedexStore.pokemonsArray)
  btnShow.value = true;
}

</script>

 <!--Top right pokedex screen-->
<template>

   <!--Searchbar-->
  <form class="d-flex" role="search" @submit.prevent="PokeSearch">
    <input class="form-control me-2" type="search" aria-label="Search" placeholder="Cerca un Pokémon" v-model="pokeName">
    <button class="btn btn-secondary" type="submit">Search</button>
  </form>

  <div id="poke-show" class="position-relative">

    <!--Placeholder when there is no pokemon sprite-->
    <div v-if="!pokedexStore.pokeFound">
      <img src="../../public/pokeball.png" alt="pokeball" id="img-placeholder" class="position-absolute">
    </div>

    <!--pokemon sprite-->
    <div v-else-if="pokedexStore.pokeFound.sprites">
      <img :src="pokedexStore.pokeFound.sprites.front_default" :alt="pokedexStore.pokeFound.name" id="img-pokemon">
    </div>
  </div>

  <!--Catch the pokemon button-->
  <div class="btn btn-primary position-absolute catch-btn" v-if="pokedexStore.pokeFound && btnShow" @click="pokeSend()">Catch!</div>

  <!--Free the pokemon button-->
  <div class="btn btn-danger position-absolute catch-btn" v-if="pokedexStore.pokeFound && !btnShow" @click="pokeFree()">Free!</div>
</template>

<style scoped>
  #poke-show {
    width: 395px;
    height: 239px;
    margin-top: 7px;
  }

  #img-placeholder {
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  #img-pokemon {
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .catch-btn{
    right: 6px;
    top: 85%;
  }
</style>
