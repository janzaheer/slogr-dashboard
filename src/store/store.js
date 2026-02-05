// store.js
import Vuex from 'vuex';
import createPersist from 'vuex-persist';

// Your authentication service
import authServices from './authServices';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import router from '@/router/index'
import Toast from '../components/Toast';

const { Store } = Vuex;

// Create a vuexPersist instance
const vuexPersist = new createPersist({
    key: 'slogr', // unique key for your application
    storage: localStorage, // or sessionStorage or localforage
    reducer: state => ({
        // Specify which state properties you want to persist
        token: state.token,
        userData:state.userData
    }),
});

// Create the Vuex store
const store = new Store({
    state: {
        token: null,
        userData: {}
    },
    getters: {
        getToken: state => state.token,
        getUserData: state => state.userData
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserData(state, userData) {
            state.userData = userData
        },
        clearUserData(state) {
            state.token = null;
            state.userData = {}
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                // Make API call to authenticate user
                const response = await authServices.login(credentials);
                if (response.status === 200) {
                    // Update Vuex store with user data
                    commit('setToken', response.data.success.token);
                    commit('setUserData', response.data.success);
                    Toast.fire({ icon: "success", title: "Login Successfully!" });
                    router.push('/');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        Toast.fire({ icon: "error", title: 'Unauthenticated' });
                    }
                }
                // Handle login error
                Toast.fire({ icon: "error", title: error.message });
            }
        },
        async signup({ commit }, credentials) {
            try {
                const response = await authServices.signup(credentials)
                commit('setToken', response.data.success.token);
                commit('setUsername', response.data.success.name);
                commit('setUserId', response.data.success.id);
                Toast.fire({ icon: "success", title: "SignUp Successfully!" });
                router.push('/login');

            } catch (error) {
                // Handle signup error
                if (error.response.data.errors.email) {
                    Toast.fire({ icon: "error", title: 'The email has already been taken' });
                }
                if (error.response.data.errors.password) {
                    Toast.fire({ icon: "error", title: 'The password confirmation does not match.' });
                }
                Toast.fire({ icon: "error", title: error.message });
                console.error('Signup failed', error);
            }
        },
        async socialLogin({ commit }, credentials){
            try {
                const resp = await authServices.socialLogin(credentials)
                if (resp.status === 200) {
                    console.log('success', resp.data.success)
                    commit('setToken', resp.data.success.token);
                    commit('setUserData', resp.data.success);
                    router.push('/');
                }
            } catch (error) {
                if (error.resp) {
                    if (error.resp.status === 422) {
                        // console.log('Unauthenticated')
                        createToast(`Unauthenticated`, {
                            type: 'danger',
                            position: 'top-right',
                            transition: 'zoom',
                        });
                    }
                }
                console.log(error)
            }
        },
        logout({ commit }) {
            // Clear user data in Vuex store
            router.push({
                name: 'Login'
            })
            commit('clearUserData');
        },

    },
    plugins: [vuexPersist.plugin],
    // Specify which state properties you want to persist
    // plugins: [vuexPersist.plugin({ key: 'your-key-here', reducer: state => ({ token: state.token, name: state.name, id: state.id }) })],
});

export default store;
