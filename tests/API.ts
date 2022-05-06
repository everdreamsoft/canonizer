import axios from 'axios';

export default class Api {

    static readonly API_ROUTE = 'http://localhost:8000/api/v1/';

    static readonly BLOCK_URL = this.API_ROUTE + 'test/block/';

    public static async getBlock(id: string): Promise<any> {
        try {
            const response = await axios.get(Api.BLOCK_URL + id);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

}
