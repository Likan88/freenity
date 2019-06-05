<template>
    <transition mode="out-in" name="slide-fade-bottom" appear>

        <div class="card-body card-body--file-list bg-white" v-if="files.length" 
            v-dragscroll>

            <div class="card-body-file" v-for="(file, i) in files" :key="i" :title="file.name" @click.self="remove(file)">

                <img class="card-body-file__image" :src="file.preview" v-if="file.type == 'image'">

                <div class="card-body-file__file bg-primary" v-if="file.type == 'file'">
                    <i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
                </div>

                <div class="card-body-file__file bg-primary" v-if="file.type == 'video' || file.type == 'iframe'">
                    <i class="mdi mdi-play text-white" style="font-size:42px;"></i>
                </div>

                <div class="card-body-file__file bg-primary" v-if="file.type == 'audio'">
                    <i class="mdi mdi-music text-white" style="font-size:42px;"></i>
                </div>

            </div>

        </div>
        
    </transition>
</template>
<script>
export default {
    props: {
        files: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods: {
        remove(file) {
            let app = this
            app.$emit('remove', file)
        }
    }
}
</script>
<style lang="scss" scoped>
    .card-body--file-list {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        max-height: 150px;
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        box-shadow: inset 0px -4px 6px rgba(0, 0, 0, 0.15);
        position: relative;
        z-index: 10;

        .card-body-file {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            width: 65px;
            height: 65px;
            margin: 20px 10px 50px 10px;
            position: relative;
            border-radius: 20px;

            &__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
            }

            &__file {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: 20px;
            }

            &:after {
                content: attr(title);
                width: 100%;
                position: absolute;
                bottom: -2.25rem;
                font-size: 1.25rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            &:before {
                content: '✖';
                width: 20px;
                height: 20px;
                line-height: 20px;
                position: absolute;
                top: -5px;
                right: -5px;
                background: #dc3545;
                text-align: center;
                color: #fff;
                border-radius: 50%;
            }
        }
    }
</style>


