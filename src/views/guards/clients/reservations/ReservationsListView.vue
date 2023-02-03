<template>
    <div v-if="!data || data?.data.length <= 0">
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
    </div>
    <div v-else>
        <div class="fixed bottom-24 right-14 z-10">
            <a-button @click="goToRegisterReservation" shape="round" type="primary" size="large">
                <template #icon>
                    <plus-outlined />
                </template>
                Nueva Reservacion
            </a-button>
        </div>
        <a-list
            item-layout="vertical"
            :data-source="data.data"
        >
            <template #renderItem="{item}">
                <a-list-item>
                    <template #actions>
                        <a-button type="primary">Pagar</a-button>
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            Reservacion # {{ item.id }}
                        </template>
                    </a-list-item-meta>
                    <div>
                        <a-descriptions bordered layout="vertical">
                            <a-descriptions-item label="Desde">{{ item.date_from }}</a-descriptions-item>
                            <a-descriptions-item label="Hasta">{{ item.date_to }}</a-descriptions-item>
                            <a-descriptions-item label="Notas" :span="2">{{ item.notes }}</a-descriptions-item>
                            <a-descriptions-item label="Estado" >
                                <a-tag v-if="item.active == 1" color="success">
                                    <template #icon>
                                        <check-circle-outlined />
                                    </template>
                                    Activo
                                </a-tag>
                                <a-tag v-else color="warning">
                                    <template #icon>
                                        <exclamation-circle-outlined />
                                    </template>
                                    Inactivo
                                </a-tag>
                            </a-descriptions-item>
                            <a-descriptions-item label="Total a Pagar">{{formatCurrency(item.total_amount)}}</a-descriptions-item>
                        </a-descriptions>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script setup>
    import {ref, watch} from 'vue'
    import { useQuery } from 'vue-query'
    import {useRouter} from 'vue-router'
    import apiClients from "@/services/apiClients";
    import {CheckCircleOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons-vue'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    const authClient = useAuthClientStore()
    const getAllReservationsClient = async () => {
        const {data} = await apiClients.get(`reservations`,{
            headers:{
                'Authorization': `Bearer ${authClient.auth.credentials.plainTextToken}`
            }
        })
        return data
    }
    const formatCurrency = (price) => {
        let currencyFormat = new Intl.NumberFormat('de-DE',{
            currency:'PYG',
            style:'currency',
        })
        return currencyFormat.format(price)
    }
    const router = useRouter()
    const goToRegisterReservation = () => router.push('reservations/add')
    const {isLoading, isSuccess, isError, data} = useQuery("reservationsLists",getAllReservationsClient)
    const rangeDate = ref(null)
</script>