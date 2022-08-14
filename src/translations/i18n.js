import { createI18n } from 'vue-i18n'
import globalEn from "./en/global.json"
import globalEs from "./es/global.json"

const i18n = createI18n({
    locale:"es",
    legacy: false,
    fallbackLocale:"es",
    formatFallbackMessages: true,
    // silentFallbackWarn: true,
    messages:{
        en: globalEn,
        es: globalEs,
    }
})

export default i18n