import api from './api';
import headerUtil from '../utils/HeaderUtil';
import auth from './Auth';

class UserService {
  public async login(userName: string, password: string) {
    try {
      var body  = {
        login : userName,
        password : password
      };
  
      const response = await api.post("/auth/login", JSON.stringify(body), 
        headerUtil.getHeaderPublicRoutes());
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public async registerAccount(login: string, name: string, password: string, 
    repeatPassword: string) {
      if (!this.validatePassword(password, repeatPassword))
        throw {statusCode: 400, message: 'Senha diferente da confirmação da senha.'}
      try {
        var body  = {
          login : login,
          name: name,
          password : password
        };
    
        const response = await api.post("/auth/register", JSON.stringify(body), 
          headerUtil.getHeaderPublicRoutes());
        return response.data;
      } catch (error: any) {
        if (error.response.status === 403)
          auth.logout();
        throw error.response.data;
      }
  }

  private validatePassword(password: string, repeatPassword: string) {
    return password === repeatPassword;
  }
}

const userService = new UserService();
export default userService;