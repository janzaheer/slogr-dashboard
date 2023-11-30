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
        name: state.name,
        id: state.id,
        email: state.email,
        email_verified_at: state.email_verified_at,
        organization_id: state.organization_id,
        created_at: state.created_at,
        updated_at: state.updated_at,
    }),
});

// Create the Vuex store
const store = new Store({
    state: {
        token: null,
        name: null,
        id: null,
        email: null,
        email_verified_at: null,
        organization_id: null,
        created_at: null,
        updated_at: null

    },
    getters: {
        getToken: state => state.token,
        getUserId: state => state.id,
        getUserName: state => state.name,
        getUserEmail: state => state.email,
        getUserEmailVerified: state => state.email_verified_at,
        getUserOrganizationId: state => state.organization_id,
        getUserCreated: state => state.created_at,
        getUserUpdated: state => state.updated_at,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUsername(state, name) {
            state.name = name;
        },
        setUserId(state, id) {
            state.id = id;
        },
        setEmail(state, email) {
            state.email = email
        },
        setVerifiedEmail(state, email_verified_at) {
            state.email_verified_at = email_verified_at
        },
        setOrganizationId(state, organization_id) {
            state.organization_id = organization_id
        },
        setCreatedAt(state, created_at) {
            state.created_at = created_at
        },
        setUpdatedAt(state, updated_at) {
            state.updated_at = updated_at
        },
        clearUserData(state) {
            state.token = null;
            state.name = null;
            state.id = null;
            state.email = null;
            state.email_verified_at = null;
            state.organization_id = null;
            state.created_at = null;
            state.updated_at = null
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
                    commit('setUsername', response.data.success.user.name);
                    commit('setUserId', response.data.success.user.id);
                    commit('setEmail', response.data.success.user.email);
                    commit('setVerifiedEmail', response.data.success.user.email_verified_at);
                    commit('setOrganizationId', response.data.success.user.organization_id);
                    commit('setCreatedAt', response.data.success.user.created_at);
                    commit('setUpdatedAt', response.data.success.user.updated_at);
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
