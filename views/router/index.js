import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Messages from '../pages/messages.vue'
import Favourites from '../pages/favourites.vue'
import Message from '../pages/message.vue'
import MessageView from '../pages/message_view.vue'

Vue.use(VueRouter)

const router = new VueRouter ({
    root: '/',
    mode: 'history',
    routes: 
    [
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: { auth: false }
        },
        {
            path: '/register',
            component: Register,
            name: 'register',
            meta: { auth: false }
        },
        {
            path: '/',
            component: Messages,
            name: 'messages'
        },
        {
            path: '/favourites',
            component: Favourites,
            name: 'favourites',
            meta: { auth: true }
        },
        {
            path: '/view/:id',
            component: MessageView,
            name: 'messageView'
        },
        {
            path: '/:id',
            component: Message,
            name: 'message'
        }
    ],
    scrollBehavior (to, from) {
        if (from.name == 'messageView' && (to.name == 'messages' || to.name == 'favourites')) {
            return { selector: document.getElementById(from.params.id) }
        }
    }
})

export default router