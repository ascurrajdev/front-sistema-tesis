<script setup>
import apiUsers from '@/services/apiUsers'
import { useQuery } from '@tanstack/vue-query';
import { useAuthUserStore } from '@/stores/users/authUser';
const onGoToAddCurrency = () => {

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
        title:"Monto Total",
        dataIndex:'total_amount'
    },
    {
        title:"Creado",
        dataIndex:'created_at'
    },
    {
        title:"Acciones",
        dataIndex:"actions"
    }
]
const getAllCollections = async () => {
    const {data} = await apiUsers.get('collections',{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const {data} = useQuery({
    queryKey:['collections'],
    queryFn:getAllCollections
})
</script>
<template>
    <a-page-header 
        title="Listado de Pagos"
    >
        <template #extra>
            <a-button @click="onGoToAddCurrency" type="primary">+ Nuevo Pago</a-button>
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