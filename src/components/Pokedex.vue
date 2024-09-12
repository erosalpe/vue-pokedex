<script setup>
    import SearchBox from '../components/SearchBox.vue';
    import pokemonStatsBox from '../components/pokemonStatsBox.vue';
</script>






<template>
    <div id="main-dex" class="position-relative">
        <div id="left-section" class="position-absolute">
            
        </div>
        <div id="right-section-top" class="position-absolute p-1">
            <SearchBox/>
        </div>
        <div id="right-section-bottom" class="position-absolute p-1">
            <pokemonStatsBox/>
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
        height: 433px;
        width: 402px;
        background-color: rgb(20, 20, 20);
        border-radius: 23px;
    }

</style>