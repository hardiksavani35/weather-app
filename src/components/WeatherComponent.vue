<template>
    <div>
        <weather-filter @search-city="filterCities"></weather-filter>
        <div v-for="city in filteredCities" :key="city"> 
            <weather-box :city="city"></weather-box>
        </div>
        <p v-if="filteredCities.length == 0">Search city not found.</p>
    </div>
</template>

<script>
import WeatherBox from './WeatherBox.vue';
import WeatherFilter from './WeatherFilter.vue';

export default {
    data() {
        return {
            searchQuery: "",
            cities: ["adelaide", "sydney", "melbourne", "brisbane", "perth"]
        }
    },
    components: {
        WeatherBox, 
        WeatherFilter
    },
    computed: {
        filteredCities() {
            if (!this.searchQuery) {
                return this.cities;  
            }
            return this.cities.filter(city => city.toLowerCase().includes(this.searchQuery));
        }
    },
    methods: {
        filterCities(query) {
            this.searchQuery = query;  
        }
    },
}
</script>