<template>
    <div> 
        <div v-for="city in cities" :key="city"> 
            <weather-box :city="city"></weather-box>
        </div>
    </div>
</template>

<script>
import WeatherBox from './WeatherBox.vue';

export default {
    data() {
        return {
            cities: ["adelaide", "sydney", "melbourne", "brisbane", "perth"]
        }
    },
    components: {WeatherBox}
}
</script>