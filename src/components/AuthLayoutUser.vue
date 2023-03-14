<script setup>
    import {TranslationOutlined,HomeOutlined,UserOutlined, TeamOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue'
    import {ref, watch, reactive} from 'vue'
    import { useI18n } from 'vue-i18n';
    import i18n from '@/translations/i18n';
    import {useRouter} from 'vue-router'
    import {useAuthUserStore} from '@/stores/users/authUser'
    const authUserStore = useAuthUserStore()
    const {t,locale} = useI18n({useScope:"global"})
    const current = ref([locale])
    const router = useRouter()
    const collapsed = ref(true)
    watch(current,(newLanguage) => {
        if(i18n.global.availableLocales.includes(newLanguage[0])){
            locale.value = newLanguage[0]
        }else if(newLanguage[0] == "logout"){
            onLogout()
        }else{
            router.push(newLanguage[0])
        }
    })
    const onLogout = () => {
        authUserStore.logout()
        router.replace("/guards/users/auth/login")
    }
</script>
<template>
    <a-layout class="flex h-screen">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <a-menu theme="dark" v-model:selectedKeys="current" mode="inline">
                <a-menu-item key="/guards/users/home" v-if="authUserStore.auth.isLogged">
                    <template #icon>
                        <home-outlined></home-outlined>
                    </template>
                    {{t('home')}}
                </a-menu-item>
                <a-sub-menu>
                    <template #icon>
                        <team-outlined />
                    </template>
                    <template #title>
                        {{ t('users') }}
                    </template>
                    <a-menu-item-group title="Usuarios">
                        <a-menu-item key="/guards/users/users">{{ t('users-list') }}</a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
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
                <a-sub-menu v-if="authUserStore.auth.isLogged">
                    <template #icon>
                        <user-outlined></user-outlined>
                    </template>
                    <template #title>
                        {{authUserStore.auth.user.name}}
                    </template>
                    <a-menu-item-group>
                        <a-menu-item key="/guards/users/profile">{{t("profile")}}</a-menu-item>
                        <a-menu-item key="logout">{{t("logout")}}</a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content>
                <router-view class="h-full overflow-auto bg-white p-3"></router-view>
            </a-layout-content>
            <a-layout-footer class="text-center">
                Sistema Tesis ©2022
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
