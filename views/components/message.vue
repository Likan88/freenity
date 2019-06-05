<template>    
    <div class="d-flex" v-view.once="seenMessage">

        <image-gallery :files="prepareImages" :active="active.gallery_file" v-if="active.gallery" @close="active.gallery = false"></image-gallery>

        <message-view :message="data" v-if="active.view" @close="active.view = false"></message-view>

        <div class="card" :id="data._id">
            <div class="card-header" @click.stop="openCard()" :style="messageHeaderStyles">
                <div :class="data.color && data.color !== 'yellow' ? 'global-icon global-icon--white' : 'global-icon'" v-if="data.comment" v-show="comment"></div>
                <span :style="messageHeaderFont" :class="{ 'clamp': clampComment }">{{ messageTopiccomment }}</span>
                <div class="topic-badge" v-if="data.topic">{{ messageTopicName }}</div>
            </div>

            <div class="card-body" @click.stop="openView()" v-if="((data.url && data.site_name) || data.title || data.files.length || data.description)">
                <div class="d-flex flex-row align-items-center pl-4" v-if="data.url && data.site_name">
                    <i class="mdi mdi-arrow-right" style="font-size:24px;"></i>

                    <div class="d-flex flex-column pl-2">
                        <div class="d-flex flex-row">
                            <a href="#" @click.stop.prevent="openLink(data.url, '_blank')">{{ data.site_name }}</a>
                            <span class="text-secondary" v-html="'&nbspfrom ' + data.date"></span>
                        </div>

                        <div class="d-flex flex-row" v-if="data.author">
                            <span class="text-secondary" v-html="'author:&nbsp'"></span>
                            <a href="#" @click.stop.prevent="openLink(data.author.url, '_blank')">{{data.author.name}}</a>
                        </div>
                    </div>
                </div>

                <div class="card-title font-weight-bold pl-4 mt-2 mb-3" v-if="data.title">{{ messageTopictitle }}</div>

                <div class="d-flex flex-row flex-wrap" v-if="prepareFiles">
                    <div class="file" style="cursor:pointer;" v-for="(file, i) in prepareFiles" :key="i">

                        <div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
                            <img class="file__image" :src="file.preview">
                        </div>

                        <div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
                            <img class="file__image" :src="file.group[0].preview">
                            <span class="file__image-group-count">
                                {{ '+' + file.group.length }}
                            </span>
                        </div>

                        <video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

                        <iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

                        <div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
                            <i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
                        </div>

                        <div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
                            <i class="mdi mdi-music text-white" style="font-size:42px;"></i>
                        </div>

                    </div>
                </div>

                <p class="card-text mx-4 mt-2 mb-4" v-if="data.description">{{ messageTopicdescription }}</p>

            </div>

        </div>

        <div class="d-flex flex-column justify-content-end ml-3" v-if="sideIcons">
            <div class="d-flex flex-column mb-auto" v-if="messageControlIcons">
                <i class="mdi mdi-close text-secondary" 
                    style="cursor:pointer;font-size:24px;" 
                    v-if="$auth.user()._id == data.user_id || $auth.check(['sudo'])"
                    @click="removeMessage(data)"></i>

                <i class="mdi mdi-pencil"
                    :class="{ 
                        'text-primary': passedData && passedData._id == data._id, 
                        'text-secondary': !passedData
                    }"
                    style="font-size:24px;"
                    v-if="$auth.user()._id == data.user_id || $auth.check(['sudo'])"
                    @click="editMessage(data)"></i>
            </div>

            <div class="d-flex flex-row align-items-center">
                <i class="mdi mdi-eye-outline text-secondary" style="font-size:24px;"></i>
                <span class="text-secondary ml-1" style="font-size:14px;">{{ data.views }}</span>
            </div>

            <i class="mdi mdi-share-variant text-secondary" 
                style="cursor:pointer;font-size:24px;" 
                @click="shareMessage(data)"></i>

            <i class="mdi" 
                style="cursor:pointer;font-size:24px;"
                :class="{ 
                    'mdi-star': data.is_favourite, 
                    'mdi-star-outline': !data.is_favourite, 
                    'text-warning': data.is_favourite, 
                    'text-secondary': !data.is_favourite }"
                v-if="$auth.check()"
                @click="favouriteMessage(data)"></i>
        </div>

    </div>
</template>
<script>
import SystemConsts from '../utils/const.js'
import ImageGallery from '../components/image_gallery.vue'

