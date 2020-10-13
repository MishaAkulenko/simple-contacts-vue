<template>
    <header class="container">
        <router-link to="/" class="flex">
            <span class="material-icons">arrow_back_ios</span> <span>На главную</span>
        </router-link>
    </header>

</template>

<script>
    export default {
        name: "TheHeader"
    }
</script>

<style scoped>
    .container {
        padding: 10px 5px 0;
    }
   a {
       align-items: center;
   }
</style>
