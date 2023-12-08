
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
                    <div class="my-4">
                        <span>Welcome.</span>
                        <h3>Sign Up for an Account</h3>
                        <span class="text-secondary">Enter your details below</span>
                    </div>
                    <div class="form-style">
                        <form @submit.prevent="signup">
                            <div class="form-group ">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" placeholder="enter your name" class="form-control form-control-lg"
                                    name="name" v-model="this.name" required>
                            </div>
                            <div class="form-group my-3">
                                <label for="exampleInputEmail1">Email Address</label>
                                <input type="email" placeholder="Benjaminrobert77@email.com"
                                    class="form-control form-control-lg" aria-describedby="emailHelp" name="email"
                                    v-model="this.email" autocomplete="new-email" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" placeholder="Password" class="form-control form-control-lg"
                                    name="password" v-model="this.password" autocomplete="new-password" required>
                            </div>
                            <div class="form-group mt-3">
                                <label for="exampleInputPassword2">Confirm Password</label>
                                <input type="password" placeholder="Confirm Password" class="form-control form-control-lg"
                                    name="password_confirmation" autocomplete="new-password" v-model="this.password_confirmation" required>
                            </div>
                            <div class="">
                                <button type="submit" class="signInBtn w-100 my-4">Sign Up</button>
                            </div>
                        </form>
                        <div class="sideline mb-1">Or Sign In With</div>
                        <div>
                            <Linkedin />
                        </div>
                        <div class="pt-4 text-center text-secondary">
                            Already have Account Please. <RouterLink to="/login">Sign In</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Linkedin from './Linkedin.vue';
export default {
    name: 'SignUp',
    components: {
        Linkedin
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    },
    mounted() {

    },
    methods: {
        async signup(e) {
            e.preventDefault();
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            await this.$store.dispatch('signup', payload);
        }
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
