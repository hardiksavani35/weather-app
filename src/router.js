import { createWebHistory, createRouter } from 'vue-router'

import WeatherComponent from './components/WeatherComponent.vue';
import WeatherDetails from './components/WeatherDetails.vue';

const routes = [
    { path: '/', name: "weather", component: WeatherComponent }, 
    { path: "/weather/:city", name: "weather-details", component: WeatherDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;