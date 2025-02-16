<template>
    <div class="container">
        <div class="row justify-content-center text-ceter">
            <div class="col-4">
                <header-component></header-component>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                <weather-component city="adelaide"></weather-component>
                <weather-component city="sydney"></weather-component>
                <weather-component city="perth"></weather-component>
                <weather-component city="darwin"></weather-component>
                <weather-component city="brisbane"></weather-component>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4"> 
                <footer-component></footer-component>
            </div>
        </div>
    </div> 
</template>

<script>
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import FooterComponent from './components/layouts/FooterComponent.vue';
import WeatherComponent from './components/WeatherComponent.vue';

export default {
    components: {
        FooterComponent,
        HeaderComponent,
        WeatherComponent
    }
}
</script>

<style scoped></style>
