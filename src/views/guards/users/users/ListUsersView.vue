<script setup>
import {useQuery} from '@tanstack/vue-query'
import apiUsers from '@/services/apiUsers'
import {useAuthUserStore} from '@/stores/users/authUser'
import {useRouter} from 'vue-router'
const authUserStore = useAuthUserStore()
const router = useRouter()
const getAllUsers = async () => {
    const {data} = await apiUsers.get('',{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const columns = [
    {
        title:'Id',
        dataIndex:'id'
    },
    {
        title:'Name',
        dataIndex:'name'
    },
    {
        title:'Email',
        dataIndex:'email'
    },
    {
        title:'Role',
        dataIndex:'role'
    },
    {
        title:'Operaciones',
        dataIndex:'operations'
    },

]
const {data} = useQuery({
    queryKey:['users_list'],
    queryFn: getAllUsers
})
const onEditUser = (record) => {
    router.push(`users/${record.id}`)
}
const onGoToCreate = () => {
    router.push('users/add')
}
</script>
<template>
    <a-page-header 
        title="Reporte de Usuarios"
    >
    <template #extra>
        <a-button type="primary" @click="onGoToCreate">+ Crear Usuario</a-button>
    </template>
    </a-page-header>
    <a-table :data-source="data?.data" :columns="columns">
        <template #bodyCell="{column, record}">
            <template v-if="column.dataIndex == 'role'">
                <a-tag color="green">{{ record?.role?.name ? record?.role?.name : 'N/D' }}</a-tag>
            </template>
            <template v-else-if="column.dataIndex == 'operations'">
                <a @click="onEditUser(record)">Editar</a>
            </template>
        </template>
    </a-table>
</template>