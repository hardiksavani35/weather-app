<template>
    <div class="container">
        <div class="row justify-content-center text-ceter">
            <div class="col-4">
                <header-component></header-component>
            </div>
        </div>
        <div class="row justify-content-center mt-2">
            <div class="col-4">
                <router-view></router-view>
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

export default {
    components: {
        FooterComponent,
        HeaderComponent, 
    }
}
</script>

<style scoped></style>
