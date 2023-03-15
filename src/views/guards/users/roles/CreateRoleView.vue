<script setup>
    import {ref, watch, reactive, onMounted} from 'vue'
    import {useRoute, useRouter} from 'vue-router';
    import {useQuery} from '@tanstack/vue-query'
    import apiUsers from '@/services/apiUsers'
    import { useI18n } from 'vue-i18n';
    import {notification} from 'ant-design-vue'
    import { useAuthUserStore } from '@/stores/users/authUser';
    const router = useRouter()
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
    const isSubmit = ref(false)
    const rolesAvailable = ref({})
    const authUserStore = useAuthUserStore()
    const getAbilitiesRoles = async () => {
        const {data} =  await apiUsers.get(`roles/abilities`,{
            headers:{
                'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        })
        return data
    }
    onMounted(() => {
        if(!!data.value){
            rolesAvailable.value = data.value.data
            Object.values(data.value.data).forEach(({children}) => {
                children.forEach(({value}) => {
                    allOptionsAbilities.value = [
                        ...allOptionsAbilities.value,
                        value
                    ]
                })
            })
        }
    })
    const {data} = useQuery({
        queryKey:['role_abilities'],
        queryFn: getAbilitiesRoles,
    })
    watch(data,(value) => {
        rolesAvailable.value = data.value.data
        Object.values(value.data).forEach(({children}) => {
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
    const goToBack = () => {
        router.go(-1)
    }
    const onSubmitForm = () => {
        let formData = form
        if(fullAccess.all){
            formData.abilities = ['*']
        }
        isSubmit.value = true
        apiUsers.post(`roles`,formData,{
            headers:{
                'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        }).then(() => {
            notification['success']({
                message:'El role fue guardado correctamente'
            })
        }).catch((err) => {
            notification['success']({
                message:'Hubo un error al guardar el role'
            })
        }).finally(() => {
            isSubmit.value = false
            router.replace('/guards/users/roles')
        })
    }
</script>
<template>
    <a-page-header title="Add Role" @back="goToBack"/>
    <a-card>
        <a-form @finish="onSubmitForm" layout="vertical" :model="form">
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
                    <a-button :loading="isSubmit" type="primary" html-type="submit">Guardar</a-button>
                    <a-button >Cancelar</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
</template>