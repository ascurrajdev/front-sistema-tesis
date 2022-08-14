<script setup>
    import {MailOutlined,LockOutlined} from '@ant-design/icons-vue'
    import {reactive} from 'vue'
    import { useI18n } from 'vue-i18n';
    const {t} = useI18n()
    const formState = reactive({
        email:"",
        password:"",
        remember:false,
    })
</script>
<template>
<a-row type="flex" class="items-center justify-center">
    <a-col :md="12" :sm="24" :xs="24">
        <a-card>
            <a-form
                :model="formState"
                layout="vertical"
            >
                <h1 class="text-xl text-center">{{t("login")}}</h1>
                <a-form-item
                    :label="t('labels.email')"
                    name="email"
                    :rules="[{type:'email',required:true, message:t('validations.required',{field:t('labels.email')})}]"
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
                <div class="flex justify-between">
                    <a-form-item name="remember">
                        <a-checkbox v-model:checked="formState.remember">{{t('remember.me')}}</a-checkbox>
                    </a-form-item>
                    <a>{{t("forgot.password")}}</a>
                </div>
                    <a-form-item>
                        <div class="flex flex-col gap-5 items-center justify-center">
                            <a-button class="w-full" type="primary" html-type="submit">{{t('login')}}</a-button>
                            <div>
                            {{t("or")}}
                            <router-link to="/guards/users/auth/register">{{t('register.now')}}</router-link>
                            </div>
                        </div>
                    </a-form-item>
            </a-form>
        </a-card>
    </a-col>
</a-row>
</template>
