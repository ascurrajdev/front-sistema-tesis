<template>
    <a-row>
        <a-col :span="24">
            <a-result 
                status="info"
                title="No tienes reservaciones"
                sub-title="No tienes ninguna reservacion registrada, hasta el momento"
            >
                <template #extra>
                    <a-button type="primary">Cotiza una Reservacion</a-button>
                </template>
            </a-result>
        </a-col>
    </a-row>
</template>
<script setup>
    import {ref, watch} from 'vue'
    import axios from 'axios'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import { useQuery } from 'vue-query'
    const authClient = useAuthClientStore()
    const promiseReservations = axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations`,{
        headers:{
            'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
        }
    })
    const {isLoading, isSuccess, isError} = useQuery("reservationsLists",promiseReservations)
    const rangeDate = ref(null)
    watch(rangeDate,(value) => {
        value.forEach(element => {
            console.log(element.$d)  
        });
    })
</script>