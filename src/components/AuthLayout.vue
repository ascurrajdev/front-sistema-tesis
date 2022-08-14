<script setup>
    import {TranslationOutlined,HomeOutlined,UserOutlined, CalendarOutlined} from '@ant-design/icons-vue'
    import {ref, watch} from 'vue'
    import { useI18n } from 'vue-i18n';
    import i18n from '@/translations/i18n';
    import {useRouter} from 'vue-router'
    import {useAuthClientStore} from '@/stores/clients/authClient'
    const useAuthClient = useAuthClientStore()
    const {t,locale} = useI18n({useScope:"global"})
    const current = ref([locale])
    const router = useRouter()
    watch(current,(newLanguage) => {
        if(i18n.global.availableLocales.includes(newLanguage[0])){
            locale.value = newLanguage[0]
        }else{
            router.push(newLanguage[0])
        }
    })
</script>
<template>
    <a-layout class="flex h-screen">
        <a-layout-header>
            <a-menu theme="dark" v-model:selectedKeys="current" mode="horizontal">
                <a-menu-item key="/guards/clients/home" v-if="useAuthClient.auth.isLogged">
                    <template #icon>
                        <home-outlined></home-outlined>
                    </template>
                    {{t('home')}}
                </a-menu-item>
                <a-menu-item key="/guards/clients/reservations" v-if="useAuthClient.auth.isLogged">
                    <template #icon>
                        <calendar-outlined></calendar-outlined>
                    </template>
                    {{t('reservations')}}
                </a-menu-item>
                <a-sub-menu key="language">
                    <template #icon>
                        <TranslationOutlined/>
                    </template>
                    <template #title>{{t('language')}}</template>
                    <a-menu-item-group>
                        <a-menu-item key="es">{{t("spanish")}}</a-menu-item>
                        <a-menu-item key="en">{{t("english")}}</a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu v-if="useAuthClient.auth.isLogged">
                    <template #icon>
                        <user-outlined></user-outlined>
                    </template>
                    <template #title>
                        {{useAuthClient.auth.client.name}}
                    </template>
                    <a-menu-item-group>
                        <a-menu-item key="/guards/clients/profile">{{t("profile")}}</a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
            </a-menu>
        </a-layout-header>
        <a-layout-content class="p-5 grow">
            <router-view></router-view>
        </a-layout-content>
        <a-layout-footer class="text-center">
            Sistema Tesis ©2022
        </a-layout-footer>
    </a-layout>
</template>