<script setup>
    import {ref, watch} from 'vue'
    import {useRoute} from 'vue-router';
    import {useQuery} from '@tanstack/vue-query'
    import apiUsers from '@/services/apiUsers'
    import { useAuthUserStore } from '@/stores/users/authUser';
    const route = useRoute()
    const form = ref({
        name:"",
        abilities:[]
    })
    const rolesAvailable = ref({})
    const authUserStore = useAuthUserStore()
    const getRoleUser = async () => {
        const {data} =  await apiUsers.get(`roles/${route.params.id}`,{
            headers:{
                'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        })
        return data
    }
    const {data} = useQuery({
        queryKey:['role_users', route.params.id],
        queryFn: getRoleUser,
    })
    watch(data,(value) => {
        form.value = value.data
        rolesAvailable.value = value.roles_available
    })
</script>
<template>
    <a-card title="Edit Role">
        <a-form layout="vertical" :model="form">
            <a-form-item label="Name" name="name">
                <a-input v-model:value="form.name"/>
            </a-form-item>
            <h2 class="text-lg">Permisos</h2>
            <a-form-item :label="roles.label" v-for="roles in rolesAvailable">
                <a-checkbox-group v-for="rol in roles.children" v-model="form.abilities">
                    <a-checkbox :value="rol.value" name="abilities">{{rol.label}}</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit">Guardar</a-button>
                    <a-button >Cancelar</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
</template>