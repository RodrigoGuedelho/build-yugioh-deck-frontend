import { AxiosError } from 'axios';
import api from './api';

class UserService {
  public async login(userName: string, password: string) {
    try {
      var body  = {
        login : userName,
        password : password
      };
  
      const response = await api.post("/auth/login", JSON.stringify(body), {
        headers: {
          'Content-Type' : 'application/json'
        }
      });
      console.log(">>>>", response)
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

const userService = new UserService();
export default userService;