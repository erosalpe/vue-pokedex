<script setup>
import { usePokedexStore } from '../stores/pokedex.js';
import { Radar } from 'vue-chartjs';
import { computed } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement,
    Filler
);

const pokedexStore = usePokedexStore();

// Definisci le opzioni del grafico
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Nasconde la legenda
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                }
            }
        }
    },
    scales: {
        r: {
            angleLines: {
                display: true, // Nasconde le linee che collegano gli assi
                color: 'rgba(255, 255, 255, 1)' // Colore delle linee degli assi angolari
            },
            grid: {
                display: true, // Nasconde la griglia
                color: 'rgba(255, 255, 255, 0.2)', // Colore delle linee della griglia
            },
            ticks: {
                display: false, // Nasconde i numeri sui ticks
            },
            pointLabels: {
                display: true,
                callback: (value,index) => {
                    // Qui puoi personalizzare l'etichetta e aggiungere valori numerici
                    const labels = ['HP', 'Attack', 'Defense', 'Speed', 'Sp. Def', 'Sp. Atk'];
                    const values = [pokedexStore.pokeFound.stats[0].base_stat, pokedexStore.pokeFound.stats[1].base_stat, pokedexStore.pokeFound.stats[2].base_stat, pokedexStore.pokeFound.stats[5].base_stat, pokedexStore.pokeFound.stats[4].base_stat, pokedexStore.pokeFound.stats[3].base_stat]; // Aggiungi qui i tuoi valori
                    return `${labels[index]} ${values[index]}`;
                }, // Mostra le etichette sui punti
                color: 'rgba(255, 255, 255, 1)', // Colore delle etichette delle statistiche
                font: {
                    size: 14, // Modifica la dimensione del font se necessario
                },
            },
            suggestedMin: 0,
            suggestedMax: 100,
        }
    }
};

// Definisci i dati del grafico
const chartData = computed(() => {
    return {
        labels: ['HP', 'Attack', 'Defense', 'Speed', 'Sp. Def', 'Sp. Atk'],
        datasets: [
            {
                data: [
                    pokedexStore.pokeFound.stats[0].base_stat, 
                    pokedexStore.pokeFound.stats[1].base_stat, 
                    pokedexStore.pokeFound.stats[2].base_stat, 
                    pokedexStore.pokeFound.stats[5].base_stat, 
                    pokedexStore.pokeFound.stats[4].base_stat, 
                    pokedexStore.pokeFound.stats[3].base_stat,
                ], // statistiche del pokemon
                fill: 'origin', // Rende piena l'area descritta dalle linee
                backgroundColor: 'rgba(255, 215, 67, 0.2)', // Colore di riempimento
                borderColor: 'rgba(255, 215, 67, 1)', // Colore delle linee delle statistiche
                borderWidth: 4,
                drawBorder: true,
                pointRadius: 0, // Nasconde i cerchi sugli angoli
                
            }
        ]
    }
});

const chartId = 'pokemon-radar-chart'; // ID unico per il grafico
const width = 500; // Larghezza del grafico
const height = 500; // Altezza del grafico
</script>

<template>
    <div id="info-container">
        <div class="d-flex text-light justify-content-between px-5 text-capitalize">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <span>Name:</span>
                <span>{{pokedexStore.pokeFound.name}}</span>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <span>Type:</span>
                <div class="d-flex gap-2">
                    <span v-for="type in pokedexStore.pokeFound.types">{{type.type.name}}</span>
                </div>
            </div>
        </div>
        <Radar
            aria-label="Stats Chart"
            :options="chartOptions"
            :data="chartData"
            :id="chartId"
            :width="width"
            :height="height"
        />
    </div>
</template>

<style scoped>
#info-container {
    /*background-color: yellow;*/
    height: 100%;
    border-radius: 27px;
    padding: 10px;
}
</style>
