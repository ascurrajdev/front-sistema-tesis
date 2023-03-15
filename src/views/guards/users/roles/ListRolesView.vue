<script setup>
    import {reactive} from 'vue'
    import apiUsers from '@/services/apiUsers'
    import {useQuery} from '@tanstack/vue-query'
    import {useAuthUserStore} from '@/stores/users/authUser'
    import {useRouter} from 'vue-router'
    import { useI18n } from 'vue-i18n';
    const authUserStore = useAuthUserStore()
    const router = useRouter()
    const {t} = useI18n()
    const columns = reactive([
        {
            title:'Id',
            dataIndex:'id',
            // key:'id'
        },
        {
            title:'Name',
            dataIndex:'name',
            // key:'name'
        },
        {
            title:'Access',
            dataIndex:'access',
            // key:'abilities'
        },
        {
            title:'Actions',
            dataIndex:'actions',
            // key:'abilities'
        },
    ])
    const getRolesUsers = async () => {
        const {data} = await apiUsers.get('roles',{
            headers:{
                'Authorization': `Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        })
        return data
    }
    const {data} = useQuery({
        queryKey:['role_users'],
        queryFn:getRolesUsers
    })
    const onEditItem = (record) => {
        router.push(`roles/${record.id}`)
    }
</script>
<template>
    <a-table :data-source="data?.data" :columns="columns" bordered>
        <template #bodyCell="{column, text, record}">
            <template v-if="column.dataIndex == 'actions'">
                <a-button @click="onEditItem(record)" type="primary">Edit</a-button>
            </template>
            <template v-else-if="column.dataIndex == 'access'">
                <span v-if="record.abilities[0] == '*'">
                    {{t("full-access")}}
                </span>
                <span v-else>
                    {{t("restricted-access")}}
                </span>
            </template>
        </template>
    </a-table>
</template>