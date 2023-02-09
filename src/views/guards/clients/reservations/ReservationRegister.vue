<script setup>
    import {computed} from 'vue'
    import axios from 'axios'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import {useReservationStore} from '@/stores/clients/reservation'
    import ReservationAvailablesDates from './ReservationAvailablesDates.vue'
    import ReservationQuantityPeople from './ReservationQuantiyPeople.vue'
    import ReservationDetailsOfContact from './ReservationDetailsOfContact.vue'
    import ReservationSuccess from './ReservationSuccess.vue'
    import { useRoute, useRouter } from 'vue-router'
    const authClient = useAuthClientStore()
    const router = useRouter();
    const reservationStore = useReservationStore()
    const onConfirm = () => {
        router.push({query:{step: parseInt(route.query.step) + 1}})
    }
    const route = useRoute()
    axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations/config`,{
        headers:{
            'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
        }
    }).then(({data}) => {
        reservationStore.setFormData({config:data.data})
    })
    const currentStep = computed(() => {
        return parseInt(route.query?.step) - 1 || 0
    })
</script>
<template>
    <div>
        <a-steps :current="currentStep">
            <a-step title="Selecciona la cantidad de personas"></a-step>
            <a-step title="Selecciona las fechas"></a-step>
            <a-step title="Datos de Facturacion"></a-step>
            <a-step title="Completado"></a-step>
        </a-steps>
        <div class="steps-content">
            <div v-if="currentStep === 0">
                <ReservationQuantityPeople @confirm="onConfirm"/>
            </div>
            <div v-else-if="currentStep === 1">
                <ReservationAvailablesDates @confirm="onConfirm"/>
            </div>
            <div v-else-if="currentStep === 2">
                <ReservationDetailsOfContact @confirm="onConfirm"/>
            </div>
            <div v-else-if="currentStep === 3">
                <ReservationSuccess/>
            </div>
        </div>
        <div class="steps-action text-center mt-20" v-if="currentStep != 3">
            <h1 class="text-4xl text-green-700">Pago inicial: Gs {{reservationStore.getAmountInitialPayment}}</h1>
            <h1 class="text-xl">Total a pagar: Gs {{reservationStore.getAmountTotalProduct}}</h1>
        </div>
    </div>
</template>