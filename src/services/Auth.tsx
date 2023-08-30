import userService from './UserService';

class Auth {
  
  isAuthenticated(): boolean {
    var token = localStorage.getItem("tokenBuikdYugioh");
    return token !== undefined && token !== null;
  }

  async login(userName:string, password: string) {
    const response = await userService.login(userName, password);
    if (response.statusCode === 403)
      throw response;
    
    localStorage.setItem("tokenBuikdYugioh", response.data.token);
    return response.data;  
  }

  logout(): void {
    localStorage.removeItem("tokenBuikdYugioh");
    window.location.href ='/login';
  }

  getToken() {
    return localStorage.getItem("tokenBuikdYugioh");
  }
}

const auth = new Auth();
export default auth;