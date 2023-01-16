<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <h1>Realice el pago inicial</h1>
    </a-row>
</template>
<script setup>
    import axios from 'axios'
    import Echo from 'laravel-echo'
    window.Pusher = require('pusher-js')
    let laravelEcho = new Echo({
        broadcaster:'pusher',
    })
</script>