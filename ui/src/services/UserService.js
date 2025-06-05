import api from './api.js'

class UserService{

    async findAll(){
        try{
            const response = await api.get("/users");
            const data = await response.data;
            return data;
        }
        catch(error){
            throw error;
        }
    }
}

export default new UserService()