import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const AuthService = {
  signup(credentials) {
    return axios.post(`${API_URL}signup`, credentials)
  },

  login(credentials) {
    return axios.post(`${API_URL}login`, credentials)
  },

  logout() {
    return localStorage.removeItem("token");
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default AuthService;