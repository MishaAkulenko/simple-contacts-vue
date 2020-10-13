<template>
    <section class="flex-center container">
        <b>404</b>
        <b class="error-message">{{$route.params.errorMessage}}</b>
    </section>
</template>

<script>
    export default {
        name: "NotFoundPage"
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 10%;
        font-size: 150px;
        flex-direction: column;
        .error-message {
            font-size: 40px;
            @media (max-width: 768px) {
                font-size: 18px;
            }
        }
    }
</style>
