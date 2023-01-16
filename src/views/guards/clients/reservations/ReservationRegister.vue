<script setup>
    import {ref} from 'vue'
    import axios from 'axios'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import {useReservationStore} from '@/stores/clients/reservation'
    import ReservationAvailablesDates from './ReservationAvailablesDates.vue'
    import ReservationQuantityPeople from './ReservationQuantiyPeople.vue'
    import ReservationGenerateInitialPayment from './ReservationGenerateInitialPayment.vue'
    import ReservationDetailsOfContact from './ReservationDetailsOfContact.vue'
    const authClient = useAuthClientStore()
    const current = ref(0)
    const reservationStore = useReservationStore()
    const onConfirm = () => {
        current.value++
    }
    axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations/config`,{
        headers:{
            'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
        }
    }).then(({data}) => {
        reservationStore.setFormData({config:data.data})
    })
</script>
<template>
    <div>
        <a-steps :current="current">
            <a-step title="Selecciona la cantidad de personas"></a-step>
            <a-step title="Selecciona las fechas"></a-step>
            <a-step title="Datos de Facturacion"></a-step>
        </a-steps>
        <div class="steps-content">
            <div v-if="current === 0">
                <ReservationQuantityPeople @confirm="onConfirm"/>
            </div>
            <div v-else-if="current === 1">
                <ReservationAvailablesDates @confirm="onConfirm"/>
            </div>
            <div v-else-if="current === 2">
                <ReservationDetailsOfContact @confirm="onConfirm"/>
            </div>
        </div>
        <div class="steps-action text-center mt-20">
            <h1 class="text-4xl text-green-700">Pago inicial: Gs {{reservationStore.getAmountInitialPayment}}</h1>
            <h1 class="text-xl">Total a pagar: Gs {{reservationStore.getAmountTotalProduct}}</h1>
        </div>
    </div>
</template>