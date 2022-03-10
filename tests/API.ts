import axios from 'axios';

export default class Api {

    static readonly API_ROUTE = 'http://localhost:8000/api/v1/';
    static readonly PROCESSES_URL = this.API_ROUTE + 'jwi/process/';

    public static async getJWIProcess(id: string): Promise<any> {
        try {
            const response = await axios.get(Api.PROCESSES_URL + id);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}
