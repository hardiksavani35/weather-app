<template>
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
export default {
    data() {
        return {
            city: this.$route.params.city,
            temperature: null, 
            windSpeed: null,
            weatherDescription: null,
            weatherIcon: null,
            forecast: []
        };
    },
    methods: {
        async fetchWeather() {
            try {
                const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.city}&count=1`);
                const geoData = await geoResponse.json();
                if (geoData.results) {
                    const { latitude, longitude } = geoData.results[0];

                    const weatherResponse = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,weathercode&timezone=auto`
                    );

                    const weatherData = await weatherResponse.json();
                    console.log(weatherData);
                    this.temperature = weatherData.current_weather.temperature; 
                    this.windSpeed = weatherData.current_weather.windspeed;
                    this.weatherDescription = this.getWeatherDescription(weatherData.current_weather.weathercode);
                    this.weatherIcon = this.getWeatherIcon(weatherData.current_weather.weathercode);

                    this.forecast = weatherData.daily.time.map((date, index) => ({
                        date,
                        temp: weatherData.daily.temperature_2m_max[index],
                        weatherCode: weatherData.daily.weathercode[index]
                    }));
                }
            } catch (error) { 
                this.weatherDescription = "Data unavailable";
            }
        },
        getWeatherDescription(code) {
            const descriptions = {
                0: "☀️ Clear Sky",
                1: "🌤️ Mainly Clear",
                2: "⛅ Partly Cloudy",
                3: "☁️ Overcast",
                45: "🌫️ Foggy",
                48: "🌁 Rime Fog",
                51: "🌧️ Light Drizzle",
                61: "🌦️ Rain",
                80: "🌧️ Rain Showers",
                95: "⛈️ Thunderstorms"
            };
            return descriptions[code] || "🌍 Weather Data";
        },
        getWeatherIcon(code) {
            const iconMap = {
                0: "01d", 1: "02d", 2: "03d", 3: "04d",
                45: "09d", 48: "10d", 51: "11d", 61: "13d",
                80: "50d", 95: "11d"
            };
            return `https://openweathermap.org/img/wn/${iconMap[code] || "01d"}@2x.png`;
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
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
