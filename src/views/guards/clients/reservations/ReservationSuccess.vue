<template>
    <a-result
        status="success"
        title="El pago ha sido procesado correctamente"
    >
    <template #extra>
      <a-button @click="goToReservation" key="console" type="primary">Ir a la reservacion</a-button>
    </template>
  </a-result>
</template>
<script setup>
import { useRouter } from 'vue-router';
import {useReservationStore} from '@/stores/clients/reservation'
const router = useRouter()
const reservationStore = useReservationStore()
const goToReservation = () => {
  console.log(reservationStore.id)
  router.push(`/guards/clients/reservations/billing/${reservationStore.id}`)
}
</script>