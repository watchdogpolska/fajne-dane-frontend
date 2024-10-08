import Repository from "./repository";
import User from "../models/user";


export class AuthRepository extends Repository {
    async login({email, password}) {
        let response = await this.post(
            '/token/',
            { email: email, password: password }
        )
        if (response.data.access) {
            this._session.setAccessToken(response.data.access);
            this._session.setRefreshToken(response.data.refresh);
        }
    }

    async refresh() {
        let response = await this.post(
            '/token/refresh/',
            {  refresh: this._session.refreshToken }
        )
        if (response.data.access) {
            this._session.setAccessToken(response.data.access);
        }
    }

    logout() {
        this._session.logout();
    }

    async register({email, password, password_confirmation}) {
        let response = await this.post(
            '/users/register/',
                {
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
            )
        return response.data
    }

    async details() {
        let response = await this.get("users/details/")
        return User.fromJson(response.data)
    }
    
    async requestResetPassword({email}) {
        let response = await this.post(
            '/users/password/reset/request/?platform=panel',
            {
                email: email,
            }
        )
        return response.data
    }

    async resetPassword({token, password, password_confirmation}) {
        let response = await this.post(
            '/users/password/reset/',
            {
                token: token,
                password: password,
                password_confirmation: password_confirmation
            }
        )
        return response.data
    }
}
