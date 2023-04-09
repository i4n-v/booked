import useApi from "../../hooks/useApi";
import { UserCreate } from "./types";

export default function useUser(){
    const user = useApi('users')
    async function getUser(id: string = ''){
        const result = await user.get(id);
        return result.data;
    }

    async function createUser(data:UserCreate){
        const result = await user.post<UserCreate>(data);
        return result
    }

    return {
        getUser,
        createUser
    }
}
