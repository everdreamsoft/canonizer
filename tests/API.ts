import axios from 'axios';
import {AssetInterface} from "../src/canonizer/Asset";

export default class Api {

    static readonly API_ROUTE = 'http://localhost:8000/api/v1/';

    static readonly BLOCK_URL = this.API_ROUTE + 'test/block/';

    public static async getBlock(id: string): Promise<AssetInterface[]> {
        try {
            const response = await axios.get(Api.BLOCK_URL + id);
            return response.data.assets;
        } catch (e) {
            throw e;
        }
    }

}
