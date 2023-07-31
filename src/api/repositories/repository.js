import axios from "axios";
import { useAuth } from '../../hooks/use-auth';
import { EventEmitter } from 'events';


export const BaseEvents = Object.freeze({
    ERROR: Symbol("ERROR"),
});


export default class Repository {
    constructor(api_url, session) {
        this._session = session;
        this._client = axios.create({
            baseURL: api_url,
            timeout: 6000000,
        });
        this.em = new EventEmitter();
    }

    get session() {
        return this._session;
    }

    get _config() {
        let config = { headers: { "Content-Type": "application/json" } };
        if (this._session.accessToken)
            config['headers']['Authorization'] = `Bearer ${this._session.accessToken}`
        return config;
    }

    get(url, params={}) {
        return this._client.get(url, {...this._config, params: params}).catch((error) => {
            this.em.emit(BaseEvents.ERROR, error);
        });
    }

    post(url, payload) {
        return this._client.post(url, payload, this._config).catch((error) => {
            this.em.emit(BaseEvents.ERROR, error);
        });
    }

    postFile(url, payload) {
        let formData = new FormData();
        for (let [key, value] of Object.entries(payload)) {
            formData.append(key, value);
        }

        let config = { headers: {"Content-Type": "multipart/form-data"}};
        if (this._session.accessToken)
            config['headers']['Authorization'] = `Bearer ${this._session.accessToken}`
        return this._client.post(url, formData, config);
    }

    put(url, payload) {
        return this._client.put(url, payload, this._config);
    }

    patch(url, payload) {
        return this._client.patch(url, payload, this._config);
    }
    
    delete(url) {
        return this._client.delete(url, this._config);
    }
}
