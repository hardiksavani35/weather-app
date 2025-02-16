
<template>
    <div>
        <div class="weather-box"> 
            <div class="d-flex justify-content-between">
                <h5>Monday, February 16, 2025</h5>
                <p>2:30 PM</p> 
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <h3>25°C</h3>
                <div class="d-flex align-items-center">
                <img src="https://openweathermap.org/img/wn/01d.png" alt="Clear Sky" class="weather-icon">
                <span class="weather-description">Clear Sky</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    props: {
        city: String
    }
}
</script>

<style scoped>  
    .weather-box { background-color: #f8f9fa; padding: 20px; margin:10px 0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center; } 
    .weather-box h3 { font-size: 3rem; font-weight: bold; } 
    .weather-box .date-time { font-size: 1.2rem; color: #6c757d; } 
    .weather-icon { width: 50px; height: 50px; } 
    .weather-description { font-size: 1.2rem; font-weight: bold; }
</style>