export default {
    components: { ImageGallery },
    props: {
        data: {
            type: Object,
            default: {}
        },
        sideIcons: {
            type: Boolean,
            default: true
        },
        messageControlIcons: {
            type: Boolean,
            default: true
        },
        passedData: {
            type: Object,
            default: null
        },
        clampComment: {
            type: Boolean,
            default: true
        },
        unreadMessages: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            topics: SystemConsts.topics,
            colors: SystemConsts.colors,
            active: {
                view: false,
                gallery: false,
                gallery_file: null
            },
            audio: null,
			comment:null
        }
    },
    computed: {
        prepareFiles() {
            let app = this
            let files = []
            let image_group = []
            let other_files = app.prepareOtherFiles
            let images = app.prepareImages

            files = files.concat(other_files)

            images.forEach((image, i) => {
                if (i < 3) {
                    files.push(image)
                } else if (images.length == 4) {
                    files.push(image)
                } else {
                    image_group.push(image)
                }
            })

            if (image_group.length) {
                files.push({
                    type: 'image_group',
                    group: image_group
                })
            }

            return files.length ? files : null
        },
        prepareOtherFiles() {
            let app = this
            let files = app.data.files.filter(file => {
                return file.type != 'image'
            })
            return files
        },
        prepareImages() {
            let app = this
            let images = app.data.files.filter(file => {
                return file.type == 'image'
            })
            return images
        },
        messageTopicName() {
            let app = this
            let name = ''
            app.topics.filter(item => { 
                if (item.name == app.data.topic) {
                    name = item.text
                }
            })
            return name
        },
		messageTopiccomment() {
            let app = this
            let name = app.data.comment_en
			let urls=window.location.href.split("?");
			
			if (urls[1] && !app.data.websocket) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					eval("name = app.data.comment_"+url[1]);
				}
			}
			
			if (name) app.comment = true
			else app.comment = null

            return name
        },	
        messageTopictitle() {
            let app = this
            let name = app.data.title_en
			let urls=window.location.href.split("?");
			
			if (urls[1] && !app.data.websocket) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					eval("name = app.data.title_"+url[1]);
				}
			}

            return name
        },	
        messageTopicdescription() {
            let app = this
            let name = app.data.description_en
			let urls=window.location.href.split("?");
			
			if (urls[1] && !app.data.websocket) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					eval("name = app.data.description_"+url[1]);
				}
			}

            return name
        },
        messageHeaderStyles() {
            let app = this
            let bg = '#fff'
            let styles = []

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    bg = item.hex
                }
            })

            styles.push(`background-color:${ bg };`)

            if (!(app.data.url && app.data.site_name) && !app.data.title && !app.data.files.length && !app.data.description) {
                styles.push('border-radius: 20px 20px 20px 0;')
            }

            return styles.join('')
        },
        messageHeaderFont() {
            let app = this
            let font = '#000'

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    font = item.font
                }
            })

            return `color:${ font };`
        },
        debounceSeenMessage() {
            return _.debounce((e) => {
                let app = this;
                axios.post('/messages/'+ app.data._id +'/seen');
                app.data.views += 1;
            }, 3000);
        }
    },
    methods: {
        openCard() {
            let app = this
			let langs='en';
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					langs = url[1];
				}
			}
			
            app.$router.push({ name: 'message', params: { id: app.data._id } , query: { lang: langs } })
        },
        openView() {
			let app = this
			let langs='en';
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					langs = url[1];
				}
			}

            if (app.data.url) {
                app.$router.push({ name: 'messageView', params: { id: app.data._id }, query: { lang: langs } })
            }
        },
        openLink(url, prop) {
            window.open(url, prop);
        },
        openGallery(file) {
            let app = this
			
			if (app.data.site_name!=null) {
				let langs='en';
				var urls=window.location.href.split("?");
				if (urls[1]) {
					var url=urls[1].split("=");
					if (url[0]=='lang') {
						langs = url[1];
					}
				}

				if (app.data.url) {
					app.$router.push({ name: 'messageView', params: { id: app.data._id }, query: { lang: langs } })
				}
			} else {
				app.active.gallery = true
				app.active.gallery_file = file			
			}
        },
        openFile(url) {
            window.open(url, '_blank')
        },
        toggleAudio(url) {
            let app = this;

            if (app.audio) {
                app.audio.pause();
                app.audio = null;
            } else {
                app.audio = new Audio(url);
                app.audio.play();
                app.audio.addEventListener('ended', function() {
                    app.audio = null;
                });
            }
        },
        removeMessage(data) {
            let app = this

            $.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to remove this post?',
                buttons: {
                    confirm: function () {
                        app.$emit('remove', data)
                    },
                    cancel: function () {}
                }
            })  
        },
        editMessage(data) {
            let app = this
            app.$emit('edit', data)
        },
        shareMessage(data) {
            if (navigator.share !== undefined) {
                navigator.share({
                    title: data.comment,
                    url: location.origin + '/' + data._id
                }).then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error))
            } else {
                const el = document.createElement('textarea')
                el.value = location.origin + '/' + data._id
                document.body.appendChild(el)
                el.select();
                document.execCommand('copy')
                document.body.removeChild(el)

                $.alert({
                    title: '',
                    content: 'Link copied to clipboard.',
                    backgroundDismiss: true
                })
            }
        },
        favouriteMessage(data) {
            let app = this;
            let isRemoveConfirm = true;

            if (app.data.is_favourite) {
                $.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to remove this post from your favorites?',
                    buttons: {
                        confirm: function () {
                            axios.post('/messages/'+ app.data._id +'/favourite').then(response => {
                                app.data.is_favourite = response.data.is_favourite
                                app.$emit('favouriteToggle', app.data)
                            })
                        },
                        cancel: function () {}
                    }
                })
            } else {
                axios.post('/messages/'+ app.data._id +'/favourite').then(response => {
                    app.data.is_favourite = response.data.is_favourite
                    app.$emit('favouriteToggle', app.data)
                })
            } 
        },
        seenMessage(e) {
            let app = this
            app.debounceSeenMessage(e);
            
            app.unreadMessages.forEach(function (elem, index) {
                if (elem._id == app.data._id) {
                    app.$delete(app.unreadMessages, index)
                }
            })
        },
    }

}
</script>
<style lang="scss" scoped>
    .card {
        width: 85%;
        max-width: 683px;
        border: none;
        border-radius: 20px 20px 20px 0;
        background: none;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        &:before {
            content: '';
            width: 15px;
            height: 20px;
            position: absolute;
            bottom: 0;
            left: -15px;
            background: url('data:image/svg+xml;utf8,<svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.26402 20H13V0C12.9318 7.9093 8.37227 14.9355 0.845214 17.5632C-0.49502618.0311 -0.156637 20 1.26402 20Z" fill="white"/></svg>') no-repeat right;
            background-size: cover;
        }
    }

    .card-header {
        border: none;
        height: 100%;
        padding: 1.5rem 2.75rem 1.5rem 2.75rem;
        border-radius: 20px 20px 0 0;
        white-space: pre-line;

        .global-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            background: url('../assets/icons/icn-web-global.png') no-repeat center;
            background-size: cover;

            &--white {
                background: url('../assets/icons/icn-web-global-white.png') no-repeat center;
                background-size: cover;
            }
        }

        span {
            font-size: 1.25rem;
            padding-left: 12px;

            &.clamp {
                max-height: 86px;
                display: block;
                @supports(display: -webkit-box) {
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    .card-body {
        border-radius: 0 0 20px 0;
        background: #fff;
        box-shadow: 0px -4px 7px rgba(0, 0, 0, 0.06);
    }

    .card-title {
        font-size: 1.167rem;
    }

    .card-text {
        max-height: 126px;
        overflow: hidden;
    }

    .file {
        flex: 1 1 50%;
        height: auto;
        min-height: 150px;
        padding: 10px;
        border-radius: 10px;

        &__image {
            width: 100%;
            
            border-radius: 10px;
            object-fit: cover;

            &-group {
                width: 100%;
                height: 100%;
                position: relative;
                border-radius: 10px;

                .file__image {
                    position: absolute;
                }

                &-count {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    font-size: 24px;
                    line-height: 28px;
                    text-align: center;
                    color: #007bff;
                    position: relative;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                }
            }
        }

        &__video {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }

        &__iframe {
            width: 100%;
            height: 100%;
            min-height: 280px;
            border: none;
        }

        &__file {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }

    .topic-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 76px;
        padding: 0 2px;
        position: absolute;
        border: 2px solid #EB5757;
        border-radius: 50%;
        top: -20px;
        right: -10px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: #000;
        text-align: center;
        background: #fff;
    }
</style>


