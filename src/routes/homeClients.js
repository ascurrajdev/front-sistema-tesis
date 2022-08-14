import ReservationsListView from '@/views/guards/clients/reservations/ReservationsListView.vue'
import ProfileUserView from '@/views/guards/clients/profile/ProfileUserView.vue'
import HomeStatisticsView from '@/views/guards/clients/home/HomeStatisticsView.vue'
function checkAuthClient(to, from, next){

}
export const homeRoutesClients = [
    {
        path:"reservations",
        component: ReservationsListView
    },
    {
        path:"profile",
        component: ProfileUserView
    },
    {
        path:"",
        component: HomeStatisticsView
    },
    {
        path:"home",
        component: HomeStatisticsView
    }
]

