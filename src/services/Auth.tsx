import userService from './UserService';

class Auth {
  
  isAuthenticated(): boolean {
    var token = localStorage.getItem("tokenBuikdYugioh");
    return token !== undefined && token !== null;
  }

  async login(userName:string, password: string) {
    try {
        const response = await userService.login(userName, password);
        localStorage.setItem("tokenBuikdYugioh", response.data.token);
        
        return true;
    } catch (error) {
      localStorage.removeItem("tokenBuikdYugioh");
      return false;
    }
    
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