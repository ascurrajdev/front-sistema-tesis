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
        title:"Nombre",
        dataIndex:"name",
    },
    {
        title:"Activo",
        dataIndex:"active",
    },
    {
        title:"Activo para Reservaciones",
        dataIndex:"active_for_reservations_online",
    },
    {
        title:"Acciones",
        dataIndex:"actions"
    }
]
const getAllAgencies = async () => {
    const {data} = await apiUsers.get('agencies',{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const {data} = useQuery({
    queryKey:[],
    queryFn:getAllAgencies
})
</script>
<template>
    <a-page-header 
        title="Listado de Sucursales"
    >
        <template #extra>
            <a-button @click="onGoToAddCurrency" type="primary">+ Nueva Sucursal</a-button>
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