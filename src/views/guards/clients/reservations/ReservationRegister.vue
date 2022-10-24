<script setup>
import {ref} from 'vue'
import {useAuthClientStore} from '@/stores/clients/authClient'
import {useReservationStore} from '@/stores/clients/reservation'
import ReservationAvailablesDates from './ReservationAvailablesDates.vue'
import ReservationQuantityPeople from './ReservationQuantiyPeople.vue'
const authClient = useAuthClientStore()
const current = ref(0)
const reservationStore = useReservationStore()
const onConfirm = () => {
    current.value++
}
</script>
<template>
    <div>
        <a-steps :current="current">
            <a-step title="Selecciona la cantidad de personas"></a-step>
            <a-step title="Selecciona las fechas"></a-step>
            <a-step title="Anota tus datos para la reserva"></a-step>
            <a-step title="Completado"></a-step>
        </a-steps>
        <div class="steps-content">
            <div v-if="current === 0">
                <ReservationQuantityPeople @confirm="onConfirm"/>
            </div>
            <div v-else-if="current === 1">
                <ReservationAvailablesDates @confirm="onConfirm"/>
            </div>
            <div v-else-if="current === 2">
                <h1>Que tal</h1>
            </div>
            <div v-else-if="current === 3">
                <h1>Estas</h1>
            </div>
        </div>
        <div class="steps-action text-center mt-20">
            <h1 class="text-4xl">Gs 0</h1>
        </div>
    </div>
</template>