<script setup>
import { reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiUsers from '@/services/apiUsers'
import {useQuery} from '@tanstack/vue-query'
import { useAuthUserStore } from '@/stores/users/authUser';
const router = useRouter()
const route = useRoute()
const authUserStore = useAuthUserStore()
const onBackHeader = () => {
    router.back()
}
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
const getUserData = async () => {
    const {data} = await apiUsers.get(`${route.params.id}`,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data
}
const {data:userData} = useQuery({
    queryKey:['users',route.params.id],
    queryFn:getUserData
})
const form = reactive({
    name:'',
    email:'',
    role_id:'',
    password:'',
    password_confirmation:''
})
onMounted(() => {
    if(!!userData.value){
        Object.assign(form,{
            ...userData.value.data
        })
    }
})
watch(userData,(value) => {
    if(!!value){
        Object.assign(form,{
            ...value.data
        })
    }
})
</script>
<template>
    <a-page-header title="Edit User" @back="onBackHeader"/>
    <a-card>
        <a-form layout="vertical" :model="form" autocomplete="off">
            <a-form-item name="name" label="Name">
                <a-input v-model:value="form.name"/>
            </a-form-item>
            <a-form-item name="email" label="Email">
                <a-input type="email" v-model:value="form.email"/>
            </a-form-item>
            <a-form-item name="password" label="Password">
                <a-input type="password" v-model:value="form.password"/>
            </a-form-item>
            <a-form-item name="password_confirmation" label="Password Confirmed">
                <a-input type="password" v-model:value="form.password_confirmation"/>
            </a-form-item>
            <a-form-item name="role_id" label="Role">
                <a-select v-model:value="form.role_id">
                    <a-select-option value="" disabled>N/A</a-select-option>
                    <a-select-option v-for="role in data?.data" :value="role.id">{{ role.name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>