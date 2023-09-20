import api from './api';
import headerUtil from '../utils/HeaderUtil';
import auth from './Auth';

class CardService {
  public async find(name: string = "", type: string = "", level: Number = 0, 
    race: String, attribute : string = "", externalSeach: boolean) {
    try {
      var uri = `/v1/cards?externalSearch=${externalSeach}`
      if (name !== "")
        uri += `&&name=${name}`;
      if (type !== "")
        uri += `&&type=${type}`;
      if (level !== 0)
        uri += `&&level=${level}`;
      if (race !== "")
        uri += `&&race=${race}`;
      if (attribute !== "")
        uri += `&&attribute=${race}`;

      const response = await api.get(uri, headerUtil.getHeaderPrivateRoutes());
      return response;
    } catch (error: any) {
      if (error.response.status === 403)
        auth.logout();
      throw error.response.data;
    }
  }

  public async delete(deckId: Number, cardId: Number) {
    try {
      const response = await api.delete(`/v1/decks/${deckId}/cards/${cardId}`, headerUtil.getHeaderPrivateRoutes());
      return response;
    } catch (error: any) {
      if (error.response.status === 403)
        auth.logout();
      throw error.response.data;
    }
  }
}

const cardService = new CardService();
export default cardService;