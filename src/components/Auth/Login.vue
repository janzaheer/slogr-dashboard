
<template>
    <div class="">
        <div class="container">
            <div class="row m-5 no-gutters rounded shadow-lg">
                <div class="col-md-6 d-none d-md-block">
                    <img src="../../assets//SlogrLogin.png" class="img-fluid shadow-sm" style="min-height:100%;" />
                </div>
                <div class="col-md-6 bg-white p-5">

                    <h1 class="pb-3">
                        <RouterLink to="/"><img src="../../assets/group-2420.svg" alt=""></RouterLink>
                    </h1>
                    <div class="my-5">
                        <span>Welcome to Back,</span>
                        <h3>Sign In to Slogr</h3>
                    </div>
                    <div class="form-style">
                        <form @submit.prevent="loginUser">
                            <div class="form-group pb-3">
                                <label for="exampleInputEmail1">Email Address</label>
                                <input type="email" placeholder="Benjaminrobert77@email.com"
                                    class="form-control form-control-lg" name="email" v-model="this.email"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" placeholder="Password" class="form-control form-control-lg"
                                    name="password" v-model="this.password">
                            </div>
                            <div class="">
                                <button type="submit" class="signInBtn w-100 my-5">Login In</button>
                            </div>
                        </form>
                        <div class="sideline mb-2">Or Sign In With</div>
                        <div>
                            <button class="socialBtn w-100 me-2" @click="login"><i
                                    class="fa-brands fa-linkedin-in fa-2xl me-1" style="color: var(--primary_color);"></i>
                                Continue With Linkedin</button>
                        </div>
                        <div class="pt-4 text-center">
                            Create Account. <RouterLink to="/signUp">Sign Up</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script >
import { RouterLink } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    name: 'Login',
    setup() {
        const { loginWithPopup, user, isAuthenticated, idTokenClaims, logout } = useAuth0()
        return {
            login: () => {
                loginWithPopup()
            },
            logout: () => {
                logout()
            },
            user,
        }
    },
    watch: {
        // Log user data whenever it changes
        user: function (newUser) {
            this.social.name = newUser.name
            this.social.sub = newUser.sub
            this.socialLogin()
        }
    },
    data() {
        return {
            email: '',
            password: '',
            social: {
                name: '',
                sub: ''
            }
        }
    },
    methods: {
        async loginUser(e) {
            e.preventDefault()
            const payload = {
                email: this.email,
                password: this.password
            }
            console.log('payload0', payload)
            // Call the login action

            try {
                await this.$store.dispatch('login', payload);
            } catch (error) {
                console.log(error)
            }
        },
        async socialLogin(){
            const payload = {
                name: this.social.name,
                sub: this.social.sub
            }
            try {
                await this.$store.dispatch('socialLogin', payload)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {

    }
}
</script>

<style>
.sideline {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ccc;
}

.sideline:before,
.sideline:after {
    content: '';
    border-top: 1px solid #ebebeb;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
}

.sideline:after {
    margin: 0 0 0 20px;
}

.socialBtn {
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--secondary_color);
    background-color: var(--white_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.socialBtn:hover {
    border: 1px solid var(--primary_color);
}

.signInBtn {
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--primary_color);
    background-color: var(--primary_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--white_color);
}

.signInBtn:hover {
    background-color: var(--primary_color_Hover);
}
</style>
