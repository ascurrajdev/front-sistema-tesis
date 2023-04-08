<script setup>
import apiUsers from '@/services/apiUsers'
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useAuthUserStore } from '@/stores/users/authUser';
const router = useRouter()
const onGoToAddCurrency = () => {
    router.push('currencies/add')
}
const onEditItem = (record) => {
    router.push(`currencies/${record.id}/edit`)
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
        title:"Formato",
        dataIndex:"currency_format",
    },
    {
        title:"Decimales",
        dataIndex:"decimals"
    },
    {
        title:"Acciones",
        dataIndex:"actions"
    }
]
const getAllCurrencies = async () => {
    const {data} = await apiUsers.get('currencies',{
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
        title="Listado de Monedas"
    >
        <template #extra>
            <a-button @click="onGoToAddCurrency" type="primary">+ Nueva Moneda</a-button>
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