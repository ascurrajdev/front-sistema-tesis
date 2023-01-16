<template>
    <a-row>
        <a-col :span="24">
            <a-empty>
                <template #description>
                    No tienes reservaciones
                </template>
                <a-button @click="goToRegisterReservation" type="primary">Cotiza una Reservacion</a-button>
            </a-empty>
        </a-col>
    </a-row>
</template>
<script>
    import {ref, watch} from 'vue'
    import axios from 'axios'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import { useQuery } from 'vue-query'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    const authClient = useAuthClientStore()
    const promiseReservations = axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations`,{
        headers:{
            'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
        }
    })
    const goToRegisterReservation = () => router.push('reservations/add')
    const {isLoading, isSuccess, isError} = useQuery("reservationsLists",promiseReservations)
    const rangeDate = ref(null)
    watch(rangeDate,(value) => {
        value.forEach(element => {
            console.log(element.$d)  
        });
    })
</script>