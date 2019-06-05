<template>
    <div class="cards-container container">
        <div class="card-container" v-if="message">
            <message :data="message" :messageControlIcons="false" :clampComment="false"></message>
        </div>
		<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #ffffff;opacity: 0.9;"></div>
		<div v-show="loads" class="loader">
			<div class="laoder-frame">
				<img class="svg-loader" src="/images/loader.svg" alt="circle-loader">
			</div>
		</div>
	</div>
</template>
<script>
import Message from '../components/message'

export default {
    components: { Message },
    data() {
        return {
            message: null,
			fons: null,
			loads: null
        }
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

			if (eval('app.message.description_'+lang)==null) {
				app.fons = !app.fons
				app.loads = !app.loads
				if (app.message.description) {
					await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.message.description))
					.then(function(res) {
					  return res.json();
					}).then(async function(json) {
					    eval('app.message.description_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\')')
					    await axios.post('/messages/savetranslation', app.message);
					    app.fons = null
					    app.loads = null
					})
					.catch(function(error) {
					  console.log('Error: ', error);
					  	app.fons = null
					    app.loads = null
					});
				} else {
					  await axios.post('/messages/savetranslation', app.message);
					  app.fons = null
					  app.loads = null
				}	
			}

			if (eval('app.message.title_'+lang)==null) {
				app.fons = !app.fons
				app.loads = !app.loads
				if (app.message.title) {
					await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.message.title))
					.then(function(res) {
					  return res.json();
					}).then(async function(json) {
						eval('app.message.title_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\')')
					    await axios.post('/messages/savetranslation', app.message);
					  	app.fons = null
					    app.loads = null	
					})
					.catch(function(error) {
					  console.log('Error: ', error);
					  	app.fons = null
					    app.loads = null
					});
				} else {
					  await axios.post('/messages/savetranslation', app.message);
					  	app.fons = null
					    app.loads = null
				}
			}

			if (eval('app.message.comment_'+lang)==null) {
				app.fons = !app.fons
				app.loads = !app.loads
				if (app.message.comment) {
					await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.message.comment))
					.then(function(res) {
					  return res.json();
					}).then(async function(json) {
					  eval('app.message.comment_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\')')
					  await axios.post('/messages/savetranslation', app.message);
					  	app.fons = null
					    app.loads = null									  
					})
					.catch(function(error) {
					  console.log('Error: ', error);
					  	app.fons = null
					    app.loads = null
					});
				} else {
					    await axios.post('/messages/savetranslation', app.message);
					  	app.fons = null
					    app.loads = null
				}
			}

        })
    },
    methods: {
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
    }
}
</script>
<style lang="scss" scoped>
    .cards-container {
        width: 100%;
        height: 100%;
        padding: 0 15px 25px 15px;
    }
    .card-container {
        margin-top: 50px;
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