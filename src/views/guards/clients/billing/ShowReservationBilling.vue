<template>
    <div>
        <a-page-header
            title="Estado de Cuenta"
            @back="onBackHeader"
        />
        <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="general" tab="Descripcion General">
                General
            </a-tab-pane>
            <a-tab-pane key="details" tab="Descripcion detallada de pagos">
                <a-table :data-source="billingData.data" :columns="columnsTableDetailsPayments" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
    import { ref,watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useQuery } from '@tanstack/vue-query';
    import apiClients from "@/services/apiClients";
    import {useAuthClientStore} from '@/stores/clients/authClient'
    const authClient = useAuthClientStore()
    const router = useRouter()
    const route = useRoute()
    const activeTab = ref('general')
    const onBackHeader = () => {
        router.back()
    }
    const getAllBillingOfReservation = async() => {
        const {data} = await apiClients.get(`reservations/${route.params.id}/billing`,{
            headers:{
                'Authorization':`Bearer ${authClient.auth.credentials.plainTextToken}`
            }    
        })
        return data;
    }
    const {isLoading, data:billingData, refetch} = useQuery({queryKey:["reservationBilling",route.params.id],queryFn:getAllBillingOfReservation})
    watch(billingData,(value) =>{
        console.log(value)
    })
    const columnsTableDetailsPayments = [
        {
            title:'Id',
            key:'id',
            dataIndex:'id'
        },
        {
            title:'Fecha',
            key:'created_at',
            dataIndex:'created_at'
        },
        {
            title:'Monto',
            key:'total_amount_paid',
            dataIndex:'total_amount_paid'
        }
    ]
</script>