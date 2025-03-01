<template>
    <div>
        <input type="text" v-model="search" @input="searchData" placeholder="Search city" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: ''
        }
    }, 
    methods: {
        searchData() {
            this.$emit('search-city', this.search.toLowerCase());
        }
    }
}
</script>

<style scope>
    input {    
        width: 100%;
        padding: 10px;
        margin: 10px 0px;
        border-radius: 8px;
        border: 1px solid #c6b1b1;
    }
</style>