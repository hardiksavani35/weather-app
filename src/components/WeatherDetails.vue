<template>
    <loader-component :visible="$store.state.loader"></loader-component>
    <div class="weather-container">
        <h2 class="city-name">{{ city }}</h2> 

        <div class="weather-card">
            <div class="weather-main">
                <img :src="weatherIcon" :alt="weatherDescription" class="weather-icon" />
                <h1 class="temp">{{ temperature }}°C</h1>
            </div>
            <p class="weather-description">{{ weatherDescription }}  💨 Wind: <span>{{ windSpeed }} km/h</span></p>            
        </div>
  
        <div class="forecast-grid mt-3">
            <div v-for="day in forecast" :key="day.date" class="forecast-item">
                <p>{{ formatDate(day.date) }}</p>
                <img :src="getWeatherIcon(day.weatherCode)" class="forecast-icon" />
                <p class="temp-forecast">{{ day.temp }}°C</p>
                <p class="forecast-desc">{{ getWeatherDescription(day.weatherCode) }}</p>
            </div>
        </div>
    </div>
</template>

<script> 
import weatherMixin from '../mixins/weatherMixin.js';
import LoaderComponent from './layouts/LoaderComponent.vue';

export default {
    data() {
        return {
            city: this.$route.params.city,
            windSpeed: null,
            forecast: []
        };
    },
    mixins: [weatherMixin],
    components: { LoaderComponent},
    methods: { 
        async fetchWeather() {
            const { weatherData } = await this.fetchWeatherData(this.city, true);
            if (weatherData && weatherData.daily) {
                this.windSpeed = weatherData.current_weather.windspeed;
                this.forecast = weatherData.daily.time.map((date, index) => ({
                    date,
                    temp: weatherData.daily.temperature_2m_max[index],
                    weatherCode: weatherData.daily.weathercode[index]
                }));
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString(undefined, { weekday: 'short' });
        }
    },
    created() {
        this.fetchWeather();
    }
};
</script>

<style scoped>
h2.city-name { text-transform: capitalize; }
.weather-container { max-width: 500px; margin: auto; text-align: center; color: #fff; background: linear-gradient(135deg, #1e3c72 30%, #2a5298); padding: 20px; border-radius: 20px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); }
.city-name { font-size: 26px; font-weight: bold; margin-bottom: 10px; }
.weather-card { background: rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 15px; backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1); transition: transform 0.3s ease-in-out; }
.weather-card:hover { transform: scale(1.05); }
.weather-main { display: flex; justify-content: center; align-items: center; gap: 10px; }
.temp { font-size: 50px; font-weight: bold; }
.weather-icon { width: 80px; height: 80px; }
.weather-description { font-size: 18px; margin-top: 5px; }  
.forecast-title { margin-top: 20px; font-size: 20px; font-weight: bold; }
.forecast-grid { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.forecast-item { background: rgba(255, 255, 255, 0.15); padding: 5px; border-radius: 10px; width: 115px; text-align: center; transition: transform 0.2s ease-in-out; }
.forecast-item:hover { transform: translateY(-5px); }
.forecast-icon { width: 40px; height: 40px; }
.temp-forecast { font-size: 18px; font-weight: bold; } .forecast-desc { font-size: 14px; }
</style> 