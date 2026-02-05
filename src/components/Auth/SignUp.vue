<template>
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
                <Form :validation-schema="schema" @submit="signup" v-slot="{ errors, meta }">
                    <div class="form-group ">
                        <label for="exampleInputName1">Name</label>
                        <Field name="name" type="text" placeholder="enter your name"
                            class="form-control form-control-lg" />
                        <span class="text-danger">{{ errors.name }}</span>
                    </div>
                    <div class="form-group my-3">
                        <label for="exampleInputEmail1">Email Address</label>
                        <Field name="email" type="email" placeholder="Benjaminrobert77@email.com"
                            class="form-control form-control-lg" autocomplete="new-email" />
                        <span class="text-danger">{{ errors.email }}</span>
                    </div>
                    <div class="form-group position-relative">
                        <label>Password</label>
                        <div class="input-group">
                            <Field :type="showPassword ? 'text' : 'password'" name="password" placeholder="Password"
                                class="form-control form-control-lg" autocomplete="new-password" />
                            <span class="input-group-text" style="cursor: pointer;" @click="togglePassword">
                                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </span>
                        </div>
                        <span class="text-danger">{{ errors.password }}</span>
                    </div>
                    <div class="form-group position-relative mt-3">
                        <label>Confirm Password</label>
                        <div class="input-group">
                            <Field :type="CshowPassword ? 'text' : 'password'" name="password_confirmation"
                                placeholder="Confirm Password" class="form-control form-control-lg"
                                autocomplete="new-password" />
                            <span class="input-group-text" style="cursor: pointer;" @click="toggleConfirmPassword">
                                <i :class="CshowPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </span>
                        </div>
                        <span class="text-danger">{{ errors.password_confirmation }}</span>
                    </div>
                    <div class="">
                        <button type="submit" class="signInBtn w-100 my-4" :disabled="!meta.valid">Sign Up</button>
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
</template>

<script>
import { RouterLink } from 'vue-router';
import Linkedin from './Linkedin.vue';
import { Form, Field } from 'vee-validate';
import * as yup from "yup";

export default {
    name: 'SignUp',
    components: {
        Linkedin,
        Form,
        Field
    },
    data() {
        return {
            showPassword: false,
            CshowPassword: false,
            schema: yup.object({
                name: yup.string().required("Name is required"),
                email: yup.string().email("Invalid email").required("Email is required"),
                password: yup.string()
                    .min(6, "Password should contain at least 8 characters")
                    .required("Required")
                    .matches(/[0-9]/, "Password must contain a number")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(
                        /[!@#$%^&*(),.?":{}|<>]/,
                        "Password must contain at least one special character"
                    ),
                password_confirmation: yup.string()
                    .required("Required") // Ensure field is not empty
                    .oneOf([yup.ref("password")], "Passwords must match"),
            }),
        }
    },
    mounted() {

    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword
        },
        toggleConfirmPassword() {
            this.CshowPassword = !this.CshowPassword
        },
        async signup(values) {
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation
            }
            try {
                await this.$store.dispatch('signup', payload);
            } catch (error) {
                console.log(error)
            }
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

.signInBtn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.signInBtn:hover {
    background-color: var(--primary_color_Hover);
}
</style>
