import api from './api';
import headerUtil from '../utils/HeaderUtil';
import auth from './Auth';

class DeckService {
  public async findAll() {
    try {
      const response = await api.get("/v1/decks", headerUtil.getHeaderPrivateRoutes());
      return response;
    } catch (error: any) {
      if (error.response.status === 403)
        auth.logout();
      throw error.response.data;
    }
  }

  public async findCards(deckId: number, pageSize: number, pageNumber: number) {
    try {
      const response = await api.get(
        `/v1/decks/${deckId}/cards?pageSize=${pageSize}&&pageNumber=${pageNumber}`, 
        headerUtil.getHeaderPrivateRoutes());
      return response;
    } catch (error: any) {
      if (error.response.status === 403)
        auth.logout();
      throw error.response.data;
    }
  }

  public async save(description: string) {
    try {
      const body = {
        description: description,
        cards: []
      }
      const response = await api.post(
        `/v1/decks`, body,
        headerUtil.getHeaderPrivateRoutes());
      return response;
    } catch (error: any) {
      if (error.response.status === 403)
        auth.logout();
      throw error.response.data;
    }
  }
  
}

const deckService = new DeckService();

export default deckService;