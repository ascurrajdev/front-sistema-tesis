<script setup>
import {reactive, ref, watch} from 'vue'
import { useI18n } from 'vue-i18n';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons-vue'
import {notification} from 'ant-design-vue'
import {useRouter} from 'vue-router'
import {useAuthClientStore} from '@/stores/clients/authClient'
const {t} = useI18n();
const formState = reactive({
    email:"",
    name:"",
    password:"",
    phone_number:"",
    password_confirmation:"",
})
const router = useRouter()
const phoneNumber = ref(null)
const authClient = useAuthClientStore()
const onHandleRegisterFinish = async (values) => {
    try{
        await authClient.registerClient(values)
        router.replace("/guards/clients/home")
    }catch(err){
        notification['error']({
            message:'Error',
            description:error.response.data.message
        })
    }
}
watch(phoneNumber,(value) => {
    formState.phone_number = value;
})
</script>
<template>
<a-row type="flex" class="items-center justify-center">
    <a-col :md="12" :sm="24" :xs="24">
        <a-card>
            <a-form
                :model="formState"
                layout="vertical"
                @finish="onHandleRegisterFinish"
            >
                <h1 class="text-xl text-center">{{t("register.default")}}</h1>
                <a-form-item
                    :label="t('labels.name')"
                    name="name"
                    :rules="[{required:true, message:t('validations.required',{field:t('labels.name')})}]"
                >
                    <a-input v-model:value="formState.name">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    :label="t('labels.email')"
                    name="email"
                    :rules="[{required:true, message:t('validations.required',{field:t('labels.email')})}]"
                >
                    <a-input type="email" v-model:value="formState.email">
                        <template #prefix>
                            <MailOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    :label="t('labels.phone_number')"
                    name="phone_number"
                    :rules="[{required:true, message:t('validations.required',{field:t('labels.phone_number')})}]"
                >
                    <vue-tel-input v-model="phoneNumber"></vue-tel-input>
                </a-form-item>
                <a-form-item
                    :label="t('labels.password')"
                    name="password"
                    :rules="[{required:true, message:t('validations.required',{field:t('labels.password')})}]"
                >
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item
                    :label="t('labels.password-confirmation')"
                    name="password_confirmation"
                    :rules="[{required:true, message:t('validations.required',{field:t('labels.password-confirmation')})}]"
                >
                    <a-input-password v-model:value="formState.password_confirmation">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <div class="flex flex-col gap-5 items-center justify-center">
                        <a-button class="w-full" type="primary" html-type="submit">{{t('submit')}}</a-button>
                        <div>
                        {{t("or")}}
                        <router-link to="/guards/clients/auth/login">{{t('login')}}</router-link>
                        </div>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </a-col>
</a-row>
</template>