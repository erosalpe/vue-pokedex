<script setup>
    import SearchBox from '../components/SearchBox.vue';
</script>






<template>
    <div id="main-dex" class="position-relative">
        <div id="left-section" class="position-absolute">
            
        </div>
        <div id="right-section-top" class="position-absolute p-1">
            <SearchBox/>
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
        top: 24px;
        left: 134px;
        width: 1048px;
        height: 784px;
    }

    #right-section-top{
        top: 58px;
        right: 163px;
        height: 291px;
        width: 402px;
        background-color: rgb(20, 20, 20);
    }



</style>