
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
                    <img :src="weatherIcon" :alt="weatherDescription" class="weather-icon">
                    <span class="weather-description">{{ weatherDescription }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
import { mapActions } from 'vuex';
import LoaderComponent from './layouts/LoaderComponent.vue';

export default {
    props: {
        city: String
    },
    data() {
        return { 
            temperature: null,
            weatherDescription: null,
            weatherIcon: null,
            formattedDate: null,
            formattedTime: null
        };
    },
    components: { LoaderComponent},
    methods: {
        ...mapActions(['setLoader']),
        async fetchWeather() {
            this.setLoader(true);
            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${this.city}&count=1`
                );
                const geoData = await response.json();

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("City not found");
                }

                const { latitude, longitude } = geoData.results[0];

                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );
                const weatherData = await weatherResponse.json(); 
                
                this.temperature = weatherData.current_weather.temperature;
                this.weatherDescription = this.getWeatherDescription(weatherData.current_weather.weathercode);
                this.weatherIcon = this.getWeatherIcon(weatherData.current_weather.weathercode);
                let [date, time] = weatherData.current_weather.time.split("T");
                this.formattedDate = date;
                this.formattedTime = time;  
                this.setLoader(false);
            } catch (error) { 
                this.weatherDescription = "Error loading data";
                this.setLoader(false);
            }
        },
        getWeatherDescription(code) {
            //https://openweathermap.org/weather-conditions#Icon-list
            const descriptions = {
                0: "Clear Sky",
                1: "Mainly Clear",
                2: "Partly Cloudy",
                3: "Overcast",
                45: "Foggy",
                48: "Rime Fog",
                51: "Drizzle",
                61: "Rain",
                80: "Rain Showers",
                95: "Thunderstorms"
            };
            return descriptions[code] || "Unknown Weather";
        },
        getWeatherIcon(code) {
            const iconMap = {
                0: "01d", 1: "02d", 2: "03d", 3: "04d",
                45: "09d", 48: "10d", 51: "11d", 61: "13d",
                80: "50d", 95: "11d"
            };
            return `https://openweathermap.org/img/wn/${iconMap[code] || "01d"}.png`;
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