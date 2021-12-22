
class Session {
    constructor() {
        this.user = null;
    }

    get accessToken() {
        const accessToken = localStorage.getItem('accessToken');
        return accessToken;
    }

    setAccessToken(token) {
        localStorage.setItem("accessToken", token);
    }
    
    setup(user) {
        this.user = user;
    }
    
    logout() {
        this.user = null;
        localStorage.removeItem("accessToken");
    }
}

export const session = new Session();
