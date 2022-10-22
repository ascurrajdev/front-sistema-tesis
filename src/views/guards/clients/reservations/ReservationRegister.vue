<script setup>
import {ref} from 'vue'
import {useAuthClientStore} from '@/stores/clients/authClient'
import ReservationAvailablesDates from './ReservationAvailablesDates.vue'
const authClient = useAuthClientStore()
const current = ref(0)
</script>
<template>
    <div>
        <a-steps v-model:current="current">
            <a-step title="Selecciona las fechas"></a-step>
            <a-step title="Selecciona los servicios"></a-step>
            <a-step title="Anota tus datos para la reserva"></a-step>
            <a-step title="Completado"></a-step>
        </a-steps>
        <div class="steps-content">
            <div v-if="current === 0">
                <reservation-availables-dates />
            </div>
            <div v-else-if="current === 1">
                <h1>Que tal</h1>
            </div>
            <div v-else-if="current === 2">
                <h1>Estas</h1>
            </div>
            <div v-else-if="current === 3">
                <h1>Amigo</h1>
            </div>
        </div>
    </div>
</template>