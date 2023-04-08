<script setup>
import apiUsers from '@/services/apiUsers'
import { useQuery } from '@tanstack/vue-query';
import { useAuthUserStore } from '@/stores/users/authUser';
import { useRouter } from 'vue-router';
const router = useRouter()
const onGoToAddCurrency = () => {
    router.push('payments/add')
}
const onEditItem = (record) => {

}
const authUserStore = useAuthUserStore()
const columns = [
    {
        title:"Id",
        dataIndex:"id"
    },
    {
        title:"Nombre",
        dataIndex:"name",
    },
    {
        title:"Tarjeta",
        dataIndex:"is_card",
    },
    {
        title:"Efectivo",
        dataIndex:"is_cash"
    },
    {
        title:"Transferencia",
        dataIndex:"is_transfer_bank"
    },
    {
        title:"Transaccion Online",
        dataIndex:"is_online_transaction"
    },
    {
        title:"Acciones",
        dataIndex:"actions"
    }
]
const getAllCurrencies = async () => {
    const {data} = await apiUsers.get('payments',{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const {data} = useQuery({
    queryKey:[],
    queryFn:getAllCurrencies
})
</script>
<template>
    <a-page-header 
        title="Listado de Formas de Pago"
    >
        <template #extra>
            <a-button @click="onGoToAddCurrency" type="primary">+ Nueva Forma de Pago</a-button>
        </template>
    </a-page-header>
    <a-table :data-source="data?.data" :columns="columns" bordered>
        <template #bodyCell="{column, text, record}">
            <template v-if="column.dataIndex == 'actions'">
                <a @click="onEditItem(record)" type="primary">Edit</a>
            </template>
        </template>
    </a-table>
</template>