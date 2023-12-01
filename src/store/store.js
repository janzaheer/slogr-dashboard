// store.js
import Vuex from 'vuex';
import createPersist from 'vuex-persist';

// Your authentication service
import authServices from './authServices';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import router from '@/router/index'

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
                console.log('---------------111----------------')
                if (response.status === 200) {
                    // Update Vuex store with user data
                    commit('setToken', response.data.success.token);
                    commit('setUserData', response.data.success);
                    createToast(`Login successfully`, {
                        type: 'success',
                        position: 'top-right',
                        transition: 'zoom',
                    });
                    router.push('/');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        // console.log('Unauthenticated')
                        createToast(`Unauthenticated`, {
                            type: 'danger',
                            position: 'top-right',
                            transition: 'zoom',
                        });
                    }
                }
                // Handle login error
                console.error('Login failed', error);
            }
        },
        async signup({ commit }, credentials) {
            try {
                const response = await authServices.signup(credentials)
                commit('setToken', response.data.success.token);
                commit('setUsername', response.data.success.name);
                // commit('setUserId', response.data.success.id);
                createToast(`SignUp successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                router.push('/login');

            } catch (error) {
                // Handle signup error
                if (error.response.data.errors.email) {
                    createToast(`The email has already been taken.`, {
                        type: 'danger',
                        position: 'top-right',
                        transition: 'zoom',
                    });
                }
                if (error.response.data.errors.password) {
                    createToast(`The password confirmation does not match.`, {
                        type: 'danger',
                        position: 'top-right',
                        transition: 'zoom',
                    });
                }
                console.error('Signup failed', error);
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
