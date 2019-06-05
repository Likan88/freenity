<template>
    <div>
        <transition mode="out-in" name="slide-fade-bottom" appear>

            <div class="card-body card-body__topic-picker" v-if="active.picker == 'topic'">
                <span class="text-secondary px-3">Topic:</span>
                <div class="d-flex flex-column mt-1">
                    <span class="px-3 py-2 border-top"
                        style="font-size:16px; cursor:pointer;"
                        @click="selectTopic(topic.name)"
                        v-for="topic in topics" 
                        :key="topic.name"
                        :class="{ 'text-white': data.topic == topic.name, 'bg-primary': data.topic == topic.name, 'text-dark': data.topic != topic.name }">{{ topic.text }}</span>
                </div>
            </div>

            <div class="card-body card-body__color-picker" v-if="active.picker == 'color'">
                <span class="text-secondary">Color:</span>
                <div class="d-flex mt-1">
                    <div class="color-circle-border" 
                        @click="selectColor(color.name, color.hex)"
                        v-for="color in colors" 
                        :class="{ 'color-circle-border-active' : data.color == color.name }"
                        :key="color.name">
                        <div class="color-circle" :style="'background-color:' + color.hex"></div>
                    </div>
                </div>
            </div>

        </transition>

        <transition mode="out-in" name="slide-fade-bottom" appear>
            <div class="card-body card-body__settings bg-white" v-if="data.url && data.site_name">

                <div class="d-flex flex-row align-items-center pl-4">

                    <i class="mdi mdi-arrow-right" style="font-size:24px;"></i>

                    <div class="d-flex flex-column pl-2">
                        <div class="d-flex flex-row">
                            <a :href="data.url" target="_blank">{{ data.site_name }}</a>
                            <span class="text-secondary" v-html="'&nbspfrom ' + data.date"></span>
                        </div>

                        <div class="d-flex flex-row" v-if="data.author">
                            <span class="text-secondary" v-html="'author:&nbsp'"></span>
                            <a :href="data.author.url" target="_blank">{{data.author.name}}</a>
                        </div>
                    </div>

                </div>

            </div>
        </transition>
    </div>
</template>
<script>
import SystemConsts from '../utils/const.js'

export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            active: {
                picker: null
            },
            color_picker_hex: null,
            colors: SystemConsts.colors,
            topics: SystemConsts.topics
        }
    },
    methods: {
        togglePicker(name) {
            let app = this
            if (app.active.picker == name) {
                app.active.picker = null 
                return
            }
            app.active.picker = name
        },
        selectTopic(name) {
            let app = this
            app.$set(app.data, 'topic', name)
            
            app.$nextTick(function () {
                app.active.picker = null
            })
        },
        selectColor(name, color) {
            let app = this
            app.color_picker_hex = color
            app.$set(app.data, 'color', name)
            app.active.picker = null
        },
        defaultState() {
            let app = this
            app.active = { picker: null }
            app.color_picker_hex = null
        }
    },
    computed: {
        getColor() {
            let app = this
            return 'color:' + app.color_picker_hex + ' !important;'
        }
    },
    watch: {
        'data': function () {
        }
    },
}
</script>
<style lang="scss" scoped>
    .card-body__settings {
        box-shadow: inset 0px -4px 6px rgba(0, 0, 0, 0.15);
        position: relative;
        z-index: 10;
    }

    .card-body__topic-picker {
        width: fit-content;
        margin-left: auto;
        position: relative;
        z-index: 9;
        background: #fff;
        box-shadow: inset 0px -4px 6px rgba(0, 0, 0, 0.15);
    }

    .card-body__color-picker {
        width: fit-content;
        margin-left: auto;
        position: relative;
        z-index: 9;
        background: #fff;
        box-shadow: inset 0px -4px 6px rgba(0, 0, 0, 0.15);

        .color-circle {
            width: 1.667rem;
            height: 1.667rem;
            border-radius: 50%;
        }
        
        .color-circle-border {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;

            &-active {
                border: 1px solid #979797;
            }

            & + .color-circle-border {
                margin-left: .425rem;
            }
        }
    }
</style>


