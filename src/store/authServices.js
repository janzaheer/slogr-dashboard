import axios from 'axios';

let base_url = import.meta.env.VITE_BASE_URL

export default {
  async login(credentials) {
    return axios.post(`${base_url}/api/login`, credentials);
  },

//   async signup(userData) {
//     return axios.post(`${BASE_URL}/signup`, userData);
//   },
};