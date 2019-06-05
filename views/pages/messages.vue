<template>
    <div>
        <infinite-loading @infinite="infiniteFetchMessages" direction="top"></infinite-loading>

        <transition-group appear tag="div" mode="out-in" name="fade-opacity"  class="cards-container">
            <div class="card-container" v-for="message in messages" :key="message._id">
                <message :data="message" :passedData="passedData" @remove="removeMessage" @edit="editMessage" :unreadMessages="unreadMessages"></message>
            </div>
        </transition-group>

        <div :class="{'scroll-bottom scroll-bottom--with-form': $auth.check(['admin', 'sudo']) === true, 'scroll-bottom': $auth.check(['admin', 'sudo']) === false}" v-if="unreadMessages.length !== 0" @click="scrollBottom()">
            <div class="scroll-bottom-badge">{{unreadMessages.length >= 99 ? 99 : unreadMessages.length}}</div>
            <i class="mdi mdi-chevron-down" style="font-size:24px;color:rgba(0,0,0,0.54);"></i>
        </div>

        <message-form ref="messageFormComponent"
            :passedData="passedData" 
            @update="updateMessage" 
            @create="createMessage"
            v-if="$auth.check(['admin', 'sudo'])"></message-form>
			
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
import MessageForm from '../components/message_form'

export default {
    name: 'messages',
    components: { Message, MessageForm },
    data() {
        return {
            messages: [],
            passedData: null,
            unreadMessages: [],
			fons: null,
			loads: null
        }
    },
    mounted() {
        let app = this
        window.scrollTo(0, 100000)
        app.infiniteFetchMessages(undefined)

        app.$nextTick(function () {
            window.scrollTo(0, 100000)
        })

        window.ws.onmessage = function(e) {
            let data = JSON.parse(e.data)
			
            if (data.event == 'create') {
				data.data.websocket=1;
                app.messages.push(Object.assign({}, data.data))
                app.unreadMessages.push(Object.assign({}, data.data))
            } else if (data.event == 'delete') {
                app.messages = app.messages.filter(item => {
                    return item._id !== data.data._id
                })

                app.unreadMessages.forEach(function (elem, index) {
                    if (elem._id == data.data._id) {
                        app.$delete(app.unreadMessages, index)
                    }
                })
            }
        }
    },
    methods: {
        async removeMessage(message) {
            let app = this;

            await axios.delete('/messages/' + message._id).then(response => {
                app.$refs.messageFormComponent.defaultState()
                app.messages = app.messages.filter(item => {
                    return item._id !== message._id
                })

                window.ws.send(JSON.stringify({event: 'delete', data: message}));
            })
        },
        createMessage(message) {
            let app = this

            app.messages.push(Object.assign({}, message))
            app.passedData = null
            app.$refs.messageFormComponent.defaultState()
            setTimeout(function () {
                window.scrollTo(0, document.getElementsByTagName('body')[0].scrollHeight)
            }, 500)
			
            window.ws.send(JSON.stringify({event: 'create', data: message}));
			app.$router.push({ path: '/'})
        },
        updateMessage(message) {
            let app = this

            for (let index in app.messages) {
                if (app.messages[index]._id == message._id) {
                    app.$set(app.messages, app.messages.indexOf(app.messages[index]), Object.assign({}, message))
                }
            }
            app.passedData = null
            app.$refs.messageFormComponent.defaultState()
        },
        editMessage(message) {
				
            let app = this

            if (app.passedData && app.passedData._id == message._id) {
                app.passedData = null
                app.$refs.messageFormComponent.defaultState()
                return 
            }
            app.passedData = message
        },
        async fetchMessages(offset, $state) {
            let app = this;
			let lang = 'en';

			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					lang = url[1];
				}
			}

            await axios.get('/messages', { params: { offset: offset || 0 } })
                .then(async response => {
                    
                    if (response.data.data.length) {
					
                        let current_height = document.getElementsByTagName('body')[0].scrollHeight;

                        app.messages = response.data.data.concat(app.messages)
	
							await app.messages.forEach(async function(element, index) {

								if (eval('app.messages[index].description_'+lang)==null) {
									app.fons = !app.fons
									app.loads = !app.loads
									if (app.messages[index].description) {
										await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.messages[index].description))
										.then(function(res) {
										  return res.json();
										}).then(async function(json) {
											eval('app.messages[index].description_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\').replace(/&#39;/g,\'\')')
											await axios.post('/messages/savetranslation', app.messages[index]);
											app.fons = null
											app.loads = null
										})
										.catch(function(error) {
										  console.log('Error: ', error);
										  	app.fons = null
											app.loads = null
										});
									} else {
										app.fons = null
										app.loads = null
									}
								}

								if (eval('app.messages[index].title_'+lang)==null) {
									app.fons = !app.fons
									app.loads = !app.loads
									if (app.messages[index].title) {
										await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.messages[index].title))
										.then(function(res) {
										  return res.json();
										}).then(async function(json) {
											eval('app.messages[index].title_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\').replace(/&#39;/g,\'\')')
											await axios.post('/messages/savetranslation', app.messages[index]);
											app.fons = null
										    app.loads = null
										})
										.catch(function(error) {
										  console.log('Error: ', error);
										  	app.fons = null
											app.loads = null
										});
									} else {
										app.fons = null
										app.loads = null
									}
								}								
								
								if (eval('app.messages[index].comment_'+lang)==null) {
									app.fons = !app.fons
									app.loads = !app.loads
									if (app.messages[index].comment) {
										await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDM6cogIKTjY-9qqihVxoFonxwvK2vhqTk&target='+lang+'&q=' + encodeURIComponent(app.messages[index].comment))
										.then(function(res) {
										  return res.json();
										}).then(async function(json) {
										  eval('app.messages[index].comment_'+lang+'=json.data.translations[0].translatedText.replace(/&quot;/g,\'"\').replace(/&#39;/g,\'\')')
										  await axios.post('/messages/savetranslation', app.messages[index]);
										  app.fons = null
										  app.loads = null								  
										})
										.catch(function(error) {
										  console.log('Error: ', error);
										  app.fons = null
										  app.loads = null
										});
									} else {
										app.fons = null
										app.loads = null
									}
								}
							});

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
                    } else {
                        
                    }
                });
        },
        infiniteFetchMessages($state) {
            let app = this
            app.debounceInfiniteFetchMessages($state)
        },
        scrollBottom() {
            let app = this

            window.scrollTo(0, document.getElementsByTagName('body')[0].scrollHeight)

            app.unreadMessages = []
        }
    },
    computed: {
        debounceInfiniteFetchMessages() {
            let app = this
            let offset = app.messages.length

            return _.debounce(async ($state) => {
                await app.fetchMessages(offset, $state)
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

    .scroll-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-left: auto;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #fff;
        position: sticky;
        position: -webkit-sticky;
        bottom: 15px;
        cursor: pointer;

        &-badge {
            width: 18px;
            height: 18px;
            background-color: #EB5757;
            border-radius: 50%;
            position: absolute;
            top: -9px;
            right: -6px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            text-align: center;
        }

        &--with-form {
            bottom: 93px;
        }
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