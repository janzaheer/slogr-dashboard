import { createApp } from 'vue'
import { createStore } from 'vuex'
import authServices from './authServices'

export default createStore({
    state() {
        return {
            // name: 'Atif Badini',
            token: null,
            name: null,
            id: null,
        }
    },
    getters: {
        getToken:state => state.token,
        getUserId:state => state.id,
        getUserName:state => state.name
    },
    mutations: {
        setToken(state, token) {
            console.log('Setting Token:', token);
            state.token = token;
        },
        setUsername(state, name) {
            console.log('Setting Username:', name);
            state.name = name;
        },
        setUserId(state, id) {
            console.log('Setting User ID:', id);
            state.id = id;
        },
        clearUserData(state) {
            state.token = null;
            state.name = null;
            state.id = null;
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
              // Make API call to authenticate user
              const response = await authServices.login(credentials);
      
              // Update Vuex store with user data
              commit('setToken', response.data.success.token);
              commit('setUsername', response.data.success.user.name); 
              commit('setUserId', response.data.success.user.id);
            } catch (error) {
              // Handle login error
              console.error('Login failed', error);
            }
          },
          logout({ commit }) {
            // Clear user data in Vuex store
            commit('clearUserData');
          },
    },
    modules: {

    }
})