import api from './api.js'

class AuthService{

    async login(authRequest){
        try{
            const response = await api.post("auth/login", authRequest);
            const data = await response.data;
            return data;
        }
        catch(error){
            throw error;
        }
    }

    async register(user){
        try{
            const response = await api.post("users/register", user);
            const data = await response.data;
            return data;
        }
        catch(error){
            throw error;
        }
    }

    async verifyEmail(token){
        try{
            const response = await api.post("users/verify", token);
            const data = await response.data;
            return data;
        }
        catch(error){
            throw error;
        }
    }
}

export default new AuthService()