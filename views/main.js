window.$ = require('jquery')
window.jQuery = require('jquery')
window._ = require('lodash')
require('bootstrap')
window.axios = require('axios')


import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import App from './App.vue'
import Router from './router'
import VueDragscroll from 'vue-dragscroll'
import VueCheckView from 'vue-check-view'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(VueAxios, Axios)
Vue.use(VueDragscroll)
Vue.use(VueCheckView)
Vue.use(InfiniteLoading, {
    props: {
        spinner: 'spiral',
        distance: 10
    },
    slots: {
        noMore: 'There are no older posts'
    }
})

Axios.defaults.baseURL = '/api'

Vue.router = Router

Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
    rolesVar: 'role'
})

window.ws = new WebSocket("ws://" + window.location.host)
window.ws.onopen = function () {
}
window.ws.onerror = function () {
    setTimeout(function () {
        window.ws = new WebSocket("ws://" + window.location.host)
    }, 2000) 
}
window.ws.onclose = function () {
    setTimeout(function () {
        window.ws = new WebSocket("ws://" + window.location.host)
    }, 2000)
}

App.router = Vue.router

new Vue({
    el: '#app',
    Router,
    render: h => h(App)
})
