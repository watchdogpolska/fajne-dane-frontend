
class Session {
    constructor() {
        this.user = null;
    }

    get accessToken() {
        const _accessToken = localStorage.getItem('accessToken');
        return _accessToken;
    }
    
    get refreshToken() {
        const _refreshToken = localStorage.getItem('refreshToken');
        return _refreshToken;
    }

    setAccessToken(accessToken) {
        localStorage.setItem("accessToken", accessToken);
    }

    setRefreshToken(refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    }
    
    setup(user) {
        this.user = user;
    }
    
    logout() {
        this.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}

export const session = new Session();
