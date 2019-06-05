<template>
    <div>
        <div class="container" style="margin-top: 20px;">

            <popup-error :text="errorMessage"></popup-error>
			
            <div class="d-flex justify-content-between">
                <router-link :to="{ name: 'register' }">Registration</router-link>
                <router-link :to="{ name: 'login' }">Authorization</router-link>
            </div>
			<h2 style="text-align:center;">Registration</h2>
            <form class="d-flex flex-column mt-5" @submit.prevent="register()">
                <div class="form-group">
                    <label for="login">Login</label>
                    <input class="form-control form-control-lg" v-model="form.login" type="text">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control form-control-lg" v-model="form.password" type="password">
                </div>
                <div class="form-group d-flex flex-column align-items-center mt-4">
                    <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>

        </div>

    </div>
</template>
<script>
    import popupError from '../components/popup/error.vue'

    export default {
        components: { popupError },
        data() {
            return {
                errorMessage: null,
                form: {
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            register() {
                let app = this

                this.$auth.register({
                    params: {
                        login: app.form.login,
                        password: app.form.password
                    },
                    success: function () {},
                    error: function (error) {
                        this.errorMessage = error.response.data.message
                    },
                    autoLogin: true,
                    rememberMe: true,
                    redirect: '/',
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .form-control {
        border-radius: 5px;
    }
    .btn {
        border-radius: 5px;
    }
</style>
