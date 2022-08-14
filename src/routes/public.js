import HomeView from '@/views/public/HomeView.vue'
import AboutUsView from '@/views/public/AboutUsView.vue'
import FrecuentlyQuestionsView from '@/views/public/FrecuentlyQuestionsView.vue'
import SuggestionsView from '@/views/public/SuggestionsView.vue'
export const publicsRoutes = [
    {
        path: '',
        name:'Home',
        component: HomeView
    },
    {
        path: 'about',
        name: 'About',
        component: AboutUsView
    },
    {
        path: 'frequently-questions',
        name: 'Frecuently Questions',
        component: FrecuentlyQuestionsView
    },
    {
        path: 'suggestions',
        name: 'Suggestions',
        component: SuggestionsView
    }
]