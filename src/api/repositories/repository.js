import axios from "axios";
import { session } from "../session";


export default class Repository {
    constructor(api_url) {
        this._session = session;
        this._client = axios.create({
            baseURL: api_url,
            timeout: 1000,
        });
    }

    get session() {
        return this._session;
    }

    get _config() {
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        if (this._session.accessToken)
            config['headers']['Authorization'] = `Bearer ${this._session.accessToken}`
        return config;
    }

    get(url) {
        return this._client.get(url, this._config);
    }

    post(url, payload) {
        return this._client.post(url, payload, this._config);
    }

    put(url, payload) {
        return this._client.put(url, payload, this._config);
    }
    
    delete(url) {
        return this._client.delete(url, this._config);
    }
}
