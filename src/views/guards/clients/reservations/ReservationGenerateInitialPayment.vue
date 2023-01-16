<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <h1>Realice el pago inicial</h1>
    </a-row>
</template>
<script setup>
    import Echo from 'laravel-echo'
    import {useReservationStore} from '@/stores/clients/reservation'
    window.Pusher = require('pusher-js')
    const reservationStore = useReservationStore()
    let laravelEcho = new Echo({
        broadcaster:'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_PORT,
        wssPort: import.meta.env.VITE_PUSHER_PORT,
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
    })
    laravelEcho.private(`reservation.${reservationStore.form.data.id}`)
        .listen('PaymentOnlineSuccess', (e) => {
            console.log(e)
        })
</script>