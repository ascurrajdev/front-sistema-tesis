<script setup>
import { reactive, onMounted, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiUsers from '@/services/apiUsers'
import { notification } from 'ant-design-vue';
import {useQuery} from '@tanstack/vue-query'
import { useAuthUserStore } from '@/stores/users/authUser';
const router = useRouter()
const route = useRoute()
const authUserStore = useAuthUserStore()
const onBackHeader = () => {
    router.back()
}
const isSubmit = ref(false)
const getAllRoles = async () => {
    const {data} = await apiUsers.get('roles',{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const {data} = useQuery({
    queryKey:['role_users'],
    queryFn:getAllRoles
})

const form = reactive({
    name:'',
    email:'',
    role_id:'',
    password:'',
})

const onSubmit = () => {
    isSubmit.value = true
    apiUsers.post("",form,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        notification['success']({
            message:'El usuario se ha guardado correctamente'
        })
        router.push('/guards/users/users')
    }).catch(() => {
        notification['error']({
            message:'Hubo un error al guardar el usuario'
        })
    }).finally(() => {
        isSubmit.value = false
    })
}
</script>
<template>
    <a-page-header title="Create User" @back="onBackHeader"/>
    <a-card>
        <a-form @finish="onSubmit" layout="vertical" :model="form" autocomplete="off">
            <a-form-item name="name" label="Name">
                <a-input v-model:value="form.name"/>
            </a-form-item>
            <a-form-item name="email" label="Email">
                <a-input type="email" v-model:value="form.email"/>
            </a-form-item>
            <a-form-item name="password" label="Password">
                <a-input type="password" v-model:value="form.password"/>
            </a-form-item>
            <a-form-item name="role_id" label="Role">
                <a-select v-model:value="form.role_id">
                    <a-select-option :value="null" disabled>N/A</a-select-option>
                    <a-select-option v-for="role in data?.data" :value="role.id">{{ role.name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" :loading="isSubmit" html-type="submit">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>