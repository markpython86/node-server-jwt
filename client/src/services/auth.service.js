import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const AuthService = {
  register(credentials) {
    return axios.post(`${API_URL}register`, credentials)
  },

  login(credentials) {
    return axios.post(`${API_URL}login`, credentials)
      .then((response) => {
        console.log('response', response)
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      });

  },

  logout() {
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default AuthService;