<template>
    <div class="image-gallery">
        <nav class="navbar">
            <div class="navbar-header">

                <div class="d-flex align-items-center" @click="$emit('close')">
                    <i class="mdi mdi-arrow-left" style="font-size:24px;"></i>
                    <span class="ml-2">Back</span>
                </div>

            </div>
        </nav>

        <div class="image-gallery-counter text-primary text-center">
            {{ files.indexOf(active_file) + 1 }} of {{ files.length }}
        </div>

        <div class="image-gallery-active" v-if="active_file">
            <img class="image-gallery-arrow-left"
                v-if="files.indexOf(active_file) != 0"
                src="../assets/icons/icn-gallery-arrow-left.png"
                @click="prevImage()">

            <img class="image-gallery-active--image" :src=" active_file.url || active_file.preview">

            <img class="image-gallery-arrow-right"
                v-if="files.indexOf(active_file) != files.length - 1"
                src="../assets/icons/icn-gallery-arrow-right.png"
                @click="nextImage()">
        </div>
        
        <div class="image-gallery-items" v-dragscroll:nochilddrag>
            <div class="image-gallery-item" :class="{ 'image-gallery-item--active': isActiveFile(file.url) }" v-for="(file, i) in files" :key="i">
                <img class="image-gallery-item--image" :src="file.preview" @click="setActiveFile(file)">
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        files: {
            type: Array,
            default: null
        },
        active: {
            type: Object,
            default: null
        },
        showed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active_file: null
        }
    },
    created() {
        let app = this;
        if (app.active) {
            app.active_file = app.active;
        } else {
            app.active_file = app.files[0];
        }

        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    },
    destroyed() {
        document.getElementsByTagName('body')[0].removeAttribute('style')
    },
    methods: {
        isActiveFile(url) {
            let app = this;

            if (url == app.active_file.url) {
                return true;
            }

            return false;
        },
        setActiveFile(file) {
            let app = this;

            app.active_file = file;
        },
        nextImage() {
            let app = this
            let imageIndex = app.files.indexOf(app.active_file) + 1
            if (app.files.length == imageIndex)
                imageIndex = 0

            app.active_file = app.files[imageIndex]
        },
        prevImage() {
            let app = this
            let imageIndex = app.files.indexOf(app.active_file) - 1
            if (imageIndex == -1)
                imageIndex = app.files.length - 1

            app.active_file = app.files[imageIndex]
        }
    }
}
</script>
<style lang="scss" scoped>
    .navbar {
        position: relative;
    }
    
    .image-gallery {
        width: 100%;
        max-width: 920px;
        height: 100vh;
        margin-left: -15px;
        position: fixed;
        top: 0;
        z-index: 1050;
        background: #fff;

        &-counter {
            font-size: 1.166rem;
            text-align: center;
            margin: 1.25rem 0;
        }

        &-arrow-left {
            width: 40px;
            height: 40px;
            object-fit: cover;
            position: absolute;
            left: 0;
            cursor: pointer;
        }

        &-arrow-right {
            width: 40px;
            height: 40px;
            object-fit: cover;
            position: absolute;
            right: 0;
            cursor: pointer;
        }

        &-active {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50%;
            position: relative;

            &--image {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &-items {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            padding: 2rem 1rem;
            margin: 0 auto;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            overflow-x: scroll;
            white-space: nowrap;
        }

        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            width: 72px;
            height: 56px;
            margin: 12px 6px;
            
            &--active {
                background: #007bff;
            }

            &--image {
                width: 100%;
                height: 100%;
                padding: 2px;
                object-fit: cover;
            }
        }
    }

</style>


