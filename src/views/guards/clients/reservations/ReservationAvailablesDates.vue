<script setup>
    import { ref, watch} from 'vue'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import {useReservationStore} from '@/stores/clients/reservation'
    import { useQuery } from 'vue-query'
    import { useI18n } from 'vue-i18n';
    import axios from 'axios'
    const {t} = useI18n()
    const authClient = useAuthClientStore()
    const keyFetch = "reservations:unavailables"
    const reservationStore = useReservationStore()
    const {data} = useQuery(keyFetch,() => axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations/availabilities`,{
            headers:{
                'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
            },
            params:{
                ...reservationStore.form
            }
    }))
    const disableDate = (current) => {
        return data.value.data.data.filter((value) => value.date == current.$d.toISOString().slice(0,10)).length > 0
    }
</script>
<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <a-col>
            <a-range-picker format="YYYY-MM-DD" :disabled-date="disableDate" :ranges="rangeDatesUnavailables"></a-range-picker>
        </a-col>
    </a-row>
</template>