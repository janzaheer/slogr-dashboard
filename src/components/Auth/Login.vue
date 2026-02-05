<template>
  <div class="login-page d-flex align-items-center">
    <div class="container">
      <div class="row login-card shadow-lg">

        <!-- LEFT IMAGE PANEL -->
        <div class="col-lg-6 d-none d-lg-flex left-panel">
          <img src="@/assets/SlogrLogin.png" class="img-fluid" />
        </div>

        <!-- RIGHT FORM PANEL -->
        <div class="col-lg-6 right-panel">
          <div class="login-form">

            <!-- Logo -->
            <RouterLink to="/">
              <img src="@/assets/group-2420.svg" class="logo" />
            </RouterLink>

            <h3 class="fw-bold my-4">Welcome Back</h3>

            <!-- FORM -->
            <Form :validation-schema="schema" @submit="loginUser" v-slot="{ errors, meta }">

              <!-- Email -->
              <div class="mb-3">
                <label>Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Benjaminrobert77@email.com"
                  class="form-control form-control-lg"
                />
                <small class="text-danger">{{ errors.email }}</small>
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label>Password</label>
                <div class="input-group">
                  <Field
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    placeholder="Password"
                    class="form-control form-control-lg"
                  />
                  <span class="input-group-text password-eye" @click="togglePassword">
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </span>
                </div>
                <small class="text-danger">{{ errors.password }}</small>
              </div>

              <!-- Button -->
              <button class="signInBtn w-100" :disabled="!meta.valid || isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Sign In</span>
              </button>
            </Form>
            <!-- OR -->
            <div class="divider">Or sign in with</div>
            <!-- Social Buttons -->
            <div class="">
               <Linkedin />
            </div>
            <p class="text-center mt-4 text-muted">
              Create Account?
              <RouterLink to="/signUp">Sign Up</RouterLink>
            </p>
          </div>
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
    name: 'Login',
    components: {
        Linkedin,
        Form,
        Field,
    },
    data() {
        return {
            isLoading: false,
            showPassword: false,
            schema: yup.object({
                email: yup.string().email("Invalid email").required("Email is required"),
                password: yup.string().required("Password is required"),
            }),
        }
    },
    mounted() {

    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword
        },
        async loginUser(values) {
            this.isLoading = true
            const payload = {
                email: values.email,
                password: values.password,
            };
            // Call the login action
            try {
                await this.$store.dispatch('login', payload);
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f6f8fa;
}

.login-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
}

/* Left Image */
.left-panel {
  background: #f2f4f7;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Right Panel */
.right-panel {
  padding: 60px;
  display: flex;
  align-items: center;
}

.login-form {
  width: 100%;
  max-width: 420px;
  margin: auto;
}

.logo {
  height: 40px;
}

/* Inputs */
.form-control {
  border-radius: 10px;
  padding: 14px;
}

/* Green Button */
.btn-green {
  background: #8bb93f;
  color: #8bb93f;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
}
.btn-green:hover {
  background: #7aa532;
}

/* Divider */
.divider {
  text-align: center;
  margin: 30px 0;
  color: #aaa;
  position: relative;
}
.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ddd;
}
.divider::before {
  left: 0;
}
.divider::after {
  right: 0;
}

/* Social Buttons */
.social-btn {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 10px;
  background: white;
}
.social-btn:hover {
  border-color: #8bb93f;
}

/* Password Eye */
.password-eye {
  cursor: pointer;
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