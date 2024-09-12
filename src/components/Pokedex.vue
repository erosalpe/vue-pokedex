<script setup>
    import SearchBox from '../components/SearchBox.vue';
    import pokemonStatsBox from '../components/pokemonStatsBox.vue';
    import { usePokedexStore } from '../stores/pokedex.js';
    const pokedexStore = usePokedexStore();
    function dexPokeSet(data){
        console.log('dati:',data);
        console.log('pokefound:',pokedexStore.pokeFound);
        pokedexStore.pokeFoundAdd(data);
        console.log('pokefound:',pokedexStore.pokeFound);
    }
</script>






<template>
    <div id="main-dex" class="position-relative">
        <div id="left-section" class="position-absolute p-4 overflow-hidden overflow-y-scroll">
            <div class="d-flex flex-wrap overflow-auto">
                <div v-for="pokemon in pokedexStore.pokemonsArray" class="poke-card">
                    <div class="d-flex flex-column text-light text-capitalize justify-content-center align-items-center">
                        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="dex-pokemon" @click="dexPokeSet(pokemon)">
                        <span>{{ pokemon.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="right-section-top" class="position-absolute p-1">
            <SearchBox/>
        </div>
        <div id="right-section-bottom" class="position-absolute p-1">
            <pokemonStatsBox v-if="pokedexStore.pokeFound"/>
        </div>
    </div>
</template>


<style scoped>
    #main-dex{
        height: 100vh;
        width: 100vw;
        background-image: url(../../public/pokedex.webp);
        background-repeat: no-repeat;
        background-color: rgb(186, 255, 249);
        background-size: cover;
        background-position: center; 
        background-size: contain;
    }

    #left-section{
        background-color: rgb(20, 20, 20);
        top: 27px;
        left: 134px;
        width: 1045px;
        height: 779px;
    }

    #left-section::-webkit-scrollbar{
        display: none; /* Nasconde la scrollbar */
    }

    #right-section-top{
        top: 57px;
        right: 160px;
        height: 294px;
        width: 405px;
        background-color: rgb(20, 20, 20);
    }

    #right-section-bottom{
        bottom: 38px;
        right: 145px;
        height: 434px;
        width: 402px;
        background-color: rgb(20, 20, 20);
        border-radius: 24px;
    }

    .dex-pokemon{
        width: 150px;
        height: auto;
        cursor: pointer;
        transition: transform 0.5s ease;
    }

    .dex-pokemon:hover{
        transform: scale(1.1);
    }

    .poke-card{
        --gap: 0px;
        --columns: 6;
        flex-basis: calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)));
    }
</style>