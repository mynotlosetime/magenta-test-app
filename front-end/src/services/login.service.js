import axios from "axios";

export default class LoginService {
  static logout() {
    return axios.post("/api/auth/logout");
  }
  static signal() {
    return axios.get("/api/auth/signal");
  }
}
