import { AxiosRequestConfig } from "axios";
import auth from "../services/Auth";

class HeaderUtil {
  public getHeaderPrivateRoutes(): AxiosRequestConfig<any> {
    return {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + auth.getToken() 
      }
    }
  }

  public getHeaderPublicRoutes(): AxiosRequestConfig<any> {
    return {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
  }
}

const headerUtil = new HeaderUtil();
export default headerUtil;