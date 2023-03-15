<script setup>
    import {ref, watch, reactive} from 'vue'
    import {useRoute} from 'vue-router';
    import {useQuery} from '@tanstack/vue-query'
    import apiUsers from '@/services/apiUsers'
    import { useI18n } from 'vue-i18n';
    import { useAuthUserStore } from '@/stores/users/authUser';
    const route = useRoute()
    const {t} = useI18n()
    const form = reactive({
        name:"",
        abilities:[]
    })
    const allOptionsAbilities = ref([])
    const fullAccess = reactive({
        all:false,
        indeterminated: true
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
        form.name = value.data.name
        form.abilities = value.data.abilities
        if(value.data.abilities.includes('*')){
            fullAccess.all = true
            fullAccess.indeterminated = false
        }
        rolesAvailable.value = value.roles_available
        Object.values(value.roles_available).forEach(({children}) => {
            children.forEach(({value}) => {
                allOptionsAbilities.value = [
                    ...allOptionsAbilities.value,
                    value
                ]
            })
        })
    })
    watch(() => form.abilities, (value) => {
        fullAccess.all = allOptionsAbilities.value.length == value.length
        fullAccess.indeterminated = allOptionsAbilities.value.length != value.length
        if(value.includes('*')){
            form.abilities = ['*']
            fullAccess.all = true
            fullAccess.indeterminated = false
        }
    },{
        deep:true
    })
    const onPressCheckAll = (e) => {
        form.abilities = e.target.checked ? allOptionsAbilities.value : []
        fullAccess.indeterminated = false
    }
</script>
<template>
    <a-card title="Edit Role">
        <a-form layout="vertical" :model="form">
            <a-form-item label="Name" name="name">
                <a-input v-model:value="form.name"/>
            </a-form-item>
            <h2 class="text-lg">Permisos</h2>
            <a-form-item>
                <a-checkbox value="*" @change="onPressCheckAll" :indeterminate="fullAccess.indeterminated" v-model:checked="fullAccess.all" name="abilities">{{ t('full-access') }}</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox-group :disabled="fullAccess.all" v-model:value="form.abilities">
                    <template v-for="roles in rolesAvailable">
                        <h1>{{ roles.label }}</h1>
                        <template v-for="role in roles.children">
                            <a-checkbox :value="role.value">{{ role.label }}</a-checkbox>
                        </template>
                    </template>
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