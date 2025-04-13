import { mapActions } from 'vuex';

export default {
    data() {
        return {
            temperature: null,
            weatherDescription: null,
            weatherIcon: null,
            formattedDate: null,
            formattedTime: null
        };
    },
    methods: {
        ...mapActions(['setLoader']),
        async fetchWeatherData(city, includeForecast = false) {
            this.setLoader(true);
            try {
                const geoResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
                );
                const geoData = await geoResponse.json();

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("City not found");
                }

                const { latitude, longitude } = geoData.results[0];

                let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

                if (includeForecast) {
                    weatherUrl += `&daily=temperature_2m_max,weathercode&timezone=auto`;
                }

                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                const current = weatherData.current_weather;
                this.temperature = current.temperature;
                this.weatherDescription = this.getWeatherDescription(current.weathercode);
                this.weatherIcon = this.getWeatherIcon(current.weathercode);

                if (current.time) {
                    const [date, time] = current.time.split("T");
                    this.formattedDate = date;
                    this.formattedTime = time;
                }

                return { weatherData, latitude, longitude };

            } catch (error) {
                this.weatherDescription = "Error loading data";
                console.error(error);
            } finally {
                this.setLoader(false);
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
            return descriptions[code] || "Unknown Weather";
        },
        getWeatherIcon(code) {
            const iconMap = {
                0: "01d", 1: "02d", 2: "03d", 3: "04d",
                45: "09d", 48: "10d", 51: "11d", 61: "13d",
                80: "50d", 95: "11d"
            };
            return `https://openweathermap.org/img/wn/${iconMap[code] || "01d"}.png`;
        }
    }
};