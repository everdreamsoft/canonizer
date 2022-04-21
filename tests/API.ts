import axios from 'axios';
import {AssetInterface} from "../src/canonizer/Asset";

export default class Api {

    static readonly API_ROUTE = 'http://localhost:8000/api/v1/';
    static readonly PROCESSES_URL = this.API_ROUTE + 'jwi/process/';
     static readonly ASSETS_WITHOUT_META_URL = `${this.API_ROUTE}jetski/assetsWithoutMeta/`;

    public static async getJWIProcess(id: string): Promise<any> {
        try {
            const response = await axios.get(Api.PROCESSES_URL + id);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public static async getAssetsWithoutMeta(): Promise<AssetInterface[]> {
        try {
            const response = await axios.get(Api.ASSETS_WITHOUT_META_URL);

            return response.data.assets;
        } catch (e) {
            throw e;
        }
    }

}
