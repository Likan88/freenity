<template>
    <div>
        <infinite-loading @infinite="infiniteFetchMessages" direction="top"></infinite-loading>

        <transition-group appear tag="div" mode="out-in" name="fade-opacity"  class="cards-container">
            <div class="card-container" v-for="message in messages" :key="message._id">
                <message :data="message" :messageControlIcons="false" @favouriteToggle="removeMessage"></message>
            </div>
        </transition-group>
    </div>
</template>
<script>
import Message from '../components/message'

export default {
    name: 'favourites',
    components: { Message },
    data() {
        return {
            messages: []
        }
    },
    mounted() {
        let app = this
        window.scrollTo(0, 100000)
        app.infiniteFetchMessages(undefined)
    },
    methods: {
        removeMessage(message) {
            let app = this;
            app.messages = app.messages.filter(item => {
                return item._id !== message._id
            })
        },
        fetchMessages(offset, $state) {
            let app = this;

            axios.get('/messages/favourites', { params: { offset: offset || 0 } })
                .then(response => {
                    if (response.data.data.length) {
                        let current_height = document.getElementsByTagName('body')[0].scrollHeight;

                        app.messages = response.data.data.concat(app.messages)

                        app.$nextTick(function () {
                            if ($state) $state.loaded()
                            let new_height = document.getElementsByTagName('body')[0].scrollHeight;
                            if (offset != 0) {
                                document.getElementsByTagName('body')[0].scrollTop = new_height - current_height;
                            }
                        })
                    } else {
                        if ($state) $state.complete()
                    }

                    if (offset == 0) {
                        setTimeout(function () {
                            window.scrollTo(0, 100000)
                        }, 500)
                    }
                });
        },
        infiniteFetchMessages($state) {
            let app = this
            app.debounceInfiniteFetchMessages($state)
        }
    },
    computed: {
        debounceInfiniteFetchMessages() {
            let app = this
            let offset = app.messages.length

            return _.debounce(($state) => {
                app.fetchMessages(offset, $state)
            }, 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
    .cards-container {
        width: 100%;
        height: 100%;
        min-height: 150vh;
        padding: 25px 15px 25px 15px;
    }
    .card-container {
        margin-top: 40px;
    }
</style>