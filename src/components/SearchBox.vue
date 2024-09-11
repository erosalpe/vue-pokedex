<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { usePokedexStore } from '../stores/pokedex.js';

const pokeName = ref(''); 
const pokeFound = ref(null);
const pokedexStore = usePokedexStore();
const btnShow = ref(false); 

function isntCatched(poke) {
  if (!pokedexStore.pokemonsArray.some(element => element.name === poke.name)) {
    btnShow.value = true;
  }
}


function PokeSearch(){
  pokeFound.value = null;
  if (!pokeName.value.trim()) {
    console.warn('Inserisci un nome valido per il Pokémon');
    return;
  }

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`)
    .then(response => {
      pokeFound.value = response.data;
      console.log(response.data);
      isntCatched(pokeFound);
      console.log(btnShow.value);
    })
    .catch(error => {
      console.error('Errore nella richiesta:', error);
    });

  pokeName.value = '';
}

function pokeSend(){
  pokedexStore.pokemonCatch(pokeFound.value);
  console.log(pokedexStore.pokemonsArray)
  btnShow.value = false;
}

function pokeFree(){
  pokedexStore.removePokemon(pokeFound.value);
  console.log(pokedexStore.pokemonsArray)
  btnShow.value = true;
}

</script>

<template>
  <form class="d-flex" role="search" @submit.prevent="PokeSearch">
    <input class="form-control me-2" type="search" aria-label="Search" placeholder="Cerca un Pokémon" v-model="pokeName">
    <button class="btn btn-secondary" type="submit">Search</button>
  </form>

  <div id="poke-show" class="position-relative">
    <div v-if="!pokeFound">
      <img src="../../public/pokeball.png" alt="pokeball" id="img-placeholder" class="position-absolute">
    </div>

    <div v-else-if="pokeFound.sprites">
      <img :src="pokeFound.sprites.front_default" :alt="pokeFound.name" id="img-pokemon">
    </div>
  </div>
  <div class="btn btn-primary position-absolute catch-btn" v-if="pokeFound && btnShow" @click="pokeSend()">Catch!</div>
  <div class="btn btn-danger position-absolute catch-btn" v-if="pokeFound && !btnShow" @click="pokeFree()">Free!</div>
</template>

<style scoped>
  #poke-show {
    background-color: yellow;
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
