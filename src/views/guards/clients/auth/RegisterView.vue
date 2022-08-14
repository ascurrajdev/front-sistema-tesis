<script setup>
import {reactive} from 'vue'
import { useI18n } from 'vue-i18n';
import axios from 'axios'
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons-vue'
import {notification} from 'ant-design-vue'
const {t} = useI18n();
const formState = reactive({
    email:"",
    name:"",
    password:"",
    password_confirmation:"",
})
const onHandleRegisterFinish = (values) => {
    axios.post(`${import.meta.env.VITE_API_URL_CLIENT}/register`,values).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        notification['error']({
            message:'Error',
            description:error.response.data.message
        })
    });
}
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