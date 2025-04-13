
<template>
    <div>
        <loader-component :visible="$store.state.loader"></loader-component>
        <div @click="goToDetails()" class="weather-box">  
            <div class="d-flex justify-content-between">
                <h5>{{ city }}</h5>
                <p>{{ formattedDate }}</p> 
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <h3>{{ temperature }}°C</h3>
                <div class="d-flex align-items-center">
                    <!--img :src="weatherIcon" :alt="weatherDescription" class="weather-icon" -->
                    <span class="weather-description">{{ weatherDescription }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>  
import weatherMixin from '../mixins/weatherMixin.js';
import LoaderComponent from './layouts/LoaderComponent.vue';

export default {
    props: {
        city: String
    },
    mixins: [weatherMixin], 
    components: { LoaderComponent},
    methods: { 
        async fetchWeather() {
            await this.fetchWeatherData(this.city);
        },
        goToDetails() {
            this.$router.push({ name: 'weather-details', params: { city: this.city } });
        }
    },
    watch: {
        city: {
            handler(newCity) {
                if (newCity) {
                    this.fetchWeather();
                }
            },
            immediate: true
        }
    }
};
</script>

<style scoped>  
    .weather-box {  max-width: 500px; margin: auto; text-align: center; color: #fff; background: linear-gradient(135deg, #1e3c72 30%, #2a5298); padding: 20px; border-radius: 20px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); margin: 10px 0 } 
    .weather-box h3 { font-size: 3rem; font-weight: bold; } 
    .weather-box .date-time { font-size: 1.2rem; color: #6c757d; } 
    .weather-icon { width: 50px; height: 50px; } 
    .weather-description { font-size: 1.2rem; font-weight: bold; }
    .weather-box h5 { text-transform: capitalize }
</style>