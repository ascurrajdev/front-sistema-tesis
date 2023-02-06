<script setup>
    import { ref, watch, defineEmits} from 'vue'
    import moment from 'moment'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    import {useReservationStore} from '@/stores/clients/reservation'
    import { useQuery } from 'vue-query'
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import axios from 'axios'
    const {t} = useI18n()
    const router = useRouter()
    router.push({query:{step:2}})
    const emits = defineEmits(['confirm'])
    const authClient = useAuthClientStore()
    const keyFetch = "reservations:unavailables"
    const reservationStore = useReservationStore()
    const datesRange = ref();
    const {data} = useQuery(keyFetch,() => axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations/availabilities`,{
            headers:{
                'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
            },
            params:{
                ...reservationStore.form
            }
    }))
    const disableDate = (current) => {
        if(current.$d < new Date()) return true;
        return data.value.data.data.filter((value) => value.date == current.$d.toISOString().slice(0,10)).length > 0
    }
    watch(datesRange, (ranges) => {
        let rangesMapped = ranges.map((date) => date.$d.toISOString().slice(0,10))
        let daysOfDiference = moment(rangesMapped[1]).diff(rangesMapped[0],'days')
        reservationStore.setFormData({
            dates:rangesMapped,
            quantity_days:daysOfDiference
        })
    })
    const onConfirm = () => {
        emits('confirm')
    }
</script>
<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <a-form>
            <a-form-item>
                <a-range-picker format="YYYY-MM-DD" v-model:value="datesRange" :disabled-date="disableDate"></a-range-picker>
            </a-form-item>
            <a-form-item>
                <a-button @click="onConfirm" type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-row>
</template>