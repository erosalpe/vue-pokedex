<script setup>
import { usePokedexStore } from '../stores/pokedex.js';
import { Radar } from 'vue-chartjs';
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
                color: 'rgba(255, 255, 255, 1)' // Colore delle linee della griglia
            },
            ticks: {
                display: false, // Nasconde i numeri sui ticks
                backdropColor: 'rgba(255, 255, 255, 0)' // Colore delle etichette dei tick
            },
            pointLabels: {
                display: true, // Mostra le etichette sui punti
                color: 'rgba(255, 255, 255, 1)', // Colore delle etichette delle statistiche
                font: {
                    size: 12, // Modifica la dimensione del font se necessario
                }
            },
            suggestedMin: 0,
            suggestedMax: 100,
        }
    }
};

// Definisci i dati del grafico
const chartData = {
    labels: ['Speed', 'Attack', 'Defense', 'HP', 'Special Attack', 'Special Defense'],
    datasets: [
        {
            data: [70, 50, 60, 80, 90, 70], // statistiche del pokemon
            fill: 'origin', // Rende piena l'area descritta dalle linee
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Colore di riempimento
            borderColor: 'rgba(255, 255, 255, 1)', // Colore delle linee delle statistiche
            borderWidth: 2,
            pointRadius: 0, // Nasconde i cerchi sugli angoli
            
        }
    ]
};

const chartId = 'pokemon-radar-chart'; // ID unico per il grafico
const width = 600; // Larghezza del grafico
const height = 600; // Altezza del grafico
</script>

<template>
    <div id="info-container">
        <span>Nome</span>
        <span>Type</span>
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
}
</style>
