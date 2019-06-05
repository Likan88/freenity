<template>
    <div class="message-view" v-if="message">
        <nav class="navbar">
            <div class="navbar-header">

                <div class="d-flex align-items-center" @click="$router.back()">
                    <i class="mdi mdi-arrow-left" style="font-size:24px;"></i>
                    <span class="ml-2">Back</span>
                </div>

                <div class="d-flex align-items-center ml-auto" v-if="message">
                    <a class="btn btn-secondary mr-3 ml-3" :href="message.url" target="_blank" v-if="message.url">open it in a new window</a>

                    <i class="mdi mdi-share-variant text-secondary ml-2"
                        style="cursor:pointer;font-size:24px;" 
                        @click="shareMessage(message)"></i>

                    <i class="mdi ml-2" 
                        style="cursor:pointer;font-size:24px;"
                        :class="{ 
                            'mdi-star': message.is_favourite, 
                            'mdi-star-outline': !message.is_favourite, 
                            'text-warning': message.is_favourite, 
                            'text-secondary': !message.is_favourite }"
                        v-if="$auth.check()"
                        @click="favouriteMessage(message)"></i>
                </div>       

            </div>
        </nav>

        <iframe :src="message.embed" target="_parent" 
            v-if="viewType == 'embed'" :key="0" style="height: 50%" frameborder="0" allowfullscreen></iframe>

        <iframe :src="message.url" target="_parent" id="iframe1"
            v-if="viewType == 'iframe'" :key="1"></iframe>

        <iframe :src="showfb(message.url)" 
            style="width: 100%;height: calc(100vh - 140px);border: none;" 
            scrolling="yes" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
			id="iframe2"
            v-if="viewType == 'facebook'" :key="2"></iframe>

		<iframe :src="showinstagram(message.url)" 
            style="width: 100%;height: calc(100vh - 140px);border: none;" 
            scrolling="yes" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
			id="iframe3"
            v-if="viewType == 'instagram'" :key="3"></iframe>
			
		<iframe :src="showvk(message.url)" 
            style="width: 100%;height: calc(100vh - 140px);border: none;" 
            scrolling="yes" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
			id="iframe4"
            v-if="viewType == 'vkontakte'" :key="4"></iframe>
			
        <iframe :src="showurl(message.id)" 
            style="width: 100%;height: calc(100vh - 140px);border: none;" 
            scrolling="yes" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
			id="iframe5"
            v-if="viewType == 'original'" :key="5"></iframe>
			
		<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #ffffff;opacity: 0.9;"></div>
		<div v-show="loads" class="loader">
			<div class="laoder-frame">
				<img class="svg-loader" src="/images/loader.svg" alt="circle-loader">
			</div>
		</div>
		
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: null,
			fons: null,
			loads: null
        }
    },
    created() {
        setTimeout(function () {
            window.scrollTo(0, 0)
        }, 300)
    },
    async mounted() {
        let app = this
		let lang = 'en';

		var urls=window.location.href.split("?");
		if (urls[1]) {
			var url=urls[1].split("=");
			if (url[0]=='lang') {
				lang = url[1];
			}
		}

        await axios.get('/messages/' + app.$route.params.id)
        .then(async response => {
            app.message = response.data.data
			app.message.lang=lang;
			if (eval('app.message.is_files_'+lang+'')!=1) {
				app.fons = !app.fons
				app.loads = !app.loads
				await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.message.title))
				.then(function(res) {
				  return res.json();
				}).then(async function(json) {
					eval('app.message.title_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\')')
					if (app.message.url && app.message.site_name!='Instagram'&& app.message.site_name!='www.instagram.com' && app.message.site_name!='YouTube' && app.message.site_name!='www.facebook.com' && app.message.site_name!='vk.com') {
					await axios.post('/messages/translationfile', app.message)
						.then(response => {
							console.log(response);
							app.fons = null
							app.loads = null
							eval('app.message.is_files_'+lang+'="1"')
							axios.post('/messages/savetranslation', app.message);
							var iframe = document.getElementById('iframe5');
							iframe.src = iframe.src;
						}).catch(function(error) {
						    console.log(error);
							app.fons = null
							app.loads = null
						});
					} else {
					  	app.fons = null
					    app.loads = null
					}
				})
				.catch(function(error) {
				  console.log('Error: ', error);
				});
			}
		})
		
    },
    computed: {
		viewType() {
            let app = this

			if (app.getHostName(app.message.url) == 'facebook.com' || app.getHostName(app.message.url) == 'www.facebook.com') {
				return 'facebook'
			} else if (app.message.site_name == 'Instagram' || app.message.site_name == 'www.instagram.com') {
				return 'instagram'
			} else if (app.message.site_name == 'vk.com') {
				return 'vkontakte'
			} else if (app.message.site_name == 'Eurosport' || app.message.site_name == 'www.fontanka.ru' || app.message.site_name == 'www.gazeta.ru') {
				return 'iframe'
			} else if (app.message.embed) {
				return 'embed'
			} else {
				return 'original'
			}
			
        }
    },
    methods: {
		showvk(urlvk) {
			let app = this;
			let url='http://progbuilder.ru/showvk.php?q='+urlvk;
			return url;
		},
		showinstagram(urlinstagram) {
			let app = this;
			let url='http://progbuilder.ru/showinstagram.php?q='+urlinstagram;
			return url;
		},
		showfb(urlfb) {
			let app = this;
			let url='http://progbuilder.ru/showfb.php?q='+urlfb;
			return url;
		},		
		showurl(uid) {
			let lang = 'en';
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					lang = url[1];
				}
			} 
			let app = this;
			let urlpr='http://progbuilder.ru/showurl.php?q='+uid+'&lang='+lang;
			return urlpr;
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

            axios.post('/messages/'+ app.message._id +'/favourite').then(response => {
                app.message.is_favourite = response.data.is_favourite
            })
        },
        getHostName(url) {
            var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
            if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
            }
            else {
                return null;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .navbar {
        top: 70px;
    }

    .message-view {
        width: 100%;
        max-width: 920px;
        height: 91vh;
        background: #fff;
        position: sticky;
        top: 0;
    }
	@media screen and (max-width: 500px) {
		.message-view {
			height: 100%;
		}
	}
    iframe {
        width: 100%;
        height: calc(100vh - 140px);
        border: none;
    }
	
	.loader {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1000;
	}
	 
	.laoder-frame {
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 100vh;
	}
	 
	.svg-loader {
		width: 110px;
		-webkit-animation: svg-loader 1s linear infinite;
		animation: svg-loader 1s linear infinite;
	}
	 
	@-webkit-keyframes svg-loader {
		from {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
	 
	@keyframes svg-loader {
		from {
			-ms-transform: rotate(0);
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
		to {
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
</style>


