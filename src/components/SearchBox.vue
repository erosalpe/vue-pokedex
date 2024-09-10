<script setup>
import axios from 'axios';
import { ref } from 'vue';

const pokeName = ref(''); 
const pokeFound =ref(null);

function PokeSearch(){
  pokeFound.value = '';
    if (!pokeName.value.trim()) {
        pokeName.value = '';
        console.warn('Inserisci un nome valido per il Pokémon');
        return;
    }
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName.value}`)
  .then(response => {
    pokeFound.value = response.data;
    console.log(response.data); 
    console.log(pokeFound.value.sprites.front_default);
  })
  .catch(error => {
    console.error('Errore nella richiesta:', error);
  });
  pokeName.value = '';
}
</script>






<template>
<form class="d-flex" role="search" @submit.prevent="PokeSearch(pokeName.value)">
    <input class="form-control me-2" type="search" aria-label="Search" placeholder="Cerca un Pokémon" v-model="pokeName">
    <button class="btn btn-secondary" type="submit">Search</button>
</form>

<div id="poke-show" class="position-relative">
  <img v-if="!pokeFound.value" src="../../public/pokeball.png" alt="pokeball" id="img-placeholder" class="position-absolute">
  <img v-else :src="pokeFound.value.sprites.front_default" :alt="pokeFound.value.name">
</div>

  


</template>








<style scoped>
  #poke-show{
    background-color: yellow;
    width: 395px;
    height: 239px;
    margin-top: 7px;
  }

  #img-placeholder{
    width: 50%;
    left: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